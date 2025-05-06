// src/app/page.tsx
"use client";

import React from "react";
import { useMetrics, useIncidents, useRecommendations } from "../adapters/api";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";

export default function HomePage() {
  const { metrics, isLoading: mLoading } = useMetrics();
  const { incidents, isLoading: iLoading } = useIncidents();
  const { recommendations, isLoading: rLoading } = useRecommendations();

  if (mLoading || iLoading || rLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <span className="text-muted">Carregando dados...</span>
      </div>
    );
  }

  return (
    <main className="min-h-screen p-8 space-y-12 bg-background">
      <header className="space-y-1">
        <h1 className="text-4xl font-bold text-foreground">SRE Copilot</h1>
        <p className="text-muted">Monitoramento em tempo real</p>
      </header>

      {/* KPIs */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">
          KPIs Principais
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {metrics?.map((m) => (
            <Card key={m.id}>
              <CardHeader>
                <CardTitle className="uppercase text-sm text-muted">
                  {m.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-accent">
                  {m.value.toFixed(2)}
                </div>
                <div className="mt-1 text-xs text-muted">
                  {new Date(m.calculated_at).toLocaleString()}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Incidentes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">
          Incidentes Recentes
        </h2>
        <div className="space-y-4">
          {incidents?.map((inc) => {
            const rec = recommendations?.find(
              (r) => r.incident_id === inc.incident_id
            );
            return (
              <Card key={inc.incident_id}>
                <CardHeader>
                  <CardTitle className="text-base text-foreground">
                    {inc.incident_id} —{" "}
                    <span
                      className={
                        inc.status === "resolved"
                          ? "text-green-400"
                          : "text-yellow-400"
                      }
                    >
                      {inc.status}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted">{inc.description}</p>
                  {rec ? (
                    <pre className="mt-3 p-3 bg-surface text-foreground rounded">
                      {rec.suggestion}
                    </pre>
                  ) : (
                    <p className="mt-3 text-sm italic text-muted">
                      Sem recomendação
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </main>
  );
}
