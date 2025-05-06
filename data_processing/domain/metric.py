from dataclasses import dataclass
from datetime import datetime


@dataclass
class Metric:
    name: str
    value: float
    calculated_at: datetime
