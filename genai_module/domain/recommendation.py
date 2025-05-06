from dataclasses import dataclass
from datetime import datetime


@dataclass
class Recommendation:
    incident_id: str
    suggestion: str
    generated_at: datetime
