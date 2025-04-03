from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from src.backend.comment.router import router as comment_router
from src.backend.otv_com.router import router as otv_comment_router

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Include API routers
app.include_router(comment_router)
app.include_router(otv_comment_router)

# Mount the frontend directory to serve static files
app.mount("/", StaticFiles(directory="src/frontend", html=True), name="frontend")