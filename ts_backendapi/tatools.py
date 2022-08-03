from ta.trend import sma_indicator
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
            dataf['rsi'] = rsi(dataf['ClosePrice'], window=periods)

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

            dataf['Bhighband'] = bbobj.bollinger_hband()
            dataf['Blowerband'] = bbobj.bollinger_lband()

            print('\nBollinger Bands')

        except Exception as e:
            print(f'\n{e} while adding Bollinger Bands')

        return dataf
