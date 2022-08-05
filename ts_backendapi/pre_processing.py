from ast import operator
from tatools import Indicators
from criteria import *
from report import reportmateric
from stimulator import price_stimulator
from value_builder import value


def dataprocessing(closeprice: float, volatility: float, startdate: str, capital: float, buycriteria: dict, sellcriteria: list = None):

    dataf = price_stimulator(closeprice, volatility, startdate, capital)

    indicator = {'SMA': Indicators().addmovingav,
                 'RSI': Indicators().addrsi, 'BB': Indicators().addbb, 'ADX': Indicators().addadx, 'PP': Indicators().addpp}

    # indicator for buycriteria
    for ind in list(buycriteria.keys()):
        if 'Ind_parameter' in buycriteria[ind]:
            dataf = indicator[buycriteria[ind]['Indicator']](
                dataf=dataf, periods=int(buycriteria[ind]['Ind_parameter']))

        elif 'Ind_parameter' not in buycriteria[ind]:
            dataf = indicator[buycriteria[ind]['Indicator']](dataf=dataf)

        if 'Indicator2' in buycriteria[ind]:
            if 'Ind_parameter2' in buycriteria[ind]:
                dataf = indicator[buycriteria[ind]['Indicator2']](
                    dataf=dataf, periods=int(buycriteria[ind]['Ind_parameter2']))

            elif 'Ind_parameter2' not in buycriteria[ind]:
                dataf = indicator[buycriteria[ind]['Indicator2']](dataf=dataf)

        print(dataf)

    # buycriteria
    for ind in list(buycriteria.keys()):

        valueOne, valueTwo = value(buycriteria[ind])
        dataf = buy(dataf, valueOne=valueOne, valueTwo=valueTwo,
                    operation=buycriteria[ind]['Operator'])

        # dataf = criteriadic[criteria]()
        print(dataf[dataf['BuyPosition'] == 1])

    # indicator for sellcriteria
    for ind in list(sellcriteria.keys()):

        if 'Ind_parameter' in sellcriteria[ind]:
            dataf = indicator[sellcriteria[ind]['Indicator']](
                dataf=dataf, periods=int(sellcriteria[ind]['Ind_parameter']))

        elif 'Ind_parameter' not in sellcriteria[ind]:
            dataf = indicator[sellcriteria[ind]['Indicator']](dataf=dataf)

        if 'Indicator2' in sellcriteria[ind]:
            if 'Ind_parameter2' in sellcriteria[ind]:
                dataf = indicator[sellcriteria[ind]['Indicator2']](
                    dataf=dataf, periods=int(sellcriteria[ind]['Ind_parameter2']))

            elif 'Ind_parameter2' not in sellcriteria[ind]:
                dataf = indicator[sellcriteria[ind]['Indicator2']](dataf=dataf)

        print(dataf)

    # sellcriteria
    for ind in list(sellcriteria.keys()):

        valueOne, valueTwo = value(buycriteria[ind])

        dataf = sell(dataf, valueOne=valueOne, valueTwo=valueTwo,
                     operation=sellcriteria[ind]['Operator'])

        # dataf = criteriadic[criteria]()
        print(dataf[dataf['SellPosition'] == -1])

    metrics = reportmateric(dataf)

    return metrics