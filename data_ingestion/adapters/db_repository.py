from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from domain.incident import Incident


class DBRepository:
    def __init__(self, conn_str: str):
        engine = create_engine(conn_str, echo=False)
        # cria tabela se não existir
        from adapters.models import Base

        Base.metadata.create_all(engine)
        self.Session = sessionmaker(bind=engine)

    def save(self, incident: Incident):
        """
        Persiste o incidente usando UPSERT para evitar erros de duplicidade.
        """
        session = self.Session()
        session.execute(
            text(
                """
                INSERT INTO incidents (
                    incident_id, description, created_at, resolved_at, status
                ) VALUES (
                    :incident_id, :description, :created_at, :resolved_at, :status
                )
                ON CONFLICT (incident_id) DO UPDATE
                  SET description  = EXCLUDED.description,
                      created_at   = EXCLUDED.created_at,
                      resolved_at  = EXCLUDED.resolved_at,
                      status       = EXCLUDED.status
                """
            ),
            {
                "incident_id": incident.incident_id,
                "description": incident.description,
                "created_at": incident.created_at,
                "resolved_at": incident.resolved_at,
                "status": incident.status,
            },
        )
        session.commit()
        session.close()
