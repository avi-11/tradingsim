def position(dataf, order_side):

    dataf.iloc[0, 'Position'] = float(order_side)

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

                elif (dataf['BuySignal']+dataf['SellSignal'] == 1):
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
    
    
    dataf.iloc[0, 'Capital'] = float(initial_capital)
    dataf.iloc[0, 'PositionSize'] = float(position_size)
    dataf.iloc[0, 'TotalMargin'] = float(initial_capital*position_size)

    for i in dataf.index:
        pass