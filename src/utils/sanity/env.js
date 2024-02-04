export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-02-03'

export const dataset = process.env.NODE_ENV === "development" ? process.env.NEXT_PUBLIC_DEVELOPMENT_DATASET : process.env.NEXT_PUBLIC_PRODUCTION_DATASET;
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const useCdn = process.env.NODE_ENV === "development" ? true : false;
