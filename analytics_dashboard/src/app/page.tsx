"use client";
import React, { useState } from "react";
import { useMetrics, useIncidents, useRecommendations } from "@/adapters/api";
import { styles } from "./styles";

export default function HomePage() {
  const { metrics, isLoading: mLoad } = useMetrics();
  const { incidents, isLoading: iLoad } = useIncidents();
  const { recommendations, isLoading: rLoad } = useRecommendations();

  if (mLoad || iLoad || rLoad)
    return <div style={styles.loader}>Carregando…</div>;

  const Suggestion = ({ text }: { text: string }) => {
    const [open, setOpen] = useState(false),
      limit = 100,
      isLong = text.length > limit,
      content = open ? text : text.slice(0, limit) + (isLong ? "…" : "");

    return (
      <div style={styles.suggestion}>
        <div
          style={{
            maxHeight: open ? undefined : 40,
            overflow: open ? "visible" : "hidden",
            transition: "max-height 0.3s ease-in-out",
          }}
        >
          <p style={styles.suggestionText}>{content}</p>
        </div>
        {isLong && (
          <button
            onClick={() => setOpen(!open)}
            style={styles.suggestionButton}
          >
            {open ? "Mostrar menos" : "Saiba mais"}
          </button>
        )}
      </div>
    );
  };

  const Card = ({ children }: { children: React.ReactNode }) => (
    <div style={styles.card}>{children}</div>
  );

  const CardContent = ({
    label,
    value,
    date,
  }: {
    label: string;
    value: string;
    date: string;
  }) => (
    <>
      <div style={styles.label}>{label.replace(/_/g, " ")}</div>
      <div style={styles.value}>{value}</div>
      <div style={styles.date}>{new Date(date).toLocaleString()}</div>
    </>
  );

  const Section = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <section style={styles.section}>
      <h2 style={styles.sectionTitle}>{title}</h2>
      <div style={styles.sectionBox}>{children}</div>
    </section>
  );

  return (
    <div style={styles.page}>
      <div style={styles.wrapper}>
        <header style={styles.header}>
          <h1 style={styles.title}>SRE Copilot</h1>
          <p style={styles.subtitle}>
            Monitoramento inteligente com KPIs e IA.
          </p>
        </header>

        <Section title="KPIs Principais">
          {metrics?.map((m) => (
            <Card key={m.id}>
              <CardContent
                label={m.name}
                value={m.value.toFixed(2)}
                date={m.calculated_at}
              />
            </Card>
          ))}
        </Section>

        <Section title="Incidentes Recentes">
          {incidents?.map((inc) => {
            const rec = recommendations?.find(
              (r) => r.incident_id === inc.incident_id
            );
            return (
              <Card key={inc.incident_id}>
                <div style={styles.cardHeader}>
                  <span style={styles.incId}>{inc.incident_id}</span>
                  <span
                    style={{
                      ...styles.status,
                      backgroundColor:
                        inc.status === "resolved" ? "#044f20" : "#715b00",
                      color: inc.status === "resolved" ? "#a3f7bf" : "#facc15",
                    }}
                  >
                    {inc.status.replace(/_/g, " ")}
                  </span>
                </div>
                <p style={styles.desc}>{inc.description}</p>
                {rec ? (
                  <div style={styles.recBox}>
                    <Suggestion text={rec.suggestion} />
                  </div>
                ) : (
                  <p style={styles.noRec}>Sem recomendação.</p>
                )}
              </Card>
            );
          })}
        </Section>
      </div>
    </div>
  );
}
