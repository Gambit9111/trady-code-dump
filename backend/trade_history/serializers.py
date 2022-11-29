from rest_framework import serializers
from .models import Trading_account, Trade

class Trading_accountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trading_account
        fields = ['id', 'label', 'balance']
    
class TradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trade
        fields = '__all__'