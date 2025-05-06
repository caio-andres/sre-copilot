import React from "react";
import { Incident } from "../domain/incident";
import { Recommendation } from "../domain/recommendation";

interface Props {
  incidents: Incident[];
  recommendations: Recommendation[];
}

export default function IncidentList({ incidents, recommendations }: Props) {
  return (
    <div className="space-y-4">
      {incidents.map((inc) => {
        const rec = recommendations.find(
          (r) => r.incident_id === inc.incident_id
        );
        return (
          <div key={inc.incident_id} className="p-4 bg-white rounded-lg shadow">
            <h3 className="font-semibold">
              {inc.incident_id} – {inc.status}
            </h3>
            <p className="text-sm text-gray-600">{inc.description}</p>
            {rec ? (
              <pre className="mt-2 p-2 bg-gray-100 rounded">
                {rec.suggestion}
              </pre>
            ) : (
              <p className="mt-2 text-sm text-gray-500 italic">
                Sem recomendação.
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
