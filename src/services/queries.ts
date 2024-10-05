import { useQuery } from "@tanstack/react-query";
import { getAllCommodities } from "./api";

// Define the custom hook
export const useAllCommodities = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["getCommodities"],
    queryFn: async () => getAllCommodities(),
  });

  return { commodities: data, isLoading, error };
};
