from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
from pydantic import BaseModel
import json
import numpy as np
import pandas as pd
import quantstats as qs

from sampledata import data
from ts_signal import signal
from stimulate_chartdata import *
from stimulate_price import price_stimulate
from stimulate_report import profit

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


# Empty DataFrame
df = None

# link two for report
@app.post('/simulate_chartdata')
def chartdata(report_data: Report):
    global df

    # Get Criterias
    buycriteria = report_data.buycriteria
    sellcriteria = report_data.sellcriteria

    # Create DataFrame
    try:
        data = report_data.ohlc_data
        df = pd.DataFrame(data.values(), index=data.keys(), columns=[
            'InstrumentName', 'OpenPrice',  'HighPrice', 'LowPrice', 'ClosePrice'])
        df.index = pd.to_datetime(df.index, format="%d-%m-%Y")
    except:
        df = None
        return {'Error': 'Provided ohlc data is incorrect'}

    # Get Buy or Sell Signal
    df = signal(df=df, buycriteria=buycriteria, sellcriteria=sellcriteria)

    if type(df) != pd.DataFrame and type(df) == dict:
        return df

    # Margin Managment and capital
    try:
        order_side = int(report_data.order_side)
        initial_capital = float(report_data.initial_capital)
        position_size = float(report_data.position_size)

        df = position(df=df, order_side=order_side)
        df = margin(df=df, initial_capital=initial_capital,
                    position_size=position_size)
    except:
        return {'Error': 'Provided capital, position size or order side is incorrect!'}

    # Create position column
    buysellcheck = (
        'BuySignal' in df.columns and 'SellSignal' in df.columns)
    buycheck = ('BuySignal' in df.columns)
    # sellcheck = ('SellSignal' in df.columns)

    # Round of the values
    df=(df).round(decimals=2)

    # Create Return DataFrame
    ret = df.copy()
    ret.index = data.keys()

    # Drop Extra columns
    if buysellcheck:
        ret.drop(['BuySignal', 'SellSignal'], axis=1, inplace=True)
    elif buysellcheck == False and buycheck:
        ret.drop(['BuySignal'], axis=1, inplace=True)

    # Returns the DataFrame
    res = ret.to_json(orient="index")
    parsed = json.loads(res)

    return parsed


# link three for report
@app.post('/simulate_report')
def report(report_data: Report):
    global df

    # Update df
    chartdata(report_data=report_data)
    df = profit(df)
    
    if type(df) != pd.DataFrame and type(df) == dict:   
        return df
    
    # Round of the values
    df=(df).round(decimals=2)

    return (qs.reports.metrics(df['UnrealizedProfit'], mode='full', display=False).round(decimals=4))

# Link four for trade
@app.post('/simulate_trade')
def tradeData(report_data: Report):
    global df

    # Get Data
    data = report_data.ohlc_data

    #  Update df
    report(report_data=report_data)

    if type(df) != pd.DataFrame and type(df) == dict:
        return df

    # Get Signal and create position    
    df['Date'] = data.keys()
    dataf = df[df['Signal'] != 0]
    con = [(dataf['Signal'] == 1), (dataf['Signal'] == -1)]
    dataf['Order_Side'] = np.select(con, ['BUY', 'SELL'], 0)
    dataf['Position'] = np.select(con, ['LONG', 'LONG EXIT'], 0)

    # Return DataFrame
    ret = dataf.copy()
    res = ret.to_json(orient="records")
    parsed = json.loads(res)

    # Remove Open long Position
    for i in parsed:
        try:
            if i['Position'] == 'LONG':
                nextOne = parsed[(parsed.index(i)+1)]
                if nextOne['Position'] == 'LONG EXIT':
                    pass
        except:
            del parsed[(parsed.index(i))]

    if len(parsed) < 1:
        return {'Error': 'No trade generated'}

    return parsed


# Link Five for unrealized profit
@app.post('/simulate_profit')
def profitData(report_data: Report):
    global df

    # Get Data
    data = report_data.ohlc_data

    #  Update df
    report(report_data=report_data)

    if type(df) != pd.DataFrame and type(df) == dict:
        return df

    # Get Profit data    
    df['Date'] = data.keys()
    dataf=df[df['UnrealizedProfit'].notnull()]

    # Return DataFrame
    ret = dataf.copy()
    res = ret.to_json(orient="records")
    parsed = json.loads(res)

    if len(parsed) < 1:
        return {'Error': 'No trade generated'}

    return parsed