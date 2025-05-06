import useSWR from "swr";
import { Metric } from "../domain/metric";
import { Incident } from "../domain/incident";
import { Recommendation } from "../domain/recommendation";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useMetrics() {
  const { data, error } = useSWR<Metric[]>("/api/metrics", fetcher);
  return { metrics: data, isLoading: !error && !data, isError: error };
}

export function useIncidents() {
  const { data, error } = useSWR<Incident[]>("/api/incidents", fetcher);
  return { incidents: data, isLoading: !error && !data, isError: error };
}

export function useRecommendations() {
  const { data, error } = useSWR<Recommendation[]>(
    "/api/recommendations",
    fetcher
  );
  return { recommendations: data, isLoading: !error && !data, isError: error };
}
