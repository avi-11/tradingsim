def profit(df):
    '''Args:
    df(dframe): dframe with BuySignal and SellSignal column


    return: matrics
    '''

    # Next Day close
    df['nextclose'] = df['ClosePrice'].shift(-1)

    # Calculate Unrealized profit
    signalcheck = 0
    for i in df.index:
        if df.loc[i, 'Signal'] == 1:
            signalcheck = 1

        if signalcheck == 1:
            if df.loc[i, 'BuySignal'] == 1 and df.loc[i, 'SellSignal'] == 0:
                df.loc[i, 'UnrealizedProfit'] = float(
                    df.loc[i, 'Qty']*(df.loc[i, 'nextclose'] - df.loc[i, 'ClosePrice']))

            elif df.loc[i, 'BuySignal'] == 0 or df.loc[i, 'SellSignal'] == -1 or df.loc[i, 'Signal'] == -1:
                signalcheck = 0

    if 'RealizedProfit' in list(df.columns):
        if len(df['UnrealizedProfit'].value_counts().values) < 1:
            return {'Error': 'No Trade Generated!!'}
    elif 'RealizedProfit' not in list(df.columns):
        return {'Error': 'No Trade Generated'}

    return df
