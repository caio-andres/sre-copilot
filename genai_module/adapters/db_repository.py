from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from adapters.models import RecommendationModel, Base
from domain.recommendation import Recommendation


class DBRepository:
    def __init__(self, conn_str: str):
        engine = create_engine(conn_str, echo=False)
        Base.metadata.create_all(engine)  # cria tabela se não existir
        self.Session = sessionmaker(bind=engine)

    def get_incidents(self):
        session = self.Session()
        rows = session.execute(
            text("SELECT incident_id, description FROM incidents")
        ).all()
        session.close()
        return rows  # lista de tuples (incident_id, description)

    def save_recommendation(self, rec: Recommendation):
        session = self.Session()
        model = RecommendationModel.from_domain(rec)
        session.add(model)
        session.commit()
        session.close()
