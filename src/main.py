from fastapi import FastAPI
from src.backend.comment.router import router as comment_router
from src.backend.otv_com.router import router as otv_comment_router

app = FastAPI()
app.include_router(comment_router)
app.include_router(otv_comment_router)