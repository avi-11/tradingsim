
import numpy as np
from pandas import DataFrame


def buy(df: DataFrame, valueOne: str, valueTwo: str, operation: str):
    '''
    '''
    if valueOne in df.columns:
        valueOne = df[valueOne]

    if valueTwo in df.columns:
        valueTwo = df[valueTwo]

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
    if valueOne in df.columns:
        valueOne = df[valueOne]

    if valueTwo in df.columns:
        valueTwo = df[valueTwo]

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
