import numpy as np
from pandas import DataFrame

def buy(df: DataFrame, valueOne: str, valueTwo: str, operation: str):
    '''
    '''

    # Check if the value is the column name
    if valueOne in df.columns:
        valueOne = df[valueOne]

    # Check if the value is the column name
    if valueTwo in df.columns:
        valueTwo = df[valueTwo]

    # If Buysignal already in the columm
    if ('BuySignal' in df.columns):
        if operation == '>':
            con = ((valueOne > valueTwo)
                   & (df['BuySignal'] == 1))
            df['BuySignal'] = np.where(con, 1, 0)
        elif operation == '<':
            con = ((valueOne < valueTwo)
                   & (df['BuySignal'] == 1))
            df['BuySignal'] = np.where(con, 1, 0)
        elif operation == '=':
            con = ((valueOne == valueTwo)
                   & (df['BuySignal'] == 1))
            df['BuySignal'] = np.where(con, 1, 0)

    # Else create a buy signal
    else:
        if operation == '>':
            con = ((valueOne > valueTwo))
            df['BuySignal'] = np.where(con, 1, 0)
        elif operation == '<':
            con = ((valueOne < valueTwo))
            df['BuySignal'] = np.where(con, 1, 0)
        elif operation == '=':
            con = ((valueOne == valueTwo))
            df['BuySignal'] = np.where(con, 1, 0)

    return df


def sell(df: DataFrame, valueOne: str, valueTwo: str, operation: str):
    '''
    '''
    # Check if the value is the column name
    if valueOne in df.columns:
        valueOne = df[valueOne]

    # Check if the value is the column name
    if valueTwo in df.columns:
        valueTwo = df[valueTwo]

    # If sellsignal already in the column
    if ('SellSignal' in df.columns):
        if operation == '>':
            con = ((valueOne > valueTwo)
                   & (df['SellSignal'] == -1))
            df['SellSignal'] = np.where(con, -1, 0)
        elif operation == '<':
            con = ((valueOne < valueTwo)
                   & (df['SellSignal'] == -1))
            df['SellSignal'] = np.where(con, -1, 0)
        elif operation == '=':
            con = ((valueOne == valueTwo)
                   & (df['SellSignal'] == -1))
            df['SellSignal'] = np.where(con, -1, 0)

    # Else create sell signal
    else:
        if operation == '>':
            con = ((valueOne > valueTwo))
            df['SellSignal'] = np.where(con, -1, 0)
        elif operation == '<':
            con = ((valueOne < valueTwo))
            df['SellSignal'] = np.where(con, -1, 0)
        elif operation == '=':
            con = ((valueOne == valueTwo))
            df['SellSignal'] = np.where(con, -1, 0)

    return df
