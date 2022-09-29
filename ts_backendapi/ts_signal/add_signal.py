from ts_tatools import Indicators
from criteria import *


def signal(df, buycriteria: dict, sellcriteria: list = None):

    # Indicator Dict
    indicator = {'SMA': Indicators().addmovingav,
                 'RSI': Indicators().addrsi, 'BB': Indicators().addbb, 'ADX': Indicators().addadx, 'PP': Indicators().addpp}

    # indicator for buycriteria
    for ind in list(buycriteria.keys()):

        # Indicator with parameter
        if 'Ind_parameter' in buycriteria[ind] and 'Indicator' in buycriteria[ind]:
            if len(df) < int(buycriteria[ind]['Ind_parameter']):
                return {"Error": "Provided parameter is out of range!!"}

            # Get indicator added df
            df = indicator[buycriteria[ind]['Indicator']](
                df=df, periods=int(buycriteria[ind]['Ind_parameter']))

        # Indicator without parameter
        elif 'Ind_parameter' not in buycriteria[ind] and 'Indicator' in buycriteria[ind]:

            # Get indicator added df
            df = indicator[buycriteria[ind]['Indicator']](df=df)

        # Indicator2 with parameter
        if 'Indicator2' in buycriteria[ind] and 'Ind_parameter2' in buycriteria[ind]:
            if len(df) < int(buycriteria[ind]['Ind_parameter2']):
                return {"Error": "Provided parameter is out of range!!"}

            # Get Indicator added df
            df = indicator[buycriteria[ind]['Indicator2']](
                df=df, periods=int(buycriteria[ind]['Ind_parameter2']))

        # Indicator2 without parameter
        elif 'Ind_parameter2' not in buycriteria[ind] and 'Indicator2' in buycriteria[ind]:
            # Get indicator added df
            df = indicator[buycriteria[ind]['Indicator2']](df=df)

    # Buycriteria
    for ind in list(buycriteria.keys()):

        # Get values
        valueOne, valueTwo = value(buycriteria[ind])
        if valueOne == None or valueTwo == None:
            return {"Error": "Provided Criteria is incorrect!!"}

        # Get BuySignal
        df = buy(df, valueOne=valueOne, valueTwo=valueTwo,
                 operation=buycriteria[ind]['Operator'])

    # Indicator for sellcriteria
    for ind in list(sellcriteria.keys()):

        # Indicator with parameter
        if 'Ind_parameter' in sellcriteria[ind] and 'Indicator' in sellcriteria[ind]:
            if len(df) < int(sellcriteria[ind]['Ind_parameter']):
                return {"Error": "Provided parameter is out of range!!"}

            # Indicator added df
            df = indicator[sellcriteria[ind]['Indicator']](
                df=df, periods=int(sellcriteria[ind]['Ind_parameter']))

        # Indicator without parameter
        elif 'Ind_parameter' not in sellcriteria[ind] and 'Indicator' in sellcriteria[ind]:

            # Indicator added df
            df = indicator[sellcriteria[ind]['Indicator']](df=df)

        # Indicator2 With parameter
        if 'Indicator2' in sellcriteria[ind] and 'Ind_parameter2' in sellcriteria[ind]:
            if len(df) < int(sellcriteria[ind]['Ind_parameter2']):
                return {"Error": "Provided parameter is out of range!!"}

            # Indicator added parameter
            df = indicator[sellcriteria[ind]['Indicator2']](
                df=df, periods=int(sellcriteria[ind]['Ind_parameter2']))

        #  Indicator2 without parameter
        elif 'Ind_parameter2' not in sellcriteria[ind] and 'Indicator2' in sellcriteria[ind]:

            # Indicator added df
            df = indicator[sellcriteria[ind]['Indicator2']](df=df)

    # sellcriteria
    for ind in list(sellcriteria.keys()):
        # Get Values
        valueOne, valueTwo = value(sellcriteria[ind])

        if valueOne == None or valueTwo == None:
            return {"Error": "Provided Criteria is incorrect!!"}

        # Get Sell Signal
        df = sell(df, valueOne=valueOne, valueTwo=valueTwo,
                  operation=sellcriteria[ind]['Operator'])

    return df
