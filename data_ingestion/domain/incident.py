from dataclasses import dataclass
from datetime import datetime


@dataclass
class Incident:
    incident_id: str
    description: str
    created_at: datetime
    resolved_at: datetime | None
    status: str
