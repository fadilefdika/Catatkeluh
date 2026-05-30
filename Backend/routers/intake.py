from fastapi import APIRouter, HTTPException, Depends
from models.intake import StartIntakeRequest, RespondIntakeRequest
from services.intake_service import start_new_session, get_session, process_intake_response
from middleware.auth_guard import verify_token
from config.supabase_client import supabase

router = APIRouter(prefix="/intake", tags=["intake"])

@router.post("/start", summary="Mulai Sesi Wawancara (Intake) Baru")
def start_session(user: dict = Depends(verify_token)):
    """
    Menginisiasi sesi wawancara (anamnesis) medis baru.
    - Mengembalikan `session_id` unik untuk sesi ini.
    - Memberikan pesan sambutan pertama dari asisten AI.
    """
    user_id = user["uid"]
    try:
        session_id = start_new_session(user_id)
        # AI usually initiates or waits for user. Here we just return session_id.
        return {
            "session_id": session_id,
            "message": "Halo! Saya Catatkeluh. Silakan sampaikan apa keluhan utama yang kamu rasakan hari ini?"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/respond", summary="Kirim Respon ke Asisten AI")
def respond_session(req: RespondIntakeRequest, user: dict = Depends(verify_token)):
    """
    Mengirim pesan balasan/keluhan dari pengguna ke asisten AI untuk dianalisis.
    - Asisten (Gemini/Groq) akan membaca konteks percakapan sebelumnya dan memberikan respons klinis yang relevan.
    - Menghasilkan pertanyaan lanjutan untuk memastikan detail SOAP tercakup.
    """
    user_id = user["uid"]
    try:
        ai_data = process_intake_response(req.session_id, user_id, req.message)
        return ai_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/sessions", summary="Daftar Sesi Intake")
def list_sessions(user: dict = Depends(verify_token)):
    """
    Mengambil seluruh daftar sesi wawancara medis yang pernah dilakukan oleh pengguna.
    Diurutkan dari yang paling baru.
    """
    user_id = user["uid"]
    res = supabase.table("intake_sessions").select("*").eq("user_id", user_id).order("created_at", desc=True).execute()
    return res.data

@router.get("/session/{session_id}", summary="Detail Sesi Intake")
def get_session_detail(session_id: str, user: dict = Depends(verify_token)):
    """
    Mengambil detail percakapan utuh dari sebuah sesi wawancara.
    - Membutuhkan `session_id`.
    - Mengembalikan meta sesi beserta seluruh riwayat obrolan (messages).
    """
    user_id = user["uid"]
    session = get_session(session_id, user_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
        
    messages_res = supabase.table("intake_messages").select("*").eq("session_id", session_id).order("message_order").execute()
    
    return {
        "session": session,
        "messages": messages_res.data
    }
