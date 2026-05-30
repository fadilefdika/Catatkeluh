from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import auth, intake, report

tags_metadata = [
    {
        "name": "auth",
        "description": "Operasi autentikasi dan manajemen profil pengguna.",
    },
    {
        "name": "intake",
        "description": "Logika inti asisten medis AI untuk wawancara pasien.",
    },
    {
        "name": "report",
        "description": "Pembuatan, pengambilan, dan pembagian laporan medis berformat SOAP.",
    },
]

app = FastAPI(
    title="Catatkeluh API",
    description="""
**Catatkeluh API** adalah tulang punggung (backend) untuk aplikasi asisten medis berbasis AI.
API ini mengelola autentikasi pengguna, alur wawancara (*intake*) dengan AI, serta pembuatan laporan anamnesis medis terstruktur yang siap dibaca oleh dokter.
    """,
    version="1.0.0",
    contact={
        "name": "Tim Catatkeluh",
        "email": "fadilefd1102@gmail.com",
    },
    openapi_tags=tags_metadata
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(auth.router)
app.include_router(intake.router)
app.include_router(report.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to Catatkeluh API"}
