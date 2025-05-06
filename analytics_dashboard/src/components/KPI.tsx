// src/components/KPI.tsx
"use client";
import React from "react";
import { Metric } from "../domain/metric";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";

export function KPI({ metric }: { metric: Metric }) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="text-sm uppercase text-muted">
          {metric.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-accent">
          {metric.value.toFixed(2)}
        </div>
        <div className="mt-1 text-xs text-muted">
          {new Date(metric.calculated_at).toLocaleString()}
        </div>
      </CardContent>
    </Card>
  );
}
