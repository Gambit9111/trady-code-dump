from django.test import TestCase

from rest_framework.test import APIClient
from rest_framework import status
from django.urls import reverse
from django.contrib.auth import get_user_model

# test register view
class RegisterViewTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.register_url = reverse('register')
        self.user = {
            'email': 'test1@mail.com',
            'password': 'test1234',
        }

    def test_register_user(self):
        response = self.client.post(self.register_url, self.user, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # get the user from db
        user = get_user_model().objects.get(email=self.user['email'])
        self.assertTrue(user.check_password(self.user['password']))

# test protected view

