import "server-only"
import { client } from "../sanity/lib/client";

// sanityFetch accepts your GROQ query and query parameters, and returns the result of the fetch.
export async function sanityFetch({
  query,
  qParams,
  tags = []
}) {
  return client.fetch(query, qParams, {
    // no-cache is used in production to ensure that the cache is always refreshed in development to ensure we're getting the latest content changes ASAP
    cache: process.env.NODE_ENV === "development" ? "no-cache" : "force-cache",
    next: { tags },
  });
}