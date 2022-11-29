from django.urls import path
from . import views

app_name = 'tools'


urlpatterns = [
    path('refresh/indicators/', views.refresh_indicators, name='refresh_indicators'),
    path('refresh/candlesticks/', views.refresh_candlesticks, name='refresh_candlesticks'),
    path('sort/indicators/<str:timeframe>/<str:indicator>/', views.sort_indicators, name='sort_indicators'),
    path('sort/candlesticks/<str:timeframe>/', views.sort_candlesticks, name='sort_candlesticks'),
]