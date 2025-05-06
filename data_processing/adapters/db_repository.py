from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from adapters.models import Base, IncidentModel


class DBRepository:
    def __init__(self, conn_str: str):
        engine = create_engine(conn_str, echo=False)
        Base.metadata.create_all(engine)
        self.Session = sessionmaker(bind=engine)

    def get_incidents(self):
        session = self.Session()
        incidents = session.query(IncidentModel).all()
        session.close()
        return incidents
