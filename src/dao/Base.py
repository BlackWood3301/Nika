from sqlalchemy import select
from src.backend.database import session

class BaseDao:
    model = None

    @classmethod
    async def find_all(cls):
        async with session.begin() as sess:
            query = select(cls.model)
            result = await sess.execute(query)
            return result.mappings().all()
            