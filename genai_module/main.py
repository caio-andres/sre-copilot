import os
from dotenv import load_dotenv
from adapters.db_repository import DBRepository
from adapters.genai_client import GenAIClient
from use_cases.generate_recommendations import GenerateRecommendations

if __name__ == "__main__":
    load_dotenv()
    conn_str = (
        f"postgresql://{os.getenv('DB_USER')}:{os.getenv('DB_PASS')}"
        f"@{os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}/{os.getenv('DB_NAME')}"
    )
    db_repo = DBRepository(conn_str)
    # passa também a URL da API
    ai_client = GenAIClient(os.getenv("GEMINI_API_KEY"), os.getenv("GEMINI_API_URL"))
    GenerateRecommendations(db_repo, ai_client).execute()
    print("Recomendações geradas e salvas.")
