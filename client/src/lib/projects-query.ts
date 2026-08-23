import type { Project } from "@/types/api";
import { apiUrl } from "@/lib/api";

export const projectsQueryKey = ["projects"] as const;

export async function fetchProjects(): Promise<Project[]> {
  const response = await fetch(apiUrl("/api/projects"));
  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }
  return response.json();
}

export const projectsQueryOptions = {
  queryKey: projectsQueryKey,
  queryFn: fetchProjects,
};
