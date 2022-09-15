import quantstats as qs


def reportmateric(dataf):
    '''Args:
    dataf(dataframe): datafram with BuySignal and SellSignal column


    return: matrics
    '''

    dataf['nextclose'] = dataf['ClosePrice'].shift(-1)
    dataf.fillna(0, inplace=True)
    dataf['Profit'] = [float((dataf.loc[i, 'nextclose'] - dataf.loc[i, 'ClosePrice']))
                       if dataf.loc[i, 'Signal'] == 1 else 0 for i in dataf.index]

    if len(dataf['Profit'].value_counts().values)==1:
        return {'Error': 'No Trade Generated!!'}

    return (qs.reports.metrics(dataf['Profit'], mode='full', display=False).round(decimals=4))
