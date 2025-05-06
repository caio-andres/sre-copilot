import os
from dotenv import load_dotenv
from adapters.db_repository import DBRepository
from adapters.metrics_repository import MetricsRepository
from use_cases.process_incidents import ProcessIncidents


if __name__ == "__main__":
    load_dotenv()
    conn_str = (
        f"postgresql://{os.getenv('DB_USER')}:{os.getenv('DB_PASS')}"
        f"@{os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}/{os.getenv('DB_NAME')}"
    )
    db_repo = DBRepository(conn_str)
    metrics_repo = MetricsRepository(conn_str)
    ProcessIncidents(db_repo, metrics_repo).execute()
    print("Processamento completo.")
