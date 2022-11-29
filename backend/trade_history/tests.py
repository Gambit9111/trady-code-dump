from django.test import TestCase
from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework.test import APITestCase
from rest_framework import status
from .models import Trading_account, Trade
from .serializers import Trading_accountSerializer, TradeSerializer

# Create your tests here.
class Trading_accountTests(APITestCase):
    def setUp(self):
        self.user = get_user_model().objects.create_user(
            email="test1@mail.com",
            password="testpass123",
        )
        self.client = APIClient()
        # get token for user
        payload = {"email": "test1@mail.com", "password": "testpass123"}
        response = self.client.post(reverse("authentication:login"), payload)

        self.token = response.data["token"]
        self.client.credentials(HTTP_AUTHORIZATION="Bearer " + self.token)

        # create 2 trading accounts
        url = reverse("trade_history:trading_accounts")
        data = {"label": "Test bybit 1"}
        response = self.client.post(url, data, format="json")
        data = {"label": "Test bybit 2"}
        response = self.client.post(url, data, format="json")
        self.assertEqual(Trading_account.objects.count(), 2)
        self.assertEqual(Trading_account.objects.get(pk=1).label, "Test bybit 1")

    def test_sending_request_without_token(self):
        print("trading_accounts_without_token")
        self.client.credentials()
        url = reverse("trade_history:trading_accounts")
        data = {"label": "Test bybit 3"}
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertEqual(Trading_account.objects.count(), 2)

    def test_get_trading_accounts(self):
        print("test_get_trading_accounts")
        url = reverse("trade_history:trading_accounts")
        response = self.client.get(url, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
        self.assertEqual(response.data[0]["label"], "Test bybit 1")
        # remove the token
        self.client.credentials()
        response = self.client.get(url, format="json")
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
    
    def test_get_trading_account_single(self):
        print("test_get_trading_account_single")
        url = reverse("trade_history:trading_account_single", args=[1])
        response = self.client.get(url, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["label"], "Test bybit 1")
        # remove the token
        self.client.credentials()
        response = self.client.get(url, format="json")
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
    
    def test_get_trading_account_single_not_found(self):
        print("test_get_trading_account_single_not_found")
        url = reverse("trade_history:trading_account_single", args=[3])
        response = self.client.get(url, format="json")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        # remove the token
        self.client.credentials()
        response = self.client.get(url, format="json")
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
    
    def test_get_trading_account_single_wrong_user(self):
        print("test_get_trading_account_single_wrong_user")
        # create a new user
        self.user = get_user_model().objects.create_user(
            email="test2@mail.com",
            password="testpass123",
        )
        self.client = APIClient()
        # get token for user
        payload = {"email": "test2@mail.com", "password": "testpass123"}
        response = self.client.post(reverse("authentication:login"), payload)
        self.token = response.data["token"]
        self.client.credentials(HTTP_AUTHORIZATION="Bearer " + self.token)

        # create 1 trading account
        url = reverse("trade_history:trading_accounts")
        data = {"label": "Test bybit 3"}
        response = self.client.post(url, data, format="json")
        self.assertEqual(Trading_account.objects.count(), 3)
        self.assertEqual(Trading_account.objects.get(pk=3).label, "Test bybit 3")

        # try to get the trading account of the other user
        url = reverse("trade_history:trading_account_single", args=[1])
        response = self.client.get(url, format="json")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_deposit_withdraw_trading_account(self):
        print("test_deposit_withdraw_trading_account")

        url = reverse("trade_history:trading_account_single", args=[1])
        # deposit
        data = {"amount": 100}
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["balance"], "100.00")
        # withdraw
        data = {"amount": 50}
        response = self.client.put(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["balance"], "50.00")
        # withdraw too much
        data = {"amount": 100}
        response = self.client.put(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        # try to deposit float
        data = {"amount": 100.01}
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["balance"], "150.01")
        # try to withdraw float
        data = {"amount": 42.31}
        response = self.client.put(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["balance"], "107.70")
        # try to deposit a negative number
        data = {"amount": -100.23}
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        # try to withdraw a negative number
        data = {"amount": -100}
        response = self.client.put(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        # try to deposit a string
        data = {"amount": "test"}
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        # try to withdraw a string
        data = {"amount": "test"}
        response = self.client.put(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        # try to delete the trading account
        response = self.client.delete(url, format="json")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Trading_account.objects.count(), 1)
        # try to deposit to a deleted trading account
        data = {"amount": 100}
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        # try to withdraw from a deleted trading account
        data = {"amount": 100}
        response = self.client.put(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        # try to change the label
        data = {"label": "Test bybit 2 changed"}
        url = reverse("trade_history:trading_account_single", args=[2])
        response = self.client.patch(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["label"], "Test bybit 2 changed")

    def test_deposit_withdraw_trading_account_wrong_user(self):
        print("test_deposit_withdraw_trading_account_wrong_user")
        # create a new user
        self.user = get_user_model().objects.create_user(
            email="test2@mail.com",
            password="testpass123",
        )
        self.client = APIClient()
        # get token for user
        payload = {"email": "test2@mail.com", "password": "testpass123"}
        response = self.client.post(reverse("authentication:login"), payload)
        self.token = response.data["token"]
        self.client.credentials(HTTP_AUTHORIZATION="Bearer " + self.token)

        # create 1 trading account
        url = reverse("trade_history:trading_accounts")
        data = {"label": "Test bybit 3"}
        response = self.client.post(url, data, format="json")
        self.assertEqual(Trading_account.objects.count(), 3)
        self.assertEqual(Trading_account.objects.get(pk=3).label, "Test bybit 3")

        # try to get the trading account of the other user
        url = reverse("trade_history:trading_account_single", args=[1])
        response = self.client.get(url, format="json")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        
        # try to deposit to the trading account of the other user
        url = reverse("trade_history:trading_account_single", args=[1])
        data = {"amount": 100}
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

        # try to withdraw from the trading account of the other user
        url = reverse("trade_history:trading_account_single", args=[1])
        data = {"amount": 100}
        response = self.client.put(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        
        # try to change the label of the trading account of the other user
        data = {"label": "Test bybit 1 changed"}
        url = reverse("trade_history:trading_account_single", args=[1])
        response = self.client.patch(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

        # try to delete the trading account of the other user
        url = reverse("trade_history:trading_account_single", args=[1])
        response = self.client.delete(url, format="json")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        

