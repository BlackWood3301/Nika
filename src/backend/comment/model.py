from src.backend.database import Base
from sqlalchemy.orm import Mapped,mapped_column

class Comment(Base):
    __tablename__ = "comment"

    id: Mapped[int] = mapped_column(primary_key=True)
    title:Mapped[str]
    name: Mapped[str]
    description:Mapped[str]