from binance.client import Client
import pandas as pd
import ta
import numpy as np
import csv
import time
import environ

env = environ.Env()
env.read_env("../.env")

class SMA200_Distance_Calculator():
    
    def __init__(self):
        self.client = Client(env("BINANCE_API_KEY"), env("BINANCE_SECRET_KEY"))

    def getdata(self, symbol, interval, start, end):
        df = pd.DataFrame(self.client.get_historical_klines(symbol, interval, start, end))
        df = df.iloc[:, :9]
        df.columns = ['Time', 'Open', 'High', 'Low', 'Close', 'Volume', 'Close_time', 'Quote_av', 'Trades']
        # drop close_time and Quete_av
        df = df.drop(['Close_time', 'Quote_av'], axis=1)
        # convert to datetime
        df['Time'] = pd.to_datetime(df['Time'], unit='ms')
        # set index
        df = df.set_index('Time')
        # convert to float
        df = df.astype(float)
        return df


    def indicators_calculate_distance(self, df):
        # calculate 200 SMA
        df['SMA200'] = ta.trend.sma_indicator(df['Close'], window=200)
        # calculate distance between close and 200 SMA in %
        df['SMA200_dist'] = (df['Close'] - df['SMA200']) / df['SMA200'] * 100
        df = df.dropna()
        return df
    
    def indicators_calculate_relative_trade_count(self, df):
        # calculate relative trade count
        df['Relative_trade_count'] = df['Trades'] / df['Trades'].sum() * 100
        return df


    def get_crypto_symbols(self, random=True, amount=5):
        if random:
            # get 5 random symbols from cryptos.csv
            symbols = pd.read_csv('/home/tren/development/trady/crypto/cryptos.csv')
            symbols = symbols.sample(amount)
            symbols = symbols['Symbol'].tolist()
            return symbols
        if random == False:
            # get all symbols from cryptos.csv
            symbols = pd.read_csv('/home/tren/development/trady/crypto/cryptos.csv')
            symbols = symbols['Symbol'].tolist()
            return symbols


    def data2csv(self, symbols, interval, start, end):
        with open('sma200_dist.csv', 'w') as f:
            write = csv.writer(f)
            write.writerow(['Symbol', 'Close', 'SMA200', 'SMA200_dist'])
            for symbol in symbols:
                data = self.getdata(symbol, interval, start, end)
                data = self.indicators_calculate_distance(data)
                data = data.drop(['Open', 'High', 'Low', 'Volume', 'Trades'], axis=1)
                print(symbol)
                # remove all rows exept the last one
                data = data.iloc[-1:]
                print(data)
                write.writerow([symbol, data['Close'].values[0], data['SMA200'].values[0], data['SMA200_dist'].values[0]])
                print('-------------------------------------------------')
                time.sleep(1)


    def sort_data(self):
        frame = pd.read_csv('/home/tren/development/trady/sma200_dist.csv')
        frame.columns = ['Symbol', 'Close', 'SMA200', 'SMA200_dist']
        frame = frame.set_index('Symbol')

        # get 10 highest SMA200_dist values
        highest = frame.sort_values(by='SMA200_dist', ascending=False).head(10)

        # get 10 lowest SMA200_dist values
        lowest = frame.sort_values(by='SMA200_dist', ascending=True).head(10)

        # get 10 SMA200_dist values closest to 0
        closest = frame.sort_values(by='SMA200_dist', key=lambda x: np.abs(x - 0)).head(10)

        return highest, lowest, closest