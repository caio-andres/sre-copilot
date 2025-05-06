from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Text, DateTime
from domain.incident import Incident

Base = declarative_base()

class IncidentModel(Base):
    __tablename__ = 'incidents'
    id = Column(Integer, primary_key=True, autoincrement=True)
    incident_id = Column(String(50), unique=True, nullable=False)
    description = Column(Text)
    created_at = Column(DateTime)
    resolved_at = Column(DateTime, nullable=True)
    status = Column(String(20))

    @classmethod
    def from_domain(cls, incident: Incident):
        return cls(
            incident_id=incident.incident_id,
            description=incident.description,
            created_at=incident.created_at,
            resolved_at=incident.resolved_at,
            status=incident.status
        )
