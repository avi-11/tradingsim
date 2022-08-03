from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import datetime
import json

from stimulator import price_stimulator
from pre_processing import dataprocessing

app = FastAPI()

origins = [
    "http://localhost.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/price')
def price(close: float = 10000, volatility: float = 0.03, startdate: str = datetime.datetime.today(), capital=100000):
    return price_stimulator(close, volatility, startdate, capital)

buycriteria={'C1':{
    'Indicator':'SMA',
    'Ind_parameter':50,
    'Operator':'>',
    'Indicator2':'SMA',
    'Ind_parameter2':100}
    }

sellcriteria={'C2':{
    'Indicator':'SMA',
    'Ind_parameter':21,
    'Operator':'>',
    'Value':'ClosePrice'}
    }

@app.get('/report')
def report(close: float = 10000, volatility: float = 0.03, startdate: str = datetime.datetime.today(), capital=100000, buycriteria=buycriteria, sellcriteria=sellcriteria):
    
    buycriteria=json.loads(buycriteria)
    print(type(buycriteria))

    sellcriteria=json.loads(sellcriteria)
    print(type(sellcriteria))

    return dataprocessing(close, volatility, startdate, capital=capital, buycriteria=buycriteria, sellcriteria=sellcriteria)
