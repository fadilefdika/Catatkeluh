from fastapi import APIRouter, HTTPException, Depends
from backend.models.report import GenerateReportRequest
from backend.services.report_service import (
    generate_report, get_report, list_reports, 
    get_shared_report, share_report
)
from backend.middleware.auth_guard import verify_token

router = APIRouter(prefix="/report", tags=["report"])

@router.post("/generate")
def api_generate_report(req: GenerateReportRequest, user: dict = Depends(verify_token)):
    user_id = user["uid"]
    try:
        report_data = generate_report(req.session_id, user_id)
        return report_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/list")
def api_list_reports(user: dict = Depends(verify_token)):
    user_id = user["uid"]
    try:
        reports = list_reports(user_id)
        return reports
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/detail/{report_id}")
def api_get_report(report_id: str, user: dict = Depends(verify_token)):
    user_id = user["uid"]
    try:
        report = get_report(report_id, user_id)
        if not report:
            raise HTTPException(status_code=404, detail="Report not found")
        return report
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/share/{report_id}")
def api_share_report(report_id: str, is_shared: bool, user: dict = Depends(verify_token)):
    user_id = user["uid"]
    try:
        updated = share_report(report_id, user_id, is_shared)
        if not updated:
            raise HTTPException(status_code=404, detail="Report not found")
        return {"message": "Share status updated", "share_token": updated["share_token"]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Public endpoint
@router.get("/shared/{token}")
def api_get_shared_report(token: str):
    try:
        report = get_shared_report(token)
        if not report:
            raise HTTPException(status_code=404, detail="Report not found or not shared")
        return report
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
