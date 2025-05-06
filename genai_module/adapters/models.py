from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Text, DateTime
from domain.recommendation import Recommendation

Base = declarative_base()


class RecommendationModel(Base):
    __tablename__ = "recommendations"
    id = Column(Integer, primary_key=True, autoincrement=True)
    incident_id = Column(String(50), nullable=False)
    suggestion = Column(Text)
    generated_at = Column(DateTime)

    @classmethod
    def from_domain(cls, rec: Recommendation):
        return cls(
            incident_id=rec.incident_id,
            suggestion=rec.suggestion,
            generated_at=rec.generated_at,
        )
