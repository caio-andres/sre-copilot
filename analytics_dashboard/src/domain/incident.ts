export interface Incident {
  incident_id: string;
  description: string;
  created_at: string;
  resolved_at: string | null;
  status: string;
}
