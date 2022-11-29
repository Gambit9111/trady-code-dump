from binance.client import Client
import pandas as pd
import ta
import numpy as np
import csv
import time
import environ

env = environ.Env()
env.read_env("../.env")

class CryptoAnalizer():

    def __init__(self):
        self.client = Client(env("BINANCE_API_KEY"), env("BINANCE_SECRET_KEY"))
####################################################################################################

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

    
    def get_symbol_historical_data(self, symbol, interval, start_date, end_date):
        # gets historical data for a single symbol, returns a pandas dataframe
        # to get up to date data, set end_date to date in the future
        df = pd.DataFrame(self.client.get_historical_klines(symbol, interval, start_date, end_date))
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
    

    def indicator_sma(self, df):
        # calculates relative distance between prices and moving averages
        df['SMA50'] = ta.trend.sma_indicator(df['Close'], window=50)
        df['SMA200'] = ta.trend.sma_indicator(df['Close'], window=200)
        #
        # relative distance between sma50 and sma200
        df['SMA50_SMA200'] = (df['SMA50'] - df['SMA200']) / df['SMA200'] * 100
        df['Price_SMA200'] = (df['Close'] - df['SMA200']) / df['SMA200'] * 100
        df = df.dropna()
        return df
    
    def indicator_volume_trades_average(self, df):
        # calculates relative volume and trades
        df['Volume_Avg'] = df['Volume'] / df['Volume'].mean() * 100
        df['Trades_Avg'] = df['Trades'] / df['Trades'].mean() * 100
        df['SMAs_DistancexVolume_Avg'] = (df['Price_SMA200'] - df['SMA50_SMA200']) * df['Volume_Avg']
        # calculate volume and trade percantage change
        df = df.dropna()
        return df


        