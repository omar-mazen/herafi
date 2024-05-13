import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getHomeStats } from "../../services/shared/home";

export default function useHomeStats() {
  const { isLoading, data } = useQuery({
    queryKey: ["homeStats"],
    queryFn: getHomeStats,
    staleTime: Infinity,
  });
  return { isLoading, data };
}
