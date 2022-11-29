from rest_framework import serializers
from .models import Trade

class TradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trade
        fields = ['id', 'symbol', 'type', 'quantity', 'leverage', 'entry_date', 'entry_price', 'exit_date', 'exit_price', 'pnl', 'status']


class ExitPriceSerializer(serializers.Serializer):
    exit_price = serializers.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        model = Trade
        fields = ['exit_price']

    