from config.supabase_client import supabase
from gotrue.errors import AuthApiError
from models.user import UserRegister, UserLogin, UserProfileUpdate
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("catatkeluh.debug")

def register_user(data: UserRegister):
    try:
        email = data.email.strip() if data.email else data.email
        
        # Menyusun payload untuk Supabase Auth
        auth_payload = {
            "email": email,
            "password": data.password,
            "options": {
                "data": {
                    "full_name": data.full_name
                }
            }
        }
        
        # Eksekusi pendaftaran akun ke skema auth
        response = supabase.auth.sign_up(auth_payload)
        
        user = response.user
        if user:
            profile_payload = {
                "id": user.id,
                "full_name": data.full_name
            }
            
            supabase.table("profiles").upsert(profile_payload).execute()

        return {"user": user, "session": response.session}
        
    except AuthApiError as e:
        error_message = str(e).lower()
        # --- DEBUG EXCEPTION: ERROR DARI SUPABASE AUTH ---
        logger.error(f"========== [DEBUG ERROR] AuthApiError Terdeteksi: {error_message} ==========")
        
        if "already registered" in error_message:
            return {"error": "Email sudah digunakan"}
        return {"error": f"Registrasi gagal: {error_message}"}
        
    except Exception as e:
        # --- DEBUG EXCEPTION: ERROR UMUM/TEKNIS ---
        logger.error(f"========== [DEBUG ERROR] General Exception Terdeteksi: {str(e)} ==========")
        return {"error": str(e)}

def login_user(data: UserLogin) -> dict:
    try:
        email = data.email.strip() if data.email else data.email
        response = supabase.auth.sign_in_with_password({
            "email": email,
            "password": data.password
        })
        
        user_id = response.user.id
        profile_res = supabase.table("profiles").select("*").eq("id", user_id).single().execute()
        profile_data = profile_res.data if profile_res.data else {}
        
        return {
            "access_token": response.session.access_token,
            "user": response.user,
            "profile": profile_data
        }
    except AuthApiError as e:
        return {"error": "Email atau password salah"}
    except Exception as e:
        return {"error": str(e)}

def get_user_profile(user_id: str):
    profile_res = supabase.table("profiles").select("*").eq("id", user_id).single().execute()
    return profile_res.data if profile_res.data else None

def update_user_profile(user_id: str, data: UserProfileUpdate):
    update_data = {k: v for k, v in data.model_dump().items() if v is not None}
    if not update_data:
        return None
    res = supabase.table("profiles").update(update_data).eq("id", user_id).execute()
    return res.data[0] if res.data else None
