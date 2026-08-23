import { useQuery } from "@tanstack/react-query";
import { projectsQueryOptions } from "@/lib/projects-query";

export function useProjects() {
  return useQuery(projectsQueryOptions);
}
