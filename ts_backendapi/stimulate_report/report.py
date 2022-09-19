import quantstats as qs


def reportmateric(dataf):
    '''Args:
    dataf(dataframe): datafram with BuySignal and SellSignal column


    return: matrics
    '''

    startprice=0
    for i in dataf.index:
        if dataf.loc[i, 'Signal']==1:
            startprice=dataf.loc[i, 'ClosePrice']
        elif dataf.loc[i, 'Signal']==-1 and startprice!=0:
            dataf.loc[i, 'Profit']=float(dataf.loc[i, 'ClosePrice']-startprice)

    if len(dataf['Profit'].value_counts().values)==1:
        return {'Error': 'No Trade Generated!!'}

    return (qs.reports.metrics(dataf['Profit'], mode='full', display=False).round(decimals=4))
