import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useSearchParams } from "react-router-dom";
import { searchByCraft } from "../../../services/client/searchByCraft";
import { bigPageSize } from "../../../util/constatnt";

export default function useGetSearchReasult() {
  const [seachParams] = useSearchParams();
  const page = seachParams.get("page") || 1;
  const query = seachParams.get("query") || "";
  const sort = seachParams.get("sort_by") || "default";
  const cities = seachParams.getAll("city");
  const rating = seachParams.get("min_rating");
  const date = seachParams.get("min_join_years");
  const numberOfDoneJobs = seachParams.get("done_jobs");
  const { data: results, isLoading } = useQuery({
    queryKey: [`search-${query}-${sort}-${page}-${Math.random}`],
    queryFn: () =>
      searchByCraft({
        query,
        pageSize: bigPageSize,
        page,
        sort,
        cities,
        ratingGT: rating,
        dateGT: date,
        doneJobs: numberOfDoneJobs,
      }),
  });
  return { isLoading, results };
}
