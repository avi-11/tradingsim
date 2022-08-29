
import numpy as np
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

    if buysellcheck:
        con = [(dataf['BuySignal']+dataf['SellSignal'] == 0) & (dataf['BuySignal'] != 0),
               (dataf['BuySignal']+dataf['SellSignal'] == 1)]
        dataf['Position'] = np.select(con, [-1, 1], 0)

        dataf['nextclose'] = dataf['ClosePrice'].shift(-1)
        dataf.fillna(0, inplace=True)
        # dataf['Profit'] = [float(dataf.loc[i, 'Qty']*(dataf.loc[i, 'nextclose'] - dataf.loc[i, 'ClosePrice']))
        #                    if dataf.loc[i, 'Position'] == 1 else 0 for i in dataf.index]
        dataf['Profit'] = [float((dataf.loc[i, 'nextclose'] - dataf.loc[i, 'ClosePrice']))
                           if dataf.loc[i, 'Position'] == 1 else 0 for i in dataf.index]

        return qs.reports.metrics(dataf['Profit'], mode='full', display=False)

    elif buysellcheck == False and buycheck:
        dataf['nextclose'] = dataf['ClosePrice'].shift(-1)
        # dataf['Profit'] = [float(dataf.loc[i, 'Qty']*(dataf.loc[i, 'nextclose'] - dataf.loc[i, 'ClosePrice']))
        #                    if dataf.loc[i, 'BuySignal'] == 1 else 0 for i in dataf.index]
        dataf['Profit'] = [float((dataf.loc[i, 'nextclose'] - dataf.loc[i, 'ClosePrice']))
                           if dataf.loc[i, 'BuySignal'] == 1 else 0 for i in dataf.index]

        dataf.fillna(0, inplace=True)

        return qs.reports.metrics(dataf['Profit'], mode='full', display=False)

    elif buysellcheck == False and sellcheck:
        dataf['nextclose'] = dataf['ClosePrice'].shift(-1)
        # dataf['Profit'] = [float(dataf.loc[i, 'Qty']*(dataf.loc[i, 'nextclose'] - dataf.loc[i, 'ClosePrice']))
        #                    if dataf.loc[i, 'SellSignal'] == -1 else 0 for i in dataf.index]
        dataf['Profit'] = [float((dataf.loc[i, 'nextclose'] - dataf.loc[i, 'ClosePrice']))
                           if dataf.loc[i, 'SellSignal'] == -1 else 0 for i in dataf.index]

        dataf.fillna(0, inplace=True)
        
        return qs.reports.metrics(dataf['Profit'], mode='full', display=False)

    else:
        print("Don't have position column in the given dataframe.")
