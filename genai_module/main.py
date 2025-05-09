import os
import sys
from dotenv import load_dotenv
from adapters.db_repository import DBRepository
from adapters.genai_client import GenAIClient
from use_cases.generate_recommendations import GenerateRecommendations

if __name__ == "__main__":
    load_dotenv()

    # 1️⃣ Subir banco PostgreSQL
    #    docker-compose up -d

    # 2️⃣ Conectar ao DB
    conn_str = (
        f"postgresql://{os.getenv('DB_USER')}:{os.getenv('DB_PASS')}"
        f"@{os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}/{os.getenv('DB_NAME')}"
    )
    db_repo = DBRepository(conn_str)

    # 3️⃣ Inicializar client OpenAI
    try:
        ai_client = GenAIClient(os.getenv("OPENAI_API_KEY"))
    except Exception as e:
        print(f"❌ Erro na inicialização do GenAIClient: {e}")
        sys.exit(1)

    # 4️⃣ Gerar recomendações
    try:
        GenerateRecommendations(db_repo, ai_client).execute()
        print("✅ Recomendações geradas e salvas.")
    except Exception as e:
        print(f"❌ Erro durante geração de recomendações: {e}")
        sys.exit(1)
