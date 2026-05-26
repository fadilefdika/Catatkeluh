import json
from config.supabase_client import supabase
from services.ai_service import ask_ai
import os
import uuid

def read_prompt(filename: str) -> str:
    filepath = os.path.join(os.path.dirname(__file__), "..", "prompts", filename)
    with open(filepath, "r", encoding="utf-8") as f:
        return f.read()

def generate_report(session_id: str, user_id: str):
    # Cek apakah session sudah selesai
    session_res = supabase.table("intake_sessions").select("*").eq("id", session_id).eq("user_id", user_id).single().execute()
    if not session_res.data:
        raise Exception("Session not found")
        
    # Ambil semua pesan
    msg_res = supabase.table("intake_messages").select("*").eq("session_id", session_id).order("message_order").execute()
    messages = msg_res.data or []
    
    # Ekstrak data (kita bisa ambil dari extracted_data di response AI yang tersimpan, atau build context baru)
    # Cara paling akurat adalah meminta AI merangkum history percakapan.
    
    # Kumpulkan semua pesan chat
    history_text = ""
    for msg in messages:
        role_label = "Pasien" if msg["role"] == "user" else "Sistem"
        history_text += f"{role_label}: {msg['content']}\n"
        
    system_prompt = read_prompt("report_generate.txt")
    
    # Replace {extracted_data} dengan history_text
    # Note: Di prompt kita tulis {extracted_data}, tapi kita bisa langsung gabung text.
    final_prompt = system_prompt.replace("{extracted_data}", history_text)
    
    ai_response = ask_ai({"role": "system", "content": final_prompt})
    
    try:
        clean_str = ai_response.strip()
        if clean_str.startswith("```json"):
            clean_str = clean_str[7:]
        if clean_str.endswith("```"):
            clean_str = clean_str[:-3]
        report_json = json.loads(clean_str)
    except json.JSONDecodeError:
        raise Exception("AI failed to generate valid JSON report")
        
    # Buat summary_text dari report_json
    cc = report_json.get("chief_complaint", "")
    hpi = report_json.get("history_of_present_illness", {})
    summary_text = f"Keluhan Utama: {cc}. Berlangsung selama {hpi.get('duration', '')}. "
    
    # Simpan ke tabel reports
    insert_data = {
        "session_id": session_id,
        "user_id": user_id,
        "content_json": report_json,
        "summary_text": summary_text
    }
    
    res = supabase.table("reports").insert(insert_data).execute()
    return res.data[0]

def get_report(report_id: str, user_id: str):
    res = supabase.table("reports").select("*").eq("id", report_id).eq("user_id", user_id).single().execute()
    return res.data

def list_reports(user_id: str):
    res = supabase.table("reports").select("*").eq("user_id", user_id).order("created_at", desc=True).execute()
    return res.data

def get_shared_report(token: str):
    res = supabase.table("reports").select("*").eq("share_token", token).eq("is_shared", True).single().execute()
    return res.data

def share_report(report_id: str, user_id: str, is_shared: bool):
    res = supabase.table("reports").update({"is_shared": is_shared}).eq("id", report_id).eq("user_id", user_id).execute()
    return res.data[0] if res.data else None
