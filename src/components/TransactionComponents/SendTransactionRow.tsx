import { useMemo } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/utils/fnLib";
import { TbCurrencyNaira } from "react-icons/tb";
import { cn } from "@/lib/utils";

interface Props {
  id: string;
  name: string;
  date: Date;
  amount: number;
  status: string | null;
  address: string | null;
}

export default function SendTransactionRow({
  id,
  name,
  date,
  amount,
  status,
  address,
}: Props) {
  const navigate = useNavigate();

  const createAt = useMemo(() => {
    if (!date) return null;

    return format(new Date(date), "MMMM dd, yyyy");
  }, [date]);

  return (
    <TableRow
      className="hover:cursor-pointer"
      onClick={() => navigate(`/dashboard/commodity/${id}`)}
    >
      <TableCell className="font-medium">{createAt && createAt}</TableCell>
      <TableCell className="flex flex-col justify-center h-full">
        <span className="font-semibold text-lg uppercase">{name}</span>
        <span className="font-medium text-muted-foreground uppercase">smz</span>
      </TableCell>
      <TableCell className="font-medium">UID{address && address}</TableCell>

      <TableCell>
        <div className="flex justify-start items-center gap-1 w-full h-full font-medium">
          <TbCurrencyNaira size={18} />
          <span>{amount && formatPrice(amount)}</span>
        </div>
      </TableCell>
      <TableCell>{amount && formatPrice(amount)}</TableCell>
      <TableCell>
        <div
          className={cn(
            "p-1 flex justify-center items-center rounded-lg uppercase text-xs font-semibold",
            status === "abandoned"
              ? "bg-rose-100/40 text-rose-700"
              : status === "processing"
              ? "bg-yellow-100"
              : status === "success" || "complete"
              ? "bg-green-100 text-green-600"
              : "bg-red-200"
          )}
        >
          {status}
        </div>
      </TableCell>
      <TableCell>
        <Button variant="ghost" className="text-green-500">
          View Details
        </Button>
      </TableCell>
    </TableRow>
  );
}
