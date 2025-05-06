from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from adapters.models import Base, MetricModel
from domain.metric import Metric


class MetricsRepository:
    def __init__(self, conn_str: str):
        engine = create_engine(conn_str, echo=False)
        Base.metadata.create_all(engine)
        self.Session = sessionmaker(bind=engine)

    def save(self, metric: Metric):
        session = self.Session()
        model = MetricModel(
            name=metric.name, value=metric.value, calculated_at=metric.calculated_at
        )
        session.add(model)
        session.commit()
        session.close()
