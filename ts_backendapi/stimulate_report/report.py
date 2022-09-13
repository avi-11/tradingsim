
import numpy as np
import quantstats as qs


def reportmateric(dataf):
    '''Args:
    dataf(dataframe): datafram with BuySignal and SellSignal column


    return: matrics
    '''

    dataf['nextclose'] = dataf['ClosePrice'].shift(-1)
    dataf.fillna(0, inplace=True)
    dataf['Profit'] = [float((dataf.loc[i, 'nextclose'] - dataf.loc[i, 'ClosePrice']))
                       if dataf.loc[i, 'Position'] == 1 else 0 for i in dataf.index]

    return qs.reports.metrics(dataf['Profit'], mode='full', display=False)
