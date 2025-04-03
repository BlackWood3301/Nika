from sqlalchemy.ext.asyncio import create_async_engine,AsyncSession
from sqlalchemy.orm import sessionmaker ,DeclarativeBase
from src.backend.config import DATABASE_URL

engine = create_async_engine(DATABASE_URL)

session = sessionmaker(engine,class_ = AsyncSession,expire_on_commit=False)

class Base(DeclarativeBase):
    pass
