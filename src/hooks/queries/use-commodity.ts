import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getAllCommodities,
  getCommodityByName,
  getCommodityBySlug,
  postCommodity,
  updateCommodity,
} from "@/services/apiServices/commodityQueries";

// Define the custom hook
export const usePostCommodity = () => {
  const queryClient = useQueryClient(); // Get the query client for refetching

  const mutation = useMutation({
    mutationFn: postCommodity, // The function to call for creating a commodity
    onSuccess: () => {
      // Invalidate and refetch the commodities after a successful post
      queryClient.invalidateQueries({
        queryKey: ["getCommodities"],
      }); // Ensure this matches your query key
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

// Define the custom hook for editing commodity
export const useUpdateCommodity = () => {
  const queryClient = useQueryClient(); // Get the query client for refetching

  const mutation = useMutation({
    mutationFn: updateCommodity, // The function to call for creating a commodity
    onSuccess: () => {
      // Invalidate and refetch the commodities after a successful post
      queryClient.invalidateQueries({
        queryKey: ["getCommodityBySlug"],
      }); // Ensure this matches your query key
    },
    // You can also pass a queryKey or a refetchInterval to invalidate and refetch the query
    // whenever the commodity's name changes.
    // refetchInterval: 1000, // Every second
    // queryFn: async () => getCommodityByName(commodityName),
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
    refetchOnWindowFocus: true, // Only refetch on page focus
    // refetchInterval: 1000, // Every second
    // staleTime: 60 * 1000, // 1 minute
    // refetchOnReconnect: false, // Only refetch on network reconnection
    // keepPreviousData: true, // Keep previous data in the cache while refetching
  });

  return { commodities: data, isLoading, error, isError };
};

// Define the custom hook for fetching a single commodity by slug
export const useGetCommodityBySlug = (slug: string | undefined) => {
  const { data, error, isPending } = useQuery({
    queryKey: ["getCommodityBySlug", slug],
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
    queryKey: ["getCommodityByName", commodityName],
    queryFn: async () => await getCommodityByName(commodityName),
    enabled: !!commodityName, // Only run the query if commodityName is defined
  });

  return { commodity: data, isLoading, error };
};
