import { Link } from "react-router-dom";
import { TbCurrencyNaira } from "react-icons/tb";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

import { useGetAllUserTransaction } from "@/hooks/queries/use-transaction";
import { formatPrice } from "@/utils/fnLib";
import Empty from "./Empty";

type CardProps = React.ComponentProps<typeof Card>;

export function RecentTransaction({ className, ...props }: CardProps) {
  const { transaction, isError, isLoading, error } = useGetAllUserTransaction();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching data:{error?.message}</p>;

  return (
    <Card className={cn("w-full", className)} {...props}>
      <CardHeader>
        <CardTitle className="flex justify-between items-center gap-4">
          <p className="text-lg">Recent Transactions</p>
          <Link
            to="/dashboard/transaction"
            className="text-lg text-blue-500 hover:underline"
          >
            View all
          </Link>
        </CardTitle>
      </CardHeader>
      {transaction?.length === 0 ? (
        <>
          <CardContent>
            <Empty
              title="No transaction"
              subtitle="You don’t own any commodity. Ready to buy some"
            />
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              className="w-full border-2 border-foreground"
            >
              Explore Commodity
            </Button>
          </CardFooter>
        </>
      ) : (
        <>
          <CardContent>
            {transaction?.map((t) => (
              <div
                className="flex justify-between items-center pb-4"
                key={t.id}
              >
                <div className="flex flex-col">
                  <h5 className="uppercase text-lg font-semibold">
                    {t?.commodityName}
                    <span className="text-muted-foreground uppercase pl-1.5 text-base">
                      {t?.unit.replace("per ", "")}
                    </span>
                  </h5>
                  <div className="flex gap-2.5">
                    <p className="">{t.type}</p>
                    <p className="flex items-center justify-center font-semibold">
                      <TbCurrencyNaira size={20} />
                      {formatPrice(t.price)}
                    </p>
                  </div>
                </div>
                <div
                  className={cn(
                    "p-1 flex justify-center items-center rounded-lg uppercase text-xs font-semibold",
                    t.status === "abandoned"
                      ? "bg-rose-100/40 text-rose-700"
                      : t.status === "processing"
                      ? "bg-yellow-100"
                      : t.status === "success"
                      ? "bg-green-100 text-green-600"
                      : t.status === "complete"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-200"
                  )}
                >
                  {t.status}
                </div>
              </div>
            ))}
          </CardContent>
        </>
      )}
    </Card>
  );
}
