from adapters.db_repository import DBRepository
from adapters.metrics_repository import MetricsRepository
from domain.metric import Metric
from datetime import datetime


class ProcessIncidents:
    def __init__(self, db_repo: DBRepository, metrics_repo: MetricsRepository):
        self.db_repo = db_repo
        self.metrics_repo = metrics_repo

    def execute(self):
        incidents = self.db_repo.get_incidents()
        # calcula MTTR (segundos)
        durations = [
            (inc.resolved_at - inc.created_at).total_seconds()
            for inc in incidents
            if inc.resolved_at
        ]
        if not durations:
            print("Nenhum incidente resolvido para processamento.")
            return

        mttr_hours = sum(durations) / len(durations) / 3600

        # calcula Availability (%)
        times = [inc.resolved_at or datetime.now() for inc in incidents]
        start = min(inc.created_at for inc in incidents)
        end = max(times)
        period = (end - start).total_seconds()
        downtime = sum(durations)
        availability = (period - downtime) / period * 100

        now = datetime.now()
        metrics = [
            Metric(name="mttr_hours", value=mttr_hours, calculated_at=now),
            Metric(name="availability_percent", value=availability, calculated_at=now),
        ]
        for m in metrics:
            self.metrics_repo.save(m)
