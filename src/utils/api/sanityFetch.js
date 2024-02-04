import "server-only"
import { sanityClient } from "../sanity/lib/client";

export async function sanityFetch({
  query,
  qParams,
}) {
  return sanityClient.fetch(query, qParams, {
    cache: process.env.NODE_ENV === "development" ? "no-cache" : "force-cache",
    next: { tags: [''] },
  });
}