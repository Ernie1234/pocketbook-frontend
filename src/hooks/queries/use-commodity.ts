import { useQuery } from "@tanstack/react-query";

import {
  getAllCommodities,
  getCommodityByName,
  getCommodityBySlug,
} from "@/services/apiServices/commodityQueries";

// Define the custom hook
export const useGetAllCommodities = () => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["getCommodities"],
    queryFn: async () => getAllCommodities(),
  });

  return { commodities: data, isLoading, error, isError };
};

// Define the custom hook for fetching a single commodity by slug
export const useGetCommodityBySlug = (slug: string | undefined) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["getCommodity", slug],
    queryFn: async () => {
      if (slug) {
        return await getCommodityBySlug(slug);
      }
    },
    enabled: !!slug, // Only run the query if slug is defined
  });

  return { commodity: data, isLoading, error };
};
// Define the custom hook for fetching a single commodity by Commodity Name
export const useGetCommodityByName = (commodityName: string) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["getCommodity", commodityName],
    queryFn: async () => await getCommodityByName(commodityName),
    enabled: !!commodityName, // Only run the query if commodityName is defined
  });

  return { commodity: data, isLoading, error };
};
