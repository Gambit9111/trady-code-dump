from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
import requests
import threading
import pandas as pd
import numpy as np


@api_view(['GET'])
def refresh_indicators(request):
    if request.user.is_anonymous:
        # Response with json data and status code
        return Response({'error': 'Authentication credentials were not provided.'}, status=status.HTTP_401_UNAUTHORIZED)

    url = 'https://trady-binance-crypto-data-production.up.railway.app/indicators'
    requests.get(url)
    return Response(status=status.HTTP_200_OK)

@api_view(['GET'])
def refresh_candlesticks(request):
    if request.user.is_anonymous:
        # Response with json data and status code
        return Response({'error': 'Authentication credentials were not provided.'}, status=status.HTTP_401_UNAUTHORIZED)
    
    url = 'https://trady-binance-crypto-data-production.up.railway.app/candlesticks'
    requests.get(url)
    return Response(status=status.HTTP_200_OK)

@api_view(['GET'])
def sort_indicators(request, timeframe, indicator):
    if request.user.is_anonymous:
        # Response with json data and status code
        return Response({'error': 'Authentication credentials were not provided.'}, status=status.HTTP_401_UNAUTHORIZED)

    # url f string with timeframe and indicator
    url = f'https://trady-binance-crypto-data-production.up.railway.app/indicators/{timeframe}'
    response = requests.get(url).json()['data']
    df = pd.DataFrame(response)
    df = df.set_index('symbol')
    df = df.astype(float)
    df = df.dropna()
    # drop all values exept the one we want to sort by
    df = df[[indicator]]
    highest = df.sort_values(by=indicator, ascending=False).head(10)
    lowest = df.sort_values(by=indicator, ascending=True).head(10)
    closest_to_zero = df.sort_values(by=indicator, key=lambda x: np.abs(x - 0)).head(10)
    return Response({
        'highest': highest.to_dict(),
        'lowest': lowest.to_dict(),
        'closest_to_zero': closest_to_zero.to_dict()
    }, status=status.HTTP_200_OK)

@api_view(['GET'])
def sort_candlesticks(request, timeframe):
    if request.user.is_anonymous:
        # Response with json data and status code
        return Response({'error': 'Authentication credentials were not provided.'}, status=status.HTTP_401_UNAUTHORIZED)
        
    # url f string with timeframe and indicator
    url = f'https://trady-binance-crypto-data-production.up.railway.app/candlesticks/{timeframe}'
    response = requests.get(url).json()['data']

    # create empty json
    data = {}

    # set symbol as index in json
    for i in range(len(response)):
        # push symbol to data as index
        data[response[i]['symbol']] = {}
        # push all other data to symbol index
        for key, value in response[i].items():
            if key != 'symbol':
                if value == 'True':
                    data[response[i]['symbol']][key] = value
    
    true_data = {}
    # iterate through the data and remove all symbols that have no values
    for key, value in data.items():
        if value:
            true_data[key] = value
    

    return Response({"data": true_data}, status=status.HTTP_200_OK)