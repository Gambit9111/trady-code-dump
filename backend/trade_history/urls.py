from django.urls import path

from .views import Trading_accountListCreateAPIView, Trading_accountSingleAPIView

app_name = 'trade_history'

urlpatterns = [
    path('accounts/', Trading_accountListCreateAPIView.as_view(), name='trading_accounts'),
    path('accounts/<int:pk>/', Trading_accountSingleAPIView.as_view(), name='trading_account_single'),

]