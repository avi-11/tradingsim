
import numpy as np
import quantstats as qs


def reportmateric(dataf):
    '''Args:
    dataf(dataframe): datafram with BuyPosition and SellPosition column


    return: matrics
    '''

    buysellcheck = (
        'BuyPosition' in dataf.columns and 'SellPosition' in dataf.columns)
    buycheck = ('BuyPosition' in dataf.columns)
    sellcheck = ('SellPosition' in dataf.columns)

    if buysellcheck:
        con = [(dataf['BuyPosition']+dataf['SellPosition'] == 0) & (dataf['BuyPosition'] != 0),
               (dataf['BuyPosition']+dataf['SellPosition'] == 1)]
        dataf['Position'] = np.select(con, [-1, 1], 0)

        dataf['nextclose'] = dataf['ClosePrice'].shift(-1)
        dataf.fillna(0, inplace=True)
        # dataf['Profit'] = [float(dataf.loc[i, 'Qty']*(dataf.loc[i, 'nextclose'] - dataf.loc[i, 'ClosePrice']))
        #                    if dataf.loc[i, 'Position'] == 1 else 0 for i in dataf.index]
        dataf['Profit'] = [float((dataf.loc[i, 'nextclose'] - dataf.loc[i, 'ClosePrice']))
                           if dataf.loc[i, 'Position'] == 1 else 0 for i in dataf.index]

        print(dataf[dataf['BuyPosition'] == 1])
        print(dataf[dataf['Position'] == 1])
        print(dataf[dataf['Profit'] != 0])
        return qs.reports.metrics(dataf['Profit'], mode='full', display=False)

    elif buysellcheck == False and buycheck:
        dataf['nextclose'] = dataf['ClosePrice'].shift(-1)
        # dataf['Profit'] = [float(dataf.loc[i, 'Qty']*(dataf.loc[i, 'nextclose'] - dataf.loc[i, 'ClosePrice']))
        #                    if dataf.loc[i, 'BuyPosition'] == 1 else 0 for i in dataf.index]
        dataf['Profit'] = [float((dataf.loc[i, 'nextclose'] - dataf.loc[i, 'ClosePrice']))
                           if dataf.loc[i, 'BuyPosition'] == 1 else 0 for i in dataf.index]

        dataf.fillna(0, inplace=True)
        print(dataf[dataf['Profit'] != 0])
        return qs.reports.metrics(dataf['Profit'], mode='full', display=False)

    elif buysellcheck == False and sellcheck:
        dataf['nextclose'] = dataf['ClosePrice'].shift(-1)
        # dataf['Profit'] = [float(dataf.loc[i, 'Qty']*(dataf.loc[i, 'nextclose'] - dataf.loc[i, 'ClosePrice']))
        #                    if dataf.loc[i, 'SellPosition'] == -1 else 0 for i in dataf.index]
        dataf['Profit'] = [float((dataf.loc[i, 'nextclose'] - dataf.loc[i, 'ClosePrice']))
                           if dataf.loc[i, 'SellPosition'] == -1 else 0 for i in dataf.index]

        dataf.fillna(0, inplace=True)
        print(dataf[dataf['Profit'] != 0])
        return qs.reports.metrics(dataf['Profit'], mode='full', display=False)

    else:
        print("Don't have position column in the given dataframe.")
