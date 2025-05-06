from adapters.db_repository import DBRepository
from adapters.genai_client import GenAIClient
from domain.recommendation import Recommendation
from datetime import datetime


class GenerateRecommendations:
    def __init__(self, db_repo: DBRepository, ai_client: GenAIClient):
        self.db_repo = db_repo
        self.ai_client = ai_client

    def execute(self):
        incidents = self.db_repo.get_incidents()
        if not incidents:
            print("⚠️ Nenhum incidente para processar.")
            return
        for incident_id, description in incidents:
            suggestion = self.ai_client.generate_suggestion(description)
            rec = Recommendation(
                incident_id=incident_id,
                suggestion=suggestion,
                generated_at=datetime.utcnow(),
            )
            self.db_repo.save_recommendation(rec)
