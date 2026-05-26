from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routers import auth, intake, report

app = FastAPI(title="Catatkeluh API")

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
