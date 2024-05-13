import { apiPrivate } from "../shared/axios";

export async function searchByCraft({
  query,
  page = 1,
  pageSize,
  sort,
  cities,
  ratingGT,
  dateGT,
  doneJobs,
}) {
  let searchUrl = `/api/client/search?sort=${sort ? (sort == "join_date" ? "default" : sort) : "default"}&craft=${encodeURIComponent(query)}&pagination=${pageSize}&page=${page}`;
  if (ratingGT) searchUrl = `${searchUrl}&ratingGTE=${ratingGT}`;
  if (dateGT) searchUrl = `${searchUrl}&dateGTE=${dateGT}`;
  if (doneJobs) searchUrl = `${searchUrl}&done_jobs=${doneJobs}`;
  if (cities.length > 0)
    for (const city of cities) searchUrl = `${searchUrl}&city[]=${city}`;
  let response;
  try {
    response = await apiPrivate.post(
      searchUrl,
      {},
      {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      },
    );
    const data = await response.data.data;
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}
