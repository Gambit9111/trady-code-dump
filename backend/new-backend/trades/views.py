from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from .models import Trade
from .serializers import TradeSerializer, ExitPriceSerializer

# Create your views here.



@api_view(['GET', 'POST'])
def trades(request):
    if request.user.is_anonymous:
        # Response with json data and status code
        return Response({'error': 'Authentication credentials were not provided.'}, status=status.HTTP_401_UNAUTHORIZED)
    
    if request.method == 'GET':
        trades = Trade.objects.filter(user=request.user)
        serializer = TradeSerializer(trades, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    elif request.method == 'POST':
        serializer = TradeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST'])
def trade(request, trade_id):
    if request.user.is_anonymous:
        # Response with json data and status code
        return Response({'error': 'Authentication credentials were not provided.'}, status=status.HTTP_401_UNAUTHORIZED)
    
    if request.method == 'GET':
        try:
            trade = Trade.objects.get(id=trade_id, user=request.user)
        except Trade.DoesNotExist:
            return Response({'error': 'Trade not found.'}, status=status.HTTP_404_NOT_FOUND)
        serializer = TradeSerializer(trade)
        return Response(serializer.data, status=status.HTTP_200_OK)

    elif request.method == 'POST':
        # close trade on a post request
        print(request.data)
        try:
            trade = Trade.objects.get(id=trade_id, user=request.user)
        except Trade.DoesNotExist:
            return Response({'error': 'Trade not found.'}, status=status.HTTP_404_NOT_FOUND)
        serializer = ExitPriceSerializer(data=request.data)
        if serializer.is_valid():
            trade.close(serializer.validated_data['exit_price'])
            return Response({'message': 'Trade closed successfully.'}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
