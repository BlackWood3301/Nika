from fastapi import APIRouter
from src.backend.otv_com.dao import Otv_CommentDao
from datetime import datetime

router = APIRouter(prefix="/otv_comment",tags=["OTV COMMENT"])

@router.get("/")
async def all():
    return await Otv_CommentDao.find_all()

@router.post("/insert")
async def insert(name:str,description:str,father:int):
    return await Otv_CommentDao.insert_comment(name=name,description=description,father_comment=father)