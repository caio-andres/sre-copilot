from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker

class DBRepository:
    def __init__(self, conn_str: str):
        self.engine = create_engine(conn_str, echo=False)
        self.Session = sessionmaker(bind=self.engine)

    def get_incidents(self) -> list[tuple[str, str]]:
        """All incidents."""
        session = self.Session()
        rows = session.execute(
            text("SELECT incident_id, description FROM incidents")
        ).fetchall()
        session.close()
        return rows

    def get_incidents_without_recommendation(self) -> list[tuple[str, str]]:
        """Only incidents not yet recommended."""
        session = self.Session()
        rows = session.execute(
            text("""
              SELECT i.incident_id, i.description
                FROM incidents i
               WHERE NOT EXISTS (
                       SELECT 1
                         FROM recommendations r
                        WHERE r.incident_id = i.incident_id
                     )
            """)
        ).fetchall()
        session.close()
        return rows

    def save_recommendation(self, recommendation) -> None:
        session = self.Session()
        session.execute(
            text(
                "INSERT INTO recommendations (incident_id, suggestion, generated_at) "
                "VALUES (:incident_id, :suggestion, :generated_at)"
            ),
            {
                "incident_id": recommendation.incident_id,
                "suggestion": recommendation.suggestion,
                "generated_at": recommendation.generated_at,
            }
        )
        session.commit()
        session.close()
