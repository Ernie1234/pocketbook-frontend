import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getAllCommodities,
  getCommodityByName,
  getCommodityBySlug,
  postCommodity,
} from "@/services/apiServices/commodityQueries";

// Define the custom hook
export const usePostCommodity = () => {
  const queryClient = useQueryClient(); // Get the query client for refetching

  const mutation = useMutation({
    mutationFn: postCommodity, // The function to call for creating a commodity
    onSuccess: () => {
      // Invalidate and refetch the commodities after a successful post
      queryClient.invalidateQueries({ queryKey: ["getCommodities"] }); // Ensure this matches your query key
    },
  });

  return {
    mutation,
    isPending: mutation.isPending, // Use isLoading instead of isPending
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};

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
  const { data, error, isPending } = useQuery({
    queryKey: ["getCommodity", slug],
    queryFn: async () => {
      if (slug) {
        return await getCommodityBySlug(slug);
      }
    },
    enabled: !!slug, // Only run the query if slug is defined
  });

  return { commodity: data, isPending, error };
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
