from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Text, DateTime, Float

Base = declarative_base()

class IncidentModel(Base):
    __tablename__ = 'incidents'
    id          = Column(Integer, primary_key=True)
    incident_id = Column(String(50))
    description = Column(Text)
    created_at  = Column(DateTime)
    resolved_at = Column(DateTime, nullable=True)
    status      = Column(String(20))

class MetricModel(Base):
    __tablename__ = 'metrics'
    id            = Column(Integer, primary_key=True, autoincrement=True)
    name          = Column(String(50), nullable=False)
    value         = Column(Float, nullable=False)
    calculated_at = Column(DateTime, nullable=False)
