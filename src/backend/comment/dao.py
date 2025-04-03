from src.dao.Base import BaseDao
from sqlalchemy import select,delete,insert
from src.backend.comment.model import Comment
from src.backend.database import session

class CommentDao(BaseDao):
    model = Comment

    @classmethod
    async def insert_comment(cls, title: str, name: str, description: str):
        async with session.begin() as sess:
            query = insert(Comment).values(
                title=title,
                name=name,
                description=description
            )
            result = await sess.execute(query)
            await sess.commit()
            return result.rowcount