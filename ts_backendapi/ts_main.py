from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import datetime
import json

from stimulator import price_stimulator
from pre_processing import dataprocessing

# initating app
app = FastAPI()

# creating origin list
origins = [
    "http://localhost.com",
]

# config CORSM
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# link first for price


@app.get('/price')
def price(closeprice: float = 10000, volatility: float = 0.03, startdate: str = datetime.datetime.today(), capital=100000):
    return price_stimulator(closeprice, volatility, startdate, capital)


# sample data for criteria
buycriteria = {'C1': {
    'Indicator': 'SMA',
    'Ind_parameter': 50,
    'Operator': '>',
    'Indicator2': 'SMA',
    'Ind_parameter2': 100},
    'C2': {
    'Indicator': 'SMA',
    'Ind_parameter': 21,
    'Operator': '>',
    'Value': 10000},
    'C3': {
    'Value': 'ClosePrice',
    'Operator': '>',
    'Indicator': 'SMA',
    'Ind_parameter': 20
}
}

sellcriteria = {'C2': {
    'Indicator': 'SMA',
    'Ind_parameter': 3,
    'Operator': '>',
    'Value': 'ClosePrice'}
}


# link two for report
@app.get('/report')
def report(closeprice: float = 10000, volatility: float = 0.03, startdate: str = datetime.datetime.today(), capital=100000, buycriteria=buycriteria, sellcriteria=sellcriteria):

    # converting json to dic
    buycriteria = json.loads(buycriteria)
    print(type(buycriteria))

    sellcriteria = json.loads(sellcriteria)
    print(type(sellcriteria))

    return dataprocessing(closeprice, volatility, startdate, capital=capital, buycriteria=buycriteria, sellcriteria=sellcriteria)
