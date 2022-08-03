import pandas as pd
import random


def price_stimulator(close: float, volatility: float, startdate: str, capital: str):

    # get date range of business days.
    dt = pd.date_range(start=startdate, periods=260, freq='B')

    # empty datafram
    df = pd.DataFrame(columns=['ClosePrice'], index=dt)

    for d in df.index:
        df.loc[d, ['ClosePrice']] = close
        low = close-(close*volatility)
        high = close+(close*volatility)
        close = round(random.uniform(low, high), 2)

    df['Qty'] = round(float(capital) / df['ClosePrice'].astype("float"))

    return df
