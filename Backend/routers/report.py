from fastapi import APIRouter, HTTPException, Depends
from models.report import GenerateReportRequest
from services.report_service import (
    generate_report, get_report, list_reports, 
    get_shared_report, share_report
)
from middleware.auth_guard import verify_token

router = APIRouter(prefix="/report", tags=["report"])

@router.post("/generate", summary="Hasilkan Laporan Medis (SOAP)")
def api_generate_report(req: GenerateReportRequest, user: dict = Depends(verify_token)):
    """
    Menggunakan AI untuk menyusun riwayat percakapan menjadi laporan terstruktur.
    Format yang dihasilkan mengikuti standar medis dasar (History of Present Illness / SOAP).
    """
    user_id = user["uid"]
    try:
        report_data = generate_report(req.session_id, user_id)
        return report_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/list", summary="Daftar Laporan Medis")
def api_list_reports(user: dict = Depends(verify_token)):
    """
    Mendapatkan daftar semua laporan anamnesis medis milik pengguna.
    """
    user_id = user["uid"]
    try:
        reports = list_reports(user_id)
        return reports
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/detail/{report_id}", summary="Detail Laporan Medis")
def api_get_report(report_id: str, user: dict = Depends(verify_token)):
    """
    Mendapatkan detail spesifik dari satu laporan medis menggunakan `report_id`.
    Hanya dapat diakses oleh pemilik laporan.
    """
    user_id = user["uid"]
    try:
        report = get_report(report_id, user_id)
        if not report:
            raise HTTPException(status_code=404, detail="Report not found")
        return report
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/share/{report_id}", summary="Bagikan Laporan (Toggle)")
def api_share_report(report_id: str, is_shared: bool, user: dict = Depends(verify_token)):
    """
    Mengubah status `is_shared` dari sebuah laporan.
    Jika dibagikan, akan menghasilkan `share_token` agar bisa dibaca oleh dokter melalui tautan publik.
    """
    user_id = user["uid"]
    try:
        updated = share_report(report_id, user_id, is_shared)
        if not updated:
            raise HTTPException(status_code=404, detail="Report not found")
        return {"message": "Share status updated", "share_token": updated["share_token"]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Public endpoint
@router.get("/shared/{token}", summary="Baca Laporan Publik (Dokter)")
def api_get_shared_report(token: str):
    """
    Endpoint publik (tanpa token otorisasi Bearer) untuk dokter melihat laporan pasien.
    - Menggunakan URL /shared/<token_unik>.
    - Gagal jika laporan tidak diatur ke mode publik (is_shared=False).
    """
    try:
        report = get_shared_report(token)
        if not report:
            raise HTTPException(status_code=404, detail="Report not found or not shared")
        return report
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
