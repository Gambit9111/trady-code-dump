from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
import json
import datetime
from .models import CustomUser

# protected view with some dummy data
@api_view(['GET'])
def protected(request):
    if request.user.is_anonymous:
        # Response with json data and status code
        return Response({'error': 'Authentication credentials were not provided.'}, status=status.HTTP_401_UNAUTHORIZED)
    
    if request.method == 'GET':
        data = {
            'id': 1,
            'name': 'John Doe',
            'email': 'belekas@mail.com',
            'created_at': datetime.datetime.now(),
        }
        return Response(data, status=status.HTTP_200_OK)

# register view
@api_view(['POST'])
def register(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        if 'email' not in data or 'password' not in data:
            return Response({'error': 'Email and password are required.'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            CustomUser.objects.create_user(email=data['email'], password=data['password'])
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'success': 'User created successfully.', 'user': data['email']}, status=status.HTTP_201_CREATED)