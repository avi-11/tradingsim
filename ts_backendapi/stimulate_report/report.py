import quantstats as qs


def reportmateric(dataf):
    '''Args:
    dataf(dataframe): datafram with BuySignal and SellSignal column


    return: matrics
    '''
    buysellcheck = (
        'BuySignal' in dataf.columns and 'SellSignal' in dataf.columns)
    buycheck = ('BuySignal' in dataf.columns)
    sellcheck = ('SellSignal' in dataf.columns)

    dataf['nextclose'] = dataf['ClosePrice'].shift(-1)

    if buysellcheck:
        dataf['UnrealizedProfit'] = [dataf.loc[i, 'nextclose'] - dataf.loc[i, 'ClosePrice']
                                     if (dataf.loc[i, 'BuySignal'] == 1) and (dataf.loc[i, 'SellSignal'] == 0) else 0 for i in dataf.index]
    elif buycheck and buysellcheck == False:
        dataf['UnrealizedProfit'] = [dataf.loc[i, 'nextclose']-dataf.loc[i, 'ClosePrice']
                                     if (dataf.loc[i, 'BuySignal'] == 1) else 0 for i in dataf.index]

    startprice = 0
    for i in dataf.index:
        if dataf.loc[i, 'Signal'] == 1:
            startprice = dataf.loc[i, 'ClosePrice']
        elif dataf.loc[i, 'Signal'] == -1 and startprice != 0:
            dataf.loc[i, 'RealizedProfit'] = float(
                dataf.loc[i, 'ClosePrice']-startprice)

    if 'RealizedProfit' in list(dataf.columns):
        if len(dataf['UnrealizedProfit'].value_counts().values) == 1:
            return {'Error': 'No Trade Generated!!'}
    elif 'RealizedProfit' not in list(dataf.columns):
        return {'Error': 'No Trade Generated'}

    return (qs.reports.metrics(dataf['UnrealizedProfit'], mode='full', display=False).round(decimals=4))
