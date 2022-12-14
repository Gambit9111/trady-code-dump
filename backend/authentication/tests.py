from django.test import TestCase
from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework.test import APITestCase
from rest_framework import status
from .serializers import UserSerializer


class PublicUserApiTests(TestCase):
    """Test the users API (public)"""

    def setUp(self):
        self.client = APIClient()

    def test_create_valid_user_success(self):
        print("test_create_valid_user_success")
        """Test creating user with valid payload is successful"""
        payload = {
            "email": "user1@mail.com",
            "password": "testpass123",
        }
        res = self.client.post(reverse("authentication:register"), payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        user = get_user_model().objects.get(**res.data)
        self.assertTrue(user.check_password(payload["password"]))
        self.assertNotIn("password", res.data)

    def test_user_exists(self):
        print("test_user_exists")
        """Test creating a user that already exists fails"""
        payload = {
            "email": "user1@mail.com",
            "password": "testpass123",
        }
        get_user_model().objects.create_user(**payload)

        res = self.client.post(reverse("authentication:register"), payload)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_password_too_short(self):
        print("test_password_too_short")
        """Test that the password must be more than 5 characters"""
        payload = {
            "email": "user1@mail.com",
            "password": "pw",
        }
        res = self.client.post(reverse("authentication:register"), payload)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        user_exists = get_user_model().objects.filter(email=payload["email"]).exists()
        self.assertFalse(user_exists)

    def test_create_token_for_user(self):
        print("test_create_token_for_user")
        """Test that a token is created for the user"""
        payload = {
            "email": "user1@mail.com",
            "password": "testpass123",
        }
        get_user_model().objects.create_user(**payload)
        res = self.client.post(reverse("authentication:login"), payload)

        self.assertIn("token", res.data)
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_create_token_invalid_credentials(self):
        print("test_create_token_invalid_credentials")
        """Test that token is not created if invalid credentials are given"""
        get_user_model().objects.create_user(
            email="user1@mail.com", password="testpass123"
        )
        payload = {
            "email": "user1@mail.com",
            "password": "wrong",
        }
        res = self.client.post(reverse("authentication:login"), payload)

        self.assertNotIn("token", res.data)
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_token_no_user(self):
        print("test_create_token_no_user")
        """Test that token is not created if user doesn't exist"""
        payload = {
            "email": "user1@mail.com",
            "password": "testpass123",
        }
        res = self.client.post(reverse("authentication:login"), payload)

        self.assertNotIn("token", res.data)
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_token_missing_field(self):
        print("test_create_token_missing_field")
        """Test that email and password are required"""
        res = self.client.post(
            reverse("authentication:login"), {"email": "one", "password": ""}
        )
        self.assertNotIn("token", res.data)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
