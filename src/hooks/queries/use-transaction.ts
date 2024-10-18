import { getAllUserTransaction } from "@/services/apiServices/TransactionQueries";
import { useQuery } from "@tanstack/react-query";

// Define the custom hook
export const useGetAllUserTransaction = () => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["getTransaction"],
    queryFn: async () => getAllUserTransaction(),
  });

  return { transaction: data, isLoading, error, isError };
};
