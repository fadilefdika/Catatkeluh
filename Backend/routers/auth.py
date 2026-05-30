from fastapi import APIRouter, HTTPException, Depends
from models.user import UserRegister, UserLogin, UserProfileUpdate
from services.supabase_auth import register_user, login_user, get_user_profile, update_user_profile
from middleware.auth_guard import verify_token

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/register", summary="Registrasi Pengguna Baru")
def register(auth: UserRegister):
    """
    Mendaftarkan pengguna baru ke dalam sistem menggunakan Supabase Auth.
    - Mengembalikan `user_id` jika berhasil.
    - Memerlukan email yang valid dan password minimal 6 karakter.
    """
    result = register_user(auth)
    if result.get("error"):
        raise HTTPException(status_code=400, detail=result["error"])
    return {
        "message": "User registered successfully",
        "user_id": result["user"].id if result.get("user") else None,
    }

@router.post("/login", summary="Login Pengguna")
def login(auth: UserLogin):
    """
    Mengautentikasi pengguna menggunakan kredensial yang valid.
    - Mengembalikan `access_token` JWT untuk otorisasi endpoint lain.
    - Mengembalikan data `profile` pengguna yang sedang aktif.
    """
    result = login_user(auth)
    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])
    return {
        "access_token": result["access_token"],
        "user_id": result["user"].id,
        "profile": result["profile"]
    }

@router.get("/profile", summary="Ambil Profil Pengguna")
def profile(user: dict = Depends(verify_token)):
    """
    Mengambil data profil pengguna yang saat ini sedang *login*.
    Memerlukan header `Authorization: Bearer <token>`.
    """
    user_id = user["uid"]
    profile_data = get_user_profile(user_id)
    if not profile_data:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile_data

@router.put("/profile", summary="Perbarui Profil Pengguna")
def update_profile(data: UserProfileUpdate, user: dict = Depends(verify_token)):
    """
    Memperbarui data profil pengguna (misalnya nama lengkap, nomor telepon).
    Memerlukan header `Authorization: Bearer <token>`.
    """
    user_id = user["uid"]
    updated = update_user_profile(user_id, data)
    if not updated:
        raise HTTPException(status_code=400, detail="Failed to update profile")
    return {"message": "Profile updated successfully", "profile": updated}
