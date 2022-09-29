from ta.trend import sma_indicator, adx
from ta.momentum import rsi
from ta.volatility import BollingerBands


class Indicators:
    def __init__(self):
        pass

    def addmovingav(self, df, periods: list = [9, 20, 21, 50, 200]):
        '''Args:
            df (dframe): with name of stock and value
            periods(list): list the window (or periods)

            return:
                python dframe with a moving average column
        '''

        try:
            for period in (periods if type(periods) is list else [periods]):
                # adding column
                columnname = f'SMA {period}'
                df[columnname] = sma_indicator(
                    df['ClosePrice'], window=period)

            print('\nMoving averages added to dframe')

        except Exception as e:
            print(f'\n{e} while adding moving average ')

        return df

    def addrsi(self, df, periods=14):
        '''Args:
            df (dframe): with name of stock and value
            periods(int): the window (or periods)

            return:
                python dframe with a rsi column
        '''

        try:
            # adding column rsi
            columnname = f'RSI {periods}'
            df[columnname] = rsi(df['ClosePrice'], window=periods)

            print('\nRSI added to dframe')

        except Exception as e:
            print(f'\n{e} while adding rsi')

        return df

    def addbb(self, df, periods=14):
        '''Args:
            df (dframe): with name of stock and value
            periods(int):window (or periods)

            return:
                python dframe with a Bhighband, Blowerband column
        '''

        try:
            # create bbobj
            bbobj = BollingerBands(df['ClosePrice'], window=periods)

            df['BB Bhighband'] = bbobj.bollinger_hband()
            df['BB Blowerband'] = bbobj.bollinger_lband()

            print('\nBollinger Bands')

        except Exception as e:
            print(f'\n{e} while adding Bollinger Bands')

        return df

    def addadx(self, df, periods=14):
        '''Args:
            df (dframe): with name of stock and value
            periods(int): the window (or periods)

            return:
                python dframe with a ADX column
        '''
        try:
            # adx column
            columnname = f'ADX {periods}'
            df[columnname] = adx(
                df['HighPrice'], df['LowPrice'], df['ClosePrice'], window=periods)

            print('\nADX is added to dframe')

        except Exception as e:
            print(f'\n{e} while adding ADX')

        return df

    def addpp(self, df):
        '''Args:
        df (dframe): dfram with High, Low, Close column

        return:
                python dframe with pp
        '''
        try:
            pp = df[['HighPrice', 'LowPrice', 'ClosePrice']].mean(axis=1)
            cpp = pp.shift(1)
            r1pp = (2*(pp) - (df['LowPrice'])).shift(1)
            s1pp = (2*(pp) - (df['HighPrice'])).shift(1)
            r2pp = ((pp) + (df['HighPrice']-df['LowPrice'])).shift(1)
            s2pp = ((pp) - (df['HighPrice']-df['LowPrice'])).shift(1)
            bcpr = (df[['HighPrice', 'LowPrice']].mean(axis=1)).shift(1)
            tcpr = (2*(pp) - (df['BCPR'])).shift(1)

            # pivot point
            df['PP pp'] = cpp
            # r1-pivot point
            df['PP r1pp'] = r1pp
            # s1-pivot point
            df['PP s1pp'] = s1pp
            # r2-pivot point
            df['PP r2pp'] = r2pp
            # s2-pivot point
            df['PP s2pp'] = s2pp
            # pp BCPR
            df['PP BCPR'] = bcpr
            # pp TCPR
            df['PP TCPR'] = tcpr
            print('\nPivot Points added to dframe')

        except Exception as e:
            print(f'\n{e} while adding pivot points')

        return df
