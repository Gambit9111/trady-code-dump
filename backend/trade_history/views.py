from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions, status
from django.contrib.auth import get_user_model

from .serializers import Trading_accountSerializer, TradeSerializer
from .models import Trading_account, Trade

# view to get all and create new trading accounts
class Trading_accountListCreateAPIView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    # gets all trading accounts for the user
    def get(self, request):
        trading_accounts = Trading_account.objects.filter(user=request.user)
        serializer = Trading_accountSerializer(trading_accounts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # creates a new trading account for the user
    def post(self, request):
        serializer = Trading_accountSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


# view for managing trading accounts, deposit / withdraw, delete, change label
class Trading_accountSingleAPIView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    # gets a single trading account
    def get(self, request, pk):
        # check if the trading account belongs to the user and if it exists
        trading_account = Trading_account.objects.filter(user=request.user, pk=pk)
        if trading_account.exists():
            serializer = Trading_accountSerializer(trading_account.first())
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

    # deposits money to the trading account
    def post(self, request, pk):
        # check if the amount is not negative number
        # check if the amount is not a string
        try:
            if request.data["amount"] <= 0:
                return Response(
                    {"message": "Amount must be positive number"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        except:
            return Response(
                {"message": "Amount must be a number"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # check if the trading account belongs to the user and if it exists
        trading_account = Trading_account.objects.filter(user=request.user, pk=pk)
        if trading_account.exists():
            trading_account = trading_account.first()
            trading_account.deposit(request.data["amount"])
            serializer = Trading_accountSerializer(trading_account)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

    # withdraws money from the trading account
    def put(self, request, pk):
        # check if the amount is not negative number
        # check if the amount is not a string
        try:
            if request.data["amount"] <= 0:
                return Response(
                    {"message": "Amount must be positive number"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        except:
            return Response(
                {"message": "Amount must be a number"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        # check if the trading account belongs to the user and if it exists
        trading_account = Trading_account.objects.filter(user=request.user, pk=pk)
        if trading_account.exists():
            trading_account = trading_account.first()
            # check if the trading account has enough money
            if trading_account.balance >= request.data["amount"]:
                trading_account.withdraw(request.data["amount"])
                serializer = Trading_accountSerializer(trading_account)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                # return message that the trading account doesn't have enough money
                return Response(
                    {"message": "Not enough money in the trading account"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

    # deletes a trading account
    def delete(self, request, pk):
        # check if the trading account belongs to the user and if it exists
        trading_account = Trading_account.objects.filter(user=request.user, pk=pk)
        if trading_account.exists():
            trading_account.delete()
            return Response(
                {"message": "succesfully deleted"}, status=status.HTTP_204_NO_CONTENT
            )
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

    # changes the label of a trading account
    def patch(self, request, pk):
        # check if the trading account belongs to the user and if it exists
        trading_account = Trading_account.objects.filter(user=request.user, pk=pk)
        if trading_account.exists():
            # check if the label is not empty
            if request.data["label"]:
                trading_account = trading_account.first()
                trading_account.label = request.data["label"]
                trading_account.save()
                serializer = Trading_accountSerializer(trading_account)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                # return message that the label is empty
                return Response(
                    {"message": "Label cannot be empty"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)
