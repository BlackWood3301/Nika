from fastapi import APIRouter
from src.backend.comment.dao import CommentDao

router = APIRouter(prefix="/comment",tags=["COMMENT"])

@router.get("/")
async def all():
    return await CommentDao.find_all()

@router.post("/insert")
async def insert(title:str,name:str,description:str):
    return await CommentDao.insert_comment(title=title,name=name,description=description)