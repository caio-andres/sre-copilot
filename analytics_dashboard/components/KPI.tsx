import React from "react";
import { Metric } from "../domain/metric";

interface KPIProps {
  metric: Metric;
}

export default function KPI({ metric }: KPIProps) {
  return (
    <div className="p-4 bg-white rounded-lg shadow flex flex-col items-center">
      <span className="text-sm font-medium text-gray-500">{metric.name}</span>
      <span className="text-2xl font-semibold text-gray-800">
        {metric.value.toFixed(2)}
      </span>
      <span className="text-xs text-gray-400">
        {new Date(metric.calculated_at).toLocaleString()}
      </span>
    </div>
  );
}
