import numpy as np


def position(df, order_side):

    # Create position column
    buysellcheck = (
        'BuySignal' in df.columns and 'SellSignal' in df.columns)
    buycheck = ('BuySignal' in df.columns)
    # sellcheck = ('SellSignal' in df.columns)

    if buysellcheck:
        df['Signal'] = None
        pos = None

        for i in range(len(df)):
            print(df.loc[df.index[i], 'BuySignal'])
            if i < 1:
                df.loc[df.index[i], 'Signal'] = 0
                continue
            if pos == 'Buy' and df.loc[df.index[i], 'SellSignal'] == -1:
                pos = None
                df.loc[df.index[i], 'Signal'] = -1
            elif pos != 'Buy' and df.loc[df.index[i], 'BuySignal'] == 1 and df.loc[df.index[i], 'SellSignal'] == 0:
                if (df.loc[df.index[(i-1)], 'BuySignal']+df.loc[df.index[(i-1)], 'SellSignal'] == 0) and df.loc[df.index[(i-1)], 'BuySignal'] != 0:
                    pos = 'Buy'
                    df.loc[df.index[i], 'Signal'] = 1
                elif df.loc[df.index[(i-1)], 'BuySignal'] == 0:
                    pos = 'Buy'
                    df.loc[df.index[i], 'Signal'] = 1
                else:
                    df.loc[df.index[i], 'Signal'] = 0
            else:
                df.loc[df.index[i], 'Signal'] = 0
        # df.drop(['BuySignal', 'SellSignal'], axis=1, inplace=True)

    elif buysellcheck == False and buycheck:
        con = [(df['BuySignal'] == 1) & (df['BuySignal'].shift(1) == 0),
               (df['BuySignal'] == 0) & (df['BuySignal'].shift(1) == 1)]
        df['Signal'] = np.select(con, [1, -1], 0)
        # df.drop(['BuySignal'], axis=1, inplace=True)

    return df


def margin(df, initial_capital, position_size):

    df['Capital'] = float(initial_capital)
    df['PositionSize'] = float(position_size)
    df['TotalMargin'] = float(initial_capital * position_size)
    df['Qty'] = (df['TotalMargin']/df['ClosePrice'])
    df['UsedMargin'] = 0

    buyclose = 0
    sellclose = 0

    for i in df.index:
        if df.loc[i, 'Signal'] == 1:
            if buyclose == 0:
                buyclose = df.loc[i, 'ClosePrice']
            df['Qty'][i::] = (
                df.loc[i, 'TotalMargin']/df.loc[i, 'ClosePrice'])
            df['UsedMargin'][i::] = float(
                df.loc[i, 'ClosePrice'] * df.loc[i, 'Qty'])

        elif df.loc[i, 'Signal'] == -1 and buyclose != 0:
            df['TotalMargin'][i::] = df.loc[i, 'TotalMargin'] + \
                (df.loc[i, 'Qty'] *
                 float(df.loc[i, 'ClosePrice'] - buyclose))
            df.loc[i, 'RealizedProfit'] = float((df.loc[i, 'Qty'] *
                                                 float(df.loc[i, 'ClosePrice'] - buyclose)))
            df['UsedMargin'][i::] = 0

    return df
