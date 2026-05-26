from fastapi import Request, HTTPException, Depends
from backend.config.supabase_client import supabase

def verify_token(request: Request):
    """
    Middleware untuk memverifikasi JWT token dari header Authorization.
    Menggunakan Supabase client untuk mendapatkan user dari token.
    """
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Token autentikasi tidak ditemukan atau tidak valid (Gunakan Bearer Token)")

    token = auth_header.replace("Bearer ", "")
    
    try:
        response = supabase.auth.get_user(token)
        if not response.user:
            raise HTTPException(status_code=401, detail="Token tidak valid atau kedaluwarsa")
        return {"uid": response.user.id, "email": response.user.email}
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Sesi tidak valid: {str(e)}")
