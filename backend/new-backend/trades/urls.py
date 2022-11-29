from django.urls import path

from .views import trades, trade

app_name = 'trade_history'

urlpatterns = [
    path('', trades, name='trades'),
    path('<int:trade_id>/', trade, name='trade'),
]