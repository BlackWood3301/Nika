from src.backend.database import Base
from sqlalchemy.orm import Mapped,mapped_column
from sqlalchemy import ForeignKey
from datetime import datetime

class Comment(Base):
    __tablename__ = "otv_comment"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]
    description:Mapped[str]
    created_at: Mapped[datetime]
    father_comment: Mapped[int] = mapped_column(ForeignKey("comment.id"))