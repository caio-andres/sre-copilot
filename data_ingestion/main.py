import os
from dotenv import load_dotenv
from adapters.service_now_client import ServiceNowClient
from adapters.db_repository import DBRepository
from use_cases.fetch_incidents import FetchIncidents

if __name__ == "__main__":
    load_dotenv()  # carrega variáveis de .env
    svc = ServiceNowClient(
        os.getenv("SERVICENOW_BASE_URL"),
        os.getenv("SERVICENOW_USER"),
        os.getenv("SERVICENOW_PASS")
    )
    conn = (
        f"postgresql://{os.getenv('DB_USER')}:{os.getenv('DB_PASS')}"
        f"@{os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}/{os.getenv('DB_NAME')}"
    )
    repo = DBRepository(conn)
    FetchIncidents(svc, repo).execute()
    print("✅ Ingestão completa.")
