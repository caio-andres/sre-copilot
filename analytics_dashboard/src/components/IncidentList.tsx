"use client";
import React from "react";
import { Incident } from "../domain/incident";
import { Recommendation } from "../domain/recommendation";
import { Card, CardHeader, CardContent } from "./ui/card";

export function IncidentList({
  incidents,
  recommendations,
}: {
  incidents: Incident[];
  recommendations: Recommendation[];
}) {
  return (
    <div className="space-y-4">
      {incidents.map((inc) => {
        const rec = recommendations.find(
          (r) => r.incident_id === inc.incident_id
        );
        return (
          <Card key={inc.incident_id}>
            <CardHeader className="flex justify-between items-center">
              <span className="font-medium text-foreground">
                {inc.incident_id}
              </span>
              <span
                className={`px-2 py-0.5 rounded-full text-xs ${
                  inc.status === "resolved"
                    ? "bg-green-700 text-green-200"
                    : "bg-yellow-800 text-yellow-200"
                }`}
              >
                {inc.status}
              </span>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted">{inc.description}</p>
              {rec ? (
                <div className="mt-3 p-3 bg-background border border-border rounded">
                  <p className="text-sm text-foreground">{rec.suggestion}</p>
                </div>
              ) : (
                <p className="mt-3 text-sm italic text-muted">
                  Sem recomendação.
                </p>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
