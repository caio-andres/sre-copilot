from adapters.db_repository import DBRepository
from adapters.genai_client import GenAIClient
from domain.recommendation import Recommendation
from datetime import datetime


class GenerateRecommendations:
    def __init__(self, db_repo: DBRepository, ai_client: GenAIClient):
        self.db_repo = db_repo
        self.ai_client = ai_client

    def execute(self):
        # only new incidents
        incidents = self.db_repo.get_incidents_without_recommendation()
        if not incidents:
            print("Nenhum incidente novo para gerar recomendações.")
            return

        for incident_id, description in incidents:
            suggestion = self.ai_client.generate_suggestion(description)
            rec = Recommendation(
                incident_id=incident_id,
                suggestion=suggestion,
                generated_at=datetime.utcnow(),
            )
            self.db_repo.save_recommendation(rec)

        print(f"Geradas e salvas recomendações para {len(incidents)} incidente(s).")
