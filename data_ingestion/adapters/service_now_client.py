import requests
from domain.incident import Incident
from datetime import datetime


class ServiceNowClient:
    def __init__(self, base_url: str, user: str, pwd: str):
        self.base_url = base_url.rstrip("/")
        self.auth = (user, pwd)

    def get_incidents(self) -> list[Incident]:
        url = f"{self.base_url}/api/now/table/incident"
        resp = requests.get(url, auth=self.auth)
        resp.raise_for_status()
        data = resp.json().get("result", [])
        incidents: list[Incident] = []
        for r in data:
            incidents.append(
                Incident(
                    incident_id=r["number"],
                    description=r["short_description"],
                    created_at=datetime.fromisoformat(r["opened_at"].replace("Z", "")),
                    resolved_at=(
                        datetime.fromisoformat(r["resolved_at"].replace("Z", ""))
                        if r.get("resolved_at")
                        else None
                    ),
                    status=r["state"],
                )
            )
        return incidents
