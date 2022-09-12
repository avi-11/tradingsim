from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
import pandas as pd
from pydantic import BaseModel
import json

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

    # print(df)

    # if df == None:
    #     return {'Error': 'The provided criteria is incorrect!'}

    try:
        order_side = int(report_data.order_side)
        initial_capital = float(report_data.initial_capital)
        position_size = float(report_data.position_size)

        df = position(dataf=df, order_side=order_side)

        df = margin(dataf=df, initial_capital=initial_capital,
                    position_size=position_size)

    except:
        return {'Error': 'Provided capital, position size or order side is incorrect!'}

    ret = df.copy()

    ret.index = data.keys()

    print(ret)

    res = ret.to_json(orient="index")
    parsed = json.loads(res)

    return parsed


# link three for report

@app.post('/simulate_report')
def report(report_data: Report):
    global df

    chartdata(report_data=report_data)

    dataf = df

    # if dataf == None:
    #     return {'Error': 'The provided criteria is incorrect!'}

    return reportmateric(dataf=dataf)
