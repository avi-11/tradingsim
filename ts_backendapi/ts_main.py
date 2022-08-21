from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
import json
import pandas as pd

from sampledata import data
from stimulator import price_stimulator
from pre_processing import dataprocessing

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
def price(instrumentname: str='BTC', closeprice: float = 10000, volatility: float = 0.03, startdate: str =datetime.now().strftime('%d-%m-%Y')):
    
    df=price_stimulator(instrumentname, closeprice, volatility, startdate)

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


# link two for report
@app.post('/simulate_report')
def report(data=data, order_side: int=0, initial_capital: float=100000, position_size: float=0.1, buycriteria=buycriteria, sellcriteria=sellcriteria):

    # converting json to dic
    buycriteria = json.loads(buycriteria)
    print(type(buycriteria))

    sellcriteria = json.loads(sellcriteria)
    print(type(sellcriteria))
    
    data=json.loads(data)
    df=pd.DataFrame(data.values(), index=data.keys(), columns=['InstrumnetName', 'OpenPrice',  'HighPrice', 'LowPrice', 'ClosePrice'])
    df.index=pd.to_datetime(df.index, format="%d-%m-%Y")
    print(df)
    return dataprocessing(dataf=df, buycriteria=buycriteria, sellcriteria=sellcriteria)

@app.post('/simulate_chartdata')
def report(data=data, order_side: int=0, initial_capital: float=100000, position_size: float=0.1, buycriteria=buycriteria, sellcriteria=sellcriteria):

    # converting json to dic
    buycriteria = json.loads(buycriteria)
    print(type(buycriteria))

    sellcriteria = json.loads(sellcriteria)
    print(type(sellcriteria))
    
    data=json.loads(data)
    df=pd.DataFrame(data.values(), index=data.keys(), columns=['InstrumnetName', 'OpenPrice',  'HighPrice', 'LowPrice', 'ClosePrice'])
    df.index=pd.to_datetime(df.index, format="%d-%m-%Y")
    print(df)
    return df