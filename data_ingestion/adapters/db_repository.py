from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from domain.incident import Incident
from adapters.models import IncidentModel, Base

class DBRepository:
    def __init__(self, conn_str: str):
        engine = create_engine(conn_str, echo=False)
        Base.metadata.create_all(engine)   # cria tabela se não existir
        self.Session = sessionmaker(bind=engine)

    def save(self, incident: Incident):
        session = self.Session()
        model = IncidentModel.from_domain(incident)
        session.merge(model)   # insere ou atualiza
        session.commit()
        session.close()
