from ta.trend import sma_indicator, adx
from ta.momentum import rsi
from ta.volatility import BollingerBands


class Indicators:
    def __init__(self):
        pass

    def addmovingav(self, dataf, periods: list = [9, 20, 21, 50, 200]):
        '''Args:
            dataf (DataFrame): with name of stock and value
            periods(list): list the window (or periods)

            return:
                python dataframe with a moving average column
        '''

        try:
            for period in (periods if type(periods) is list else [periods]):
                # adding column
                columnname = f'SMA {period}'
                dataf[columnname] = sma_indicator(
                    dataf['ClosePrice'], window=period)

            print('\nMoving averages added to dataframe')

        except Exception as e:
            print(f'\n{e} while adding moving average ')

        return dataf

    def addrsi(self, dataf, periods=14):
        '''Args:
            dataf (DataFrame): with name of stock and value
            periods(int): the window (or periods)

            return:
                python dataframe with a rsi column
        '''

        try:
            # adding column rsi
            dataf['RSI'] = rsi(dataf['ClosePrice'], window=periods)

            print('\nRSI added to dataframe')

        except Exception as e:
            print(f'\n{e} while adding rsi')

        return dataf

    def addbb(self, dataf, periods=14):
        '''Args:
            dataf (DataFrame): with name of stock and value
            periods(int):window (or periods)

            return:
                python dataframe with a Bhighband, Blowerband column
        '''

        try:
            # create bbobj
            bbobj = BollingerBands(dataf['ClosePrice'], window=periods)

            dataf['BB Bhighband'] = bbobj.bollinger_hband()
            dataf['BB Blowerband'] = bbobj.bollinger_lband()

            print('\nBollinger Bands')

        except Exception as e:
            print(f'\n{e} while adding Bollinger Bands')

        return dataf

    def addadx(self, dataf, period=14):
        '''Args:
            dataf (DataFrame): with name of stock and value
            periods(int): the window (or periods)

            return:
                python dataframe with a ADX column
        '''
        try:
            # adx column
            dataf['ADX'] = adx(
                dataf['HighPrice'], dataf['LowPrice'], dataf['ClosePrice'], window=period)

            print('\nADX is added to dataframe')

        except Exception as e:
            print(f'\n{e} while adding ADX')

        return dataf

    def addpp(self, dataf):
        '''Args:
        dataf (dataframe): datafram with High, Low, Close column

        return:
                python dataframe with pp
        '''
        try:

            pp = dataf[['HighPrice', 'LowPrice', 'ClosePrice']].mean(axis=1)

            cpp = pp.shift(1)

            r1pp = (2*(pp) - (dataf['LowPrice'])).shift(1)

            s1pp = (2*(pp) - (dataf['HighPrice'])).shift(1)

            r2pp = ((pp) + (dataf['HighPrice']-dataf['LowPrice'])).shift(1)

            s2pp = ((pp) - (dataf['HighPrice']-dataf['LowPrice'])).shift(1)

            bcpr = (dataf[['HighPrice', 'LowPrice']].mean(axis=1)).shift(1)

            tcpr = (2*(pp) - (dataf['BCPR'])).shift(1)

            # pivot point
            dataf['PP pp'] = cpp
            # r1-pivot point
            dataf['PP r1pp'] = r1pp
            # s1-pivot point
            dataf['PP s1pp'] = s1pp
            # r2-pivot point
            dataf['PP r2pp'] = r2pp
            # s2-pivot point
            dataf['PP s2pp'] = s2pp
            # pp BCPR
            dataf['PP BCPR'] = bcpr
            # pp TCPR
            dataf['PP TCPR'] = tcpr

            print('\nPivot Points added to dataframe')

        except Exception as e:
            print(f'\n{e} while adding pivot points')

        return dataf
