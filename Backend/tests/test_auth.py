import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from fastapi.testclient import TestClient
from main import app
import pytest
from unittest.mock import patch, MagicMock
from gotrue.errors import AuthApiError

client = TestClient(app)

@patch("services.supabase_auth.supabase")
def test_register_user_success(mock_supabase):
    # Setup mock response
    mock_user = MagicMock()
    mock_user.id = "user-123"
    
    mock_session = MagicMock()
    mock_session.access_token = "fake-token"
    
    mock_response = MagicMock()
    mock_response.user = mock_user
    mock_response.session = mock_session
    
    mock_supabase.auth.sign_up.return_value = mock_response
    mock_supabase.table().upsert().execute.return_value = None

    payload = {
        "email": "test@example.com",
        "password": "password123",
        "full_name": "Test User"
    }
    
    response = client.post("/auth/register", json=payload)
    
    assert response.status_code == 200
    assert response.json() == {"message": "User registered successfully", "user_id": "user-123"}
    # Verifikasi email di strip
    mock_supabase.auth.sign_up.assert_called_once_with({
        "email": "test@example.com",
        "password": "password123",
        "options": {"data": {"full_name": "Test User"}}
    })

@patch("services.supabase_auth.supabase")
def test_register_user_already_exists(mock_supabase):
    # Simulasi error dari Supabase saat email sudah terdaftar
    mock_supabase.auth.sign_up.side_effect = AuthApiError("User already registered", 400, "user_already_exists")

    payload = {
        "email": "existing@example.com ", # ada trailing space untuk ngetes strip
        "password": "password123",
        "full_name": "Test User"
    }
    
    response = client.post("/auth/register", json=payload)
    
    assert response.status_code == 400
    assert response.json() == {"detail": "Email sudah digunakan"}

@patch("services.supabase_auth.supabase")
def test_login_user_success(mock_supabase):
    mock_user = MagicMock()
    mock_user.id = "user-123"
    
    mock_session = MagicMock()
    mock_session.access_token = "valid-token"
    
    mock_response = MagicMock()
    mock_response.user = mock_user
    mock_response.session = mock_session
    
    mock_supabase.auth.sign_in_with_password.return_value = mock_response
    
    mock_profile_res = MagicMock()
    mock_profile_res.data = {"full_name": "Test User", "id": "user-123"}
    mock_supabase.table().select().eq().single().execute.return_value = mock_profile_res

    payload = {
        "email": "test@example.com",
        "password": "password123"
    }
    
    response = client.post("/auth/login", json=payload)
    
    assert response.status_code == 200
    assert response.json()["access_token"] == "valid-token"
    assert response.json()["profile"]["full_name"] == "Test User"

@patch("services.supabase_auth.supabase")
def test_login_user_wrong_password(mock_supabase):
    # Simulasi error kredensial salah
    mock_supabase.auth.sign_in_with_password.side_effect = AuthApiError("Invalid login credentials", 400, "invalid_credentials")

    payload = {
        "email": "test@example.com",
        "password": "wrongpassword"
    }
    
    response = client.post("/auth/login", json=payload)
    
    assert response.status_code == 400
    assert response.json() == {"detail": "Email atau password salah"}
