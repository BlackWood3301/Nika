from src.dao.Base import BaseDao
from sqlalchemy import select,delete,insert
from src.backend.otv_com.model import Comment
from src.backend.database import session
from datetime import datetime

class Otv_CommentDao(BaseDao):
    model = Comment

    @classmethod
    async def insert_comment(cls, name: str, description: str, father_comment: int):
        # Создаем объект datetime для текущего времени
        current_time = datetime.now()
        
        async with session.begin() as sess:
            query = insert(Comment).values(
                name=name,
                description=description,
                created_at=current_time,  # Используем объект datetime
                father_comment=father_comment
            )
            result = await sess.execute(query)
            await sess.commit()
            return result.rowcount