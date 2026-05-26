from pydantic import BaseModel
from typing import Optional, Dict, Any

class StartIntakeRequest(BaseModel):
    pass # Saat ini belum ada payload khusus saat start session

class RespondIntakeRequest(BaseModel):
    session_id: str
    message: str

class AIResponseData(BaseModel):
    empathy: Optional[str] = None
    message: str
    question_category: str
    progress: Dict[str, int]
    is_complete: bool
    extracted_data: Dict[str, Any]
