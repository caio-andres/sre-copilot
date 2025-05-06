// src/app/page.tsx
"use client";

import React from "react";
import { useMetrics, useIncidents, useRecommendations } from "@/adapters/api";

export default function HomePage() {
  const { metrics, isLoading: mLoading } = useMetrics();
  const { incidents, isLoading: iLoading } = useIncidents();
  const { recommendations, isLoading: rLoading } = useRecommendations();

  if (mLoading || iLoading || rLoading) {
    return (
      <div
        style={{
          display: "flex",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          color: "#888888",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        Carregando dados…
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "#0a0a0a",
        color: "#e5e5e5",
        fontFamily: "Poppins, sans-serif",
        minHeight: "100vh",
        padding: "32px 16px",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        {/* Header */}
        <header
          style={{
            textAlign: "center",
            marginBottom: "32px",
          }}
        >
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: 700,
              margin: 0,
            }}
          >
            SRE Copilot
          </h1>
          <p
            style={{
              marginTop: "8px",
              fontSize: "1rem",
              color: "#888888",
            }}
          >
            Aplicação inteligente de monitoramento de incidentes com KPIs,
            automação e IA.
          </p>
        </header>

        {/* KPIs Principais */}
        <section style={{ marginBottom: "48px" }}>
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: 600,
              marginBottom: "16px",
            }}
          >
            KPIs Principais
          </h2>
          <div
            style={{
              border: "1px solid #444444",
              borderRadius: "8px",
              padding: "16px",
              display: "flex",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            {metrics?.map((m) => (
              <div
                key={m.id}
                style={{
                  backgroundColor: "#1f1f1f",
                  borderRadius: "8px",
                  flex: "1 1 200px",
                  padding: "16px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.5)",
                }}
              >
                <div
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    color: "#888888",
                    textTransform: "uppercase",
                    marginBottom: "8px",
                  }}
                >
                  {m.name.replace(/_/g, " ")}
                </div>
                <div
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    color: "#2563eb",
                  }}
                >
                  {m.value.toFixed(2)}
                </div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "#888888",
                    marginTop: "4px",
                  }}
                >
                  {new Date(m.calculated_at).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Incidentes Recentes */}
        <section>
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: 600,
              marginBottom: "16px",
            }}
          >
            Incidentes Recentes
          </h2>
          <div
            style={{
              border: "1px solid #444444",
              borderRadius: "8px",
              padding: "16px",
              display: "flex",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            {incidents?.map((inc) => {
              const rec = recommendations?.find(
                (r) => r.incident_id === inc.incident_id
              );
              return (
                <div
                  key={inc.incident_id}
                  style={{
                    backgroundColor: "#1f1f1f",
                    borderRadius: "8px",
                    flex: "1 1 200px",
                    padding: "16px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.5)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "8px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "1rem",
                          fontWeight: 600,
                        }}
                      >
                        {inc.incident_id}
                      </span>
                      <span
                        style={{
                          fontSize: "0.75rem",
                          fontWeight: 500,
                          padding: "2px 6px",
                          borderRadius: "9999px",
                          backgroundColor:
                            inc.status === "resolved" ? "#044f20" : "#715b00",
                          color:
                            inc.status === "resolved" ? "#a3f7bf" : "#facc15",
                        }}
                      >
                        {inc.status.replace(/_/g, " ")}
                      </span>
                    </div>
                    <p
                      style={{
                        fontSize: "0.875rem",
                        color: "#bbbbbb",
                        marginBottom: "8px",
                      }}
                    >
                      {inc.description}
                    </p>
                  </div>
                  {rec ? (
                    <div
                      style={{
                        marginTop: "auto",
                        padding: "12px",
                        backgroundColor: "#0a0a0a",
                        border: "1px solid #444444",
                        borderRadius: "6px",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "0.875rem",
                          color: "#e5e5e5",
                          whiteSpace: "pre-wrap",
                        }}
                      >
                        {rec.suggestion}
                      </p>
                    </div>
                  ) : (
                    <p
                      style={{
                        fontSize: "0.875rem",
                        fontStyle: "italic",
                        color: "#888888",
                        marginTop: "8px",
                      }}
                    >
                      Sem recomendação.
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
