from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
import pandas as pd
from pydantic import BaseModel
import json
import numpy as np

from sampledata import data
from ts_signal import signal
from stimulate_chartdata import *
from stimulate_price import price_stimulate
from stimulate_report import reportmateric

# initating app
app = FastAPI(redoc_url=None)

# creating origin list
origins = ['*']

# config CORSM
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# link first for price


@app.post('/simulate_price')
def price(instrumentname: str = 'BTC', closeprice: float = 10000, volatility: float = 0.03, startdate: str = datetime.now().strftime('%d-%m-%Y')):

    df = price_stimulate(instrumentname, closeprice, volatility, startdate)

    # return df[['InstrumentName','OHLC']]
    return df['InstrumentName OHLC']


# sample data for criteria
buycriteria = {'C1': {
    'Indicator': 'SMA',
    'Ind_parameter': 50,
    'Operator': '>',
    'Indicator2': 'SMA',
    'Ind_parameter2': 200},
    'C2': {
    'Value': 'ClosePrice',
    'Operator': '>',
    'Indicator': 'SMA',
    'Ind_parameter': 21
}
}

sellcriteria = {'C1': {
    'Indicator': 'SMA',
    'Ind_parameter': 3,
    'Operator': '>',
    'Value': 'ClosePrice'}
}


class Report(BaseModel):
    ohlc_data = data
    order_side = "0"
    initial_capital = "100000"
    position_size = "0.1"
    buycriteria = buycriteria
    sellcriteria = sellcriteria

# link two for report


df = None


@app.post('/simulate_chartdata')
def chartdata(report_data: Report):
    global df
    buycriteria = report_data.buycriteria

    sellcriteria = report_data.sellcriteria

    try:
        data = report_data.ohlc_data
        df = pd.DataFrame(data.values(), index=data.keys(), columns=[
            'InstrumentName', 'OpenPrice',  'HighPrice', 'LowPrice', 'ClosePrice'])
        df.index = pd.to_datetime(df.index, format="%d-%m-%Y")

    except:
        df = None
        return {'Error': 'Provided ohlc data is incorrect'}

    df = signal(dataf=df, buycriteria=buycriteria, sellcriteria=sellcriteria)

    if type(df) != pd.DataFrame and type(df) == dict:
        return df

    try:
        order_side = int(report_data.order_side)
        initial_capital = float(report_data.initial_capital)
        position_size = float(report_data.position_size)

        df = position(dataf=df, order_side=order_side)

        df = margin(dataf=df, initial_capital=initial_capital,
                    position_size=position_size)

    except:
        return {'Error': 'Provided capital, position size or order side is incorrect!'}

    buysellcheck = (
        'BuySignal' in df.columns and 'SellSignal' in df.columns)
    buycheck = ('BuySignal' in df.columns)
    sellcheck = ('SellSignal' in df.columns)

    if buysellcheck:
        con = [(df['BuySignal'] == 1) & (df['BuySignal'].shift(1)+df['SellSignal'].shift(1) == 0) & (df['SellSignal'] == 0), (df['BuySignal'] == 1) & (df['BuySignal'].shift(1) == 0) & (df['SellSignal'] == 0),
               (df['BuySignal'].shift(1) == 1) & (df['SellSignal'] == -1) & (df['BuySignal'] != 0) & (df['SellSignal'].shift(1) == 0)]
        df['Signal'] = np.select(con, [1, 1, -1], 0)

        # df.drop(['BuySignal', 'SellSignal'], axis=1, inplace=True)

    elif buysellcheck == False and buycheck:
        con = [(df['BuySignal'] == 1) & (df['BuySignal'].shift(1) == 0),
               (df['BuySignal'] == 0) & (df['BuySignal'].shift(1) == 1)]
        df['Signal'] = np.select(con, [1, -1], 0)

        # df.drop(['BuySignal'], axis=1, inplace=True)

    # elif buysellcheck == False and sellcheck:
    #     df.rename(columns={"SellSignal": "Signal"}, inplace=True)

    ret = df.copy()

    ret.index = data.keys()

    if buysellcheck:
        ret.drop(['BuySignal', 'SellSignal'], axis=1, inplace=True)
    elif buysellcheck == False and buycheck:
        ret.drop(['BuySignal'], axis=1, inplace=True)

    res = ret.to_json(orient="index")
    parsed = json.loads(res)

    return parsed


# link three for report

@app.post('/simulate_report')
def report(report_data: Report):
    global df

    chartdata(report_data=report_data)

    dataf = df

    if type(df) != pd.DataFrame and type(df) == dict:
        return df

    return reportmateric(dataf=dataf)


@app.post('/simulate_trade')
def trade(report_data: Report):
    global df

    data = report_data.ohlc_data

    chartdata(report_data=report_data)

    if type(df) != pd.DataFrame and type(df) == dict:
        return df

    df.index = data.keys()

    dataf = df[df['Signal'] != 0]

    con = [(dataf['Signal'] == 1), (dataf['Signal'] == -1)]

    dataf['Order_Side'] = np.select(con, ['BUY', 'SELL'], 0)

    dataf['Position'] = np.select(con, ['LONG', 'LONG EXIT'], 0)

    ret = dataf.copy()

    res = ret.to_json(orient="index")
    parsed = json.loads(res)
    
    keylist=list(parsed.keys())

    for i in keylist:
        try:
            if parsed[i]['Position']=='LONG':
                nextOne=keylist[(keylist.index(i)+1)]
                if parsed[nextOne]['Position']=='LONG EXIT':
                    pass
                    
        except:
            del parsed[i]

    
    if len(parsed.keys())<1:
        return {'Error': 'No trade generated'}

    return parsed
