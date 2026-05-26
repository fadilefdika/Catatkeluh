import os
import requests
import json
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

groq_client = Groq(api_key=GROQ_API_KEY) if GROQ_API_KEY else None

def ask_gemini(messages: list) -> str:
    if not GEMINI_API_KEY:
        raise Exception("GEMINI_API_KEY is not set")
    
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={GEMINI_API_KEY}"
    
    # Convert standard roles (system, user, assistant) to Gemini format (user, model)
    gemini_contents = []
    system_instruction = None

    for msg in messages:
        role = msg["role"]
        content = msg["content"]
        if role == "system":
            system_instruction = {"parts": [{"text": content}]}
        elif role == "user":
            gemini_contents.append({"role": "user", "parts": [{"text": content}]})
        elif role == "assistant":
            gemini_contents.append({"role": "model", "parts": [{"text": content}]})
    
    payload = {
        "contents": gemini_contents,
        "generationConfig": {
            "temperature": 0.7,
            "maxOutputTokens": 1024,
            "responseMimeType": "application/json" # Memaksa output JSON jika memungkinkan
        }
    }
    
    if system_instruction:
        payload["systemInstruction"] = system_instruction

    headers = {"Content-Type": "application/json"}
    
    response = requests.post(url, headers=headers, json=payload)
    if response.status_code != 200:
        raise Exception(f"Gemini API Error: {response.text}")
    
    data = response.json()
    try:
        return data["candidates"][0]["content"]["parts"][0]["text"]
    except KeyError:
        raise Exception("Failed to parse Gemini response")

def ask_groq(messages: list) -> str:
    if not groq_client:
        raise Exception("GROQ_API_KEY is not set")
    
    try:
        response = groq_client.chat.completions.create(
            messages=messages,
            model="llama-3.1-70b-versatile",
            temperature=0.7,
            max_tokens=1024,
            response_format={"type": "json_object"}
        )
        return response.choices[0].message.content
    except Exception as e:
        raise Exception(f"Groq API Error: {str(e)}")

def ask_ai(*messages: dict) -> str:
    """
    Abstraksi AI Engine: Coba Gemini Flash terlebih dahulu, 
    jika gagal atau rate limit, fallback ke Groq.
    """
    msgs = list(messages)
    try:
        return ask_gemini(msgs)
    except Exception as gemini_err:
        print(f"Gemini Failed: {gemini_err}. Fallback to Groq...")
        try:
            return ask_groq(msgs)
        except Exception as groq_err:
            raise Exception(f"Both AI Engines failed. Groq Error: {groq_err}")

