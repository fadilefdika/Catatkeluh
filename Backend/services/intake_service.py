import json
from backend.config.supabase_client import supabase
from backend.services.ai_service import ask_ai
import os

def read_prompt(filename: str) -> str:
    filepath = os.path.join(os.path.dirname(__file__), "..", "prompts", filename)
    with open(filepath, "r", encoding="utf-8") as f:
        return f.read()

def start_new_session(user_id: str) -> str:
    res = supabase.table("intake_sessions").insert({"user_id": user_id}).execute()
    return res.data[0]["id"]

def get_session(session_id: str, user_id: str):
    res = supabase.table("intake_sessions").select("*").eq("id", session_id).eq("user_id", user_id).single().execute()
    return res.data if res.data else None

def save_message(session_id: str, role: str, content: str, order: int, category: str = None):
    supabase.table("intake_messages").insert({
        "session_id": session_id,
        "role": role,
        "content": content,
        "message_order": order,
        "question_category": category
    }).execute()

def build_messages_for_ai(session_id: str, new_message: str) -> list:
    # Ambil history
    res = supabase.table("intake_messages").select("*").eq("session_id", session_id).order("message_order").execute()
    history = res.data or []
    
    system_prompt = read_prompt("intake_system.txt")
    
    messages = [{"role": "system", "content": system_prompt}]
    
    for msg in history:
        messages.append({"role": msg["role"], "content": msg["content"]})
        
    messages.append({"role": "user", "content": new_message})
    return messages

def process_intake_response(session_id: str, user_id: str, new_message: str):
    # 1. Update session status if needed, check if completed
    session = get_session(session_id, user_id)
    if not session:
        raise Exception("Session not found")
    if session["status"] == "completed":
        raise Exception("Session already completed")

    # 2. Get current order
    res = supabase.table("intake_messages").select("message_order").eq("session_id", session_id).order("message_order", desc=True).limit(1).execute()
    last_order = res.data[0]["message_order"] if res.data else 0
    
    # 3. Save user message
    user_order = last_order + 1
    save_message(session_id, "user", new_message, user_order)

    # 4. Build context & Call AI
    messages = build_messages_for_ai(session_id, new_message)
    ai_response_str = ask_ai(*messages)
    
    # 5. Parse JSON from AI
    # AI returns JSON as instructed in prompt
    try:
        # Strip potential markdown blocks if AI ignored prompt instruction
        clean_str = ai_response_str.strip()
        if clean_str.startswith("```json"):
            clean_str = clean_str[7:]
        if clean_str.endswith("```"):
            clean_str = clean_str[:-3]
        ai_data = json.loads(clean_str)
    except json.JSONDecodeError:
        print("Failed to parse AI response:", ai_response_str)
        raise Exception("AI returned invalid JSON format")

    # 6. Save AI message
    ai_order = user_order + 1
    ai_msg_content = ai_data["message"]
    if ai_data.get("empathy"):
        ai_msg_content = ai_data["empathy"] + " " + ai_msg_content
        
    category = ai_data.get("question_category")
    
    save_message(session_id, "assistant", ai_msg_content, ai_order, category)
    
    # If chief complaint not set, set it based on extracted data
    extracted = ai_data.get("extracted_data", {})
    updates = {}
    if session.get("chief_complaint") is None and extracted.get("chief_complaint"):
        updates["chief_complaint"] = extracted["chief_complaint"]
        
    if ai_data.get("progress"):
        updates["questions_answered"] = ai_data["progress"].get("current", 0)
        
    if ai_data.get("is_complete"):
        updates["status"] = "completed"
        # Supabase will handle completed_at if we pass it, or we leave it.
        # Let's just update status for now.
        
    if updates:
        supabase.table("intake_sessions").update(updates).eq("id", session_id).execute()

    return ai_data
