def position(dataf, order_side):

    dataf.loc[dataf.index[0], 'Position'] = int(order_side)

    # loop over dataf
    for i in dataf.index[1::]:
        buysellcheck = (
            'BuySignal' in dataf.columns and 'SellSignal' in dataf.columns)
        buycheck = ('BuySignal' in dataf.columns)
        sellcheck = ('SellSignal' in dataf.columns)

        if buysellcheck:
            if order_side == 0:

                if (dataf.loc[i, 'BuySignal']+dataf.loc[i, 'SellSignal'] == 0) and (dataf.loc[i, 'BuySignal'] != 0):
                    dataf.loc[i, 'Position'] = -1

                elif (dataf.loc[i, 'BuySignal']+dataf.loc[i, 'SellSignal'] == 1):
                    dataf.loc[i, 'Position'] = 1

                else:
                    dataf.loc[i, 'Position'] = 0

            elif order_side == 1:
                if (dataf.loc[i, 'SellSignal'] == -1):

                    order_side = 0
                    dataf.loc[i, 'Position'] = 0

                elif (dataf.loc[i, 'SellSignal'] == 0 and (dataf.loc[i, 'BuySignal'] == 1 or dataf.loc[i, 'BuySignal'] == 0)):

                    dataf.loc[i, 'Position'] = 1

            elif order_side == -1:
                if (dataf.loc[i, 'BuySignal'] == 1):

                    order_side = 0
                    dataf.loc[i, 'Position'] = 0

                elif (dataf.loc[i, 'BuySignal'] == 0 and (dataf.loc[i, 'SellSignal'] == -1 or dataf.loc[i, 'SellSignal'] == 0)):

                    dataf.loc[i, 'Position'] = -1

        elif buysellcheck == False and buycheck:
            if order_side == 0:

                if dataf.loc[i, 'BuySignal'] == 1:
                    dataf.loc[i, 'Position'] = 1

                elif dataf.loc[i, 'BuySignal'] == 0:
                    dataf.loc[i, 'Position'] = 0

            elif order_side == 1:
                if dataf.loc[i, 'BuySignal'] == 1:
                    dataf.loc[i, 'Position'] = 1

                elif dataf.loc[i, 'BuySignal'] == 0:
                    order_side = 0
                    dataf.loc[i, 'Position'] = 0

            elif order_side == -1:
                if dataf.loc[i, 'BuySignal'] == 1:
                    order_side = 0
                    dataf.loc[i, 'Position'] = 1

                elif dataf.loc[i, 'BuySignal'] == 0:
                    dataf.loc[i, 'Position'] = -1

        elif buysellcheck == False and sellcheck:
            if order_side == 0:
                if dataf.loc[i, 'SellSignal'] == -1:
                    dataf.loc[i, 'Position'] = -1

                elif dataf.loc[i, 'SellSignal'] == 0:
                    dataf.loc[i, 'Position'] = 0

            elif order_side == 1:
                if dataf.loc[i, 'SellSignal'] == -1:
                    order_side = 0
                    dataf.loc[i, 'Position'] = -1

                elif dataf.loc[i, 'SellSignal'] == 0:
                    dataf.loc[i, 'Position'] = 1

            elif order_side == -1:
                if dataf.loc[i, 'SellSignal'] == -1:
                    dataf.loc[i, 'Position'] = -1

                elif dataf.loc[i, 'SellSignal'] == 0:
                    order_side = 0
                    dataf.loc[i, 'Position'] = 0
    return dataf


def margin(dataf, initial_capital, position_size):

    dataf['Capital'] = float(initial_capital)
    dataf['PositionSize'] = float(position_size)
    dataf['TotalMargin'] = float(initial_capital * position_size)
    dataf['Qty'] = (dataf['TotalMargin']/dataf['ClosePrice'])
    dataf['UsedMargin'] = 0

    buyclose = 0
    sellclose = 0

    for i in dataf.index:

        if dataf.loc[i, 'Position'] == 1 and sellclose == 0:

            if buyclose == 0:
                buyclose = dataf.loc[i, 'ClosePrice']

            dataf['Qty'][i::] = (
                dataf.loc[i, 'TotalMargin']/dataf.loc[i, 'ClosePrice'])

            dataf['UsedMargin'][i::] = float(
                dataf.loc[i, 'ClosePrice'] * dataf.loc[i, 'Qty'])

        elif dataf.loc[i, 'Position'] == -1 and buyclose != 0:

            dataf['TotalMargin'][i::] = dataf['TotalMargin'] + \
                (dataf.loc[i, 'Qty'] *
                 float(dataf.loc[i, 'ClosePrice'] - buyclose))

            dataf['UsedMargin'][i::] = 0

        elif dataf.loc[i, 'Position'] == -1 and buyclose == 0:

            if sellclose == 0:
                sellclose = dataf.loc[i, 'ClosePrice']

            dataf['Qty'][i::] = (
                dataf.loc[i, 'TotalMargin']/dataf.loc[i, 'ClosePrice'])

            dataf['UsedMargin'][i::] = float(
                dataf.loc[i, 'ClosePrice'] * dataf.loc[i, 'Qty'])

        elif dataf.loc[i, 'Position'] == 1 and sellclose != 0:

            dataf['TotalMargin'][i::] = dataf['TotalMargin'] + \
                (dataf.loc[i, 'Qty'] *
                 float(sellclose - dataf.loc[i, 'ClosePrice']))

            dataf['UsedMargin'][i::] = 0

        return dataf
