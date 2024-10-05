import { useQuery } from "@tanstack/react-query";

import { getAllCommodities } from "@/services/apiServices/commodityQueries";

// Define the custom hook
export const useAllCommodities = () => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["getCommodities"],
    queryFn: async () => getAllCommodities(),
  });

  return { commodities: data, isLoading, error, isError };
};
