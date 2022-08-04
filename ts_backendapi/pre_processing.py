from tatools import Indicators
from criteria import *
from report import reportmateric
from stimulator import price_stimulator

def dataprocessing(close: float, volatility: float, startdate: str, capital: float, buycriteria: dict, sellcriteria: list=None):

    
    dataf = price_stimulator(close, volatility, startdate, capital)

    indicator = {'SMA': Indicators().addmovingav,
                   'RSI': Indicators().addrsi, 'BB': Indicators().addbb}


    #buycriteria
    for ind in list(buycriteria.keys()):
        if 'Ind_parameter' in buycriteria[ind]:
            dataf=indicator[buycriteria[ind]['Indicator']](dataf=dataf, periods=int(buycriteria[ind]['Ind_parameter']))

        elif 'Ind_parameter' not in buycriteria[ind]:
            dataf=indicator[buycriteria[ind]['Indicator']](dataf=dataf)

        if 'Indicator2' in buycriteria[ind]:
            if 'Ind_parameter2' in buycriteria[ind]:
                dataf=indicator[buycriteria[ind]['Indicator2']](dataf=dataf, periods=int(buycriteria[ind]['Ind_parameter2']))

            elif 'Ind_parameter2' not in buycriteria[ind]:
                dataf=indicator[buycriteria[ind]['Indicator2']](dataf=dataf)
        
    for ind in list(buycriteria.keys()):

        if 'Indicator2' in buycriteria[ind]:

            if 'Ind_parameter' in buycriteria[ind] and 'Ind_parameter2' in buycriteria[ind]:

                valueOne=f"{buycriteria[ind]['Indicator']} {buycriteria[ind]['Ind_parameter']}"
                valueTwo=f"{buycriteria[ind]['Indicator2']} {buycriteria[ind]['Ind_parameter2']}"

                dataf=buy_with_indicators(dataf, valueOne=valueOne, valueTwo=valueTwo, operation=buycriteria[ind]['Operator'])

        elif 'Indicator2' not in buycriteria[ind] and 'Value' in buycriteria[ind]:
            
            valueOne=f"{buycriteria[ind]['Indicator']} {buycriteria[ind]['Ind_parameter']}"
            valueTwo=buycriteria[ind]['Value']

            dataf=buy(dataf,valueOne=valueOne, valueTwo=valueTwo, operation=buycriteria[ind]['Operator'])
        
        # dataf = criteriadic[criteria]()
        print(dataf[dataf['BuyPosition'] == 1])

    #sellcriteria
    for ind in list(sellcriteria.keys()):
        if 'Ind_parameter' in sellcriteria[ind]:
            dataf=indicator[sellcriteria[ind]['Indicator']](dataf=dataf, periods=int(sellcriteria[ind]['Ind_parameter']))

        elif 'Ind_parameter' not in sellcriteria[ind]:
            dataf=indicator[sellcriteria[ind]['Indicator']](dataf=dataf)

        if 'Indicator2' in sellcriteria[ind]:
            if 'Ind_parameter2' in sellcriteria[ind]:
                dataf=indicator[sellcriteria[ind]['Indicator2']](dataf=dataf, periods=int(sellcriteria[ind]['Ind_parameter2']))

            elif 'Ind_parameter2' not in sellcriteria[ind]:
                dataf=indicator[sellcriteria[ind]['Indicator2']](dataf=dataf)
        
    for ind in list(sellcriteria.keys()):

        if 'Indicator2' in sellcriteria[ind]:

            if 'Ind_parameter' in sellcriteria[ind] and 'Ind_parameter2' in sellcriteria[ind]:

                valueOne=f"{sellcriteria[ind]['Indicator']} {sellcriteria[ind]['Ind_parameter']}"
                valueTwo=f"{sellcriteria[ind]['Indicator2']} {sellcriteria[ind]['Ind_parameter2']}"

                dataf=sell_with_indicators(dataf, valueOne=valueOne, valueTwo=valueTwo, operation=sellcriteria[ind]['Operator'])

        elif 'Indicator2' not in sellcriteria[ind] and 'Value' in sellcriteria[ind]:
            
            valueOne=f"{sellcriteria[ind]['Indicator']} {sellcriteria[ind]['Ind_parameter']}"
            valueTwo=sellcriteria[ind]['Value']

            dataf=sell(dataf,valueOne=valueOne, valueTwo=valueTwo, operation=sellcriteria[ind]['Operator'])
        
        # dataf = criteriadic[criteria]()
        print(dataf[dataf['SellPosition'] == -1])

    metrics = reportmateric(dataf)

    return metrics