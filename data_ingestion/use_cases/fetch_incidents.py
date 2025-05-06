from adapters.service_now_client import ServiceNowClient
from adapters.db_repository import DBRepository


class FetchIncidents:
    def __init__(self, client: ServiceNowClient, repo: DBRepository):
        self.client = client
        self.repo = repo

    def execute(self):
        raw_incidents = self.client.get_incidents()
        for incident in raw_incidents:
            self.repo.save(incident)
