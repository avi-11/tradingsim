import pandas as pd
import random


def price_stimulator(instrumentname, closeprice: float, volatility: float, startdate: str):

    # get date range of business days.
    dt = pd.date_range(start=startdate, periods=260, freq='B').strftime('%d-%m-%Y')

    # empty dataframe
    df = pd.DataFrame(columns=['OpenPrice', 'HighPrice', 'LowPrice', 'ClosePrice', 'InstrumentName OHLC'], index=dt)
    # preparing ClosePrice, OpenPrice, HighPrice and LowPrice
    for d in df.index:

        low = closeprice-(closeprice*volatility)
        high = closeprice+(closeprice*volatility)
        closeprice = round(random.uniform(low, high), 2)

        highprice = round(random.uniform(
            closeprice, (closeprice+(closeprice*0.08))), 2)
        lowprice = round(random.uniform(
            closeprice, (closeprice-(closeprice*0.08))), 2)

        openprice = round(random.uniform(lowprice, highprice), 2)

        # df.loc[d, ['OpenPrice']] = openprice
        # df.loc[d, ['HighPrice']] = highprice
        # df.loc[d, ['LowPrice']] = lowprice
        # df.loc[d, ['ClosePrice']] = closeprice

        df.loc[d, ['InstrumentName OHLC']]=[[instrumentname, openprice, highprice, lowprice, closeprice]]

    return df
