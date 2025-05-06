import React from "react";
import { useMetrics, useIncidents, useRecommendations } from "../adapters/api";
import KPI from "../components/KPI";
import IncidentList from "../components/IncidentList";

export default function HomePage() {
  const { metrics, isLoading: mLoading } = useMetrics();
  const { incidents, isLoading: iLoading } = useIncidents();
  const { recommendations, isLoading: rLoading } = useRecommendations();

  if (mLoading || iLoading || rLoading) {
    return <div className="p-8">Carregando dados...</div>;
  }

  return (
    <main className="p-8 space-y-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold">SRE Copilot Dashboard</h1>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics?.map((m) => (
          <KPI key={m.id} metric={m} />
        ))}
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Incidentes Recentes</h2>
        <IncidentList
          incidents={incidents || []}
          recommendations={recommendations || []}
        />
      </section>
    </main>
  );
}
