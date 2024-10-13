import { useQuery } from "@tanstack/react-query";

import { getUserPortfolio } from "@/services/apiServices/portfolioQueries";

// Define the custom hook
export const useGetUserPortfolio = () => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["getCommodities"],
    queryFn: async () => getUserPortfolio(),
  });

  return { portfolio: data, isLoading, error, isError };
};
