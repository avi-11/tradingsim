
import numpy as np
from pandas import DataFrame


def buy_with_indicators(df:DataFrame, valueOne: str, valueTwo:str, operation: str):
    '''
    '''
    if ('BuyPosition' in df.columns):
        
        if operation=='>':
            con = ((df[valueOne] > df[valueTwo])
                        & (df['BuyPosition'] == 1))
            df['BuyPosition'] = np.where(con, 1, 0)
        elif operation=='<':
            con = ((df[valueOne] < df[valueTwo])
                        & (df['BuyPosition'] == 1))
            df['BuyPosition'] = np.where(con, 1, 0)
        elif operation=='=':
            con = ((df[valueOne] == df[valueTwo])
                        & (df['BuyPosition'] == 1))
            df['BuyPosition'] = np.where(con, 1, 0)
    
    else:
        if operation=='>':
            con = ((df[valueOne] > df[valueTwo]))
            df['BuyPosition'] = np.where(con, 1, 0)
        elif operation=='<':
            con = ((df[valueOne] < df[valueTwo]))
            df['BuyPosition'] = np.where(con, 1, 0)
        elif operation=='=':
            con = ((df[valueOne] == df[valueTwo]))
            df['BuyPosition'] = np.where(con, 1, 0)


    return df

def buy(df:DataFrame, valueOne: str, valueTwo:str, operation: str):
    '''
    '''
    if valueTwo in df.columns:
        valueTwo=df[valueTwo]
    
    if ('BuyPosition' in df.columns):
        if operation=='>':
            con = ((df[valueOne] > valueTwo)
                        & (df['BuyPosition'] == 1))
            df['BuyPosition'] = np.where(con, 1, 0)
        elif operation=='<':
            con = ((df[valueOne] < valueTwo)
                        & (df['BuyPosition'] == 1))
            df['BuyPosition'] = np.where(con, 1, 0)
        elif operation=='=':
            con = ((df[valueOne] == valueTwo)
                        & (df['BuyPosition'] == 1))
            df['BuyPosition'] = np.where(con, 1, 0)
    
    else:
        if operation=='>':
            con = ((df[valueOne] > valueTwo))
            df['BuyPosition'] = np.where(con, 1, 0)
        elif operation=='<':
            con = ((df[valueOne] < valueTwo))
            df['BuyPosition'] = np.where(con, 1, 0)
        elif operation=='=':
            con = ((df[valueOne] == valueTwo))
            df['BuyPosition'] = np.where(con, 1, 0)


    return df

def sell_with_indicators(df:DataFrame, valueOne: str, valueTwo:str, operation: str):
    '''
    '''
    if ('SellPosition' in df.columns):
        
        if operation=='>':
            con = ((df[valueOne] > df[valueTwo])
                        & (df['SellPosition'] == -1))
            df['SellPosition'] = np.where(con, -1, 0)
        elif operation=='<':
            con = ((df[valueOne] < df[valueTwo])
                        & (df['SellPosition'] == -1))
            df['SellPosition'] = np.where(con, -1, 0)
        elif operation=='=':
            con = ((df[valueOne] == df[valueTwo])
                        & (df['SellPosition'] == -1))
            df['SellPosition'] = np.where(con, -1, 0)
    
    else:
        if operation=='>':
            con = ((df[valueOne] > df[valueTwo]))
            df['SellPosition'] = np.where(con, -1, 0)
        elif operation=='<':
            con = ((df[valueOne] < df[valueTwo]))
            df['SellPosition'] = np.where(con, -1, 0)
        elif operation=='=':
            con = ((df[valueOne] == df[valueTwo]))
            df['SellPosition'] = np.where(con, -1, 0)


    return df

def sell(df:DataFrame, valueOne: str, valueTwo:str, operation: str):
    '''
    '''
    if valueTwo in df.columns:
        valueTwo=df[valueTwo]
    
    if ('SellPosition' in df.columns):
        if operation=='>':
            con = ((df[valueOne] > valueTwo)
                        & (df['SellPosition'] == -1))
            df['SellPosition'] = np.where(con, -1, 0)
        elif operation=='<':
            con = ((df[valueOne] < valueTwo)
                        & (df['SellPosition'] == -1))
            df['SellPosition'] = np.where(con, -1, 0)
        elif operation=='=':
            con = ((df[valueOne] == valueTwo)
                        & (df['SellPosition'] == -1))
            df['SellPosition'] = np.where(con, -1, 0)
    
    else:
        if operation=='>':
            con = ((df[valueOne] > valueTwo))
            df['SellPosition'] = np.where(con, -1, 0)
        elif operation=='<':
            con = ((df[valueOne] < valueTwo))
            df['SellPosition'] = np.where(con, -1, 0)
        elif operation=='=':
            con = ((df[valueOne] == valueTwo))
            df['SellPosition'] = np.where(con, -1, 0)


    return df
