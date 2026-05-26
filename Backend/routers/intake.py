from fastapi import APIRouter, HTTPException, Depends
from backend.models.intake import StartIntakeRequest, RespondIntakeRequest
from backend.services.intake_service import start_new_session, get_session, process_intake_response
from backend.middleware.auth_guard import verify_token
from backend.config.supabase_client import supabase

router = APIRouter(prefix="/intake", tags=["intake"])

@router.post("/start")
def start_session(user: dict = Depends(verify_token)):
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

@router.post("/respond")
def respond_session(req: RespondIntakeRequest, user: dict = Depends(verify_token)):
    user_id = user["uid"]
    try:
        ai_data = process_intake_response(req.session_id, user_id, req.message)
        return ai_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/sessions")
def list_sessions(user: dict = Depends(verify_token)):
    user_id = user["uid"]
    res = supabase.table("intake_sessions").select("*").eq("user_id", user_id).order("created_at", desc=True).execute()
    return res.data

@router.get("/session/{session_id}")
def get_session_detail(session_id: str, user: dict = Depends(verify_token)):
    user_id = user["uid"]
    session = get_session(session_id, user_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
        
    messages_res = supabase.table("intake_messages").select("*").eq("session_id", session_id).order("message_order").execute()
    
    return {
        "session": session,
        "messages": messages_res.data
    }
