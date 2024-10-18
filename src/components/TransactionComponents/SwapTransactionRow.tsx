import { useMemo } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { TbCurrencyNaira } from "react-icons/tb";

import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { convertToSlug, formatPrice } from "@/utils/fnLib";

interface Props {
  name: string;
  date: Date;
  amount: number;
  status: string | null;
  receives: number | null;
  transferTo: string | null;
}

export default function SwapTransactionRow({
  name,
  date,
  amount,
  status,
  receives,
  transferTo,
}: Props) {
  const navigate = useNavigate();

  const createAt = useMemo(() => {
    if (!date) return null;

    return format(new Date(date), "MMMM dd, yyyy");
  }, [date]);

  const slug = convertToSlug(name);

  return (
    <TableRow
      className="hover:cursor-pointer"
      onClick={() => navigate(`/dashboard/commodities/${slug}`)}
    >
      <TableCell className="font-medium">{createAt && createAt}</TableCell>
      <TableCell className="flex flex-col justify-center h-full">
        <span className="font-semibold text-lg uppercase">{name}</span>
        <span className="font-medium text-muted-foreground uppercase">ton</span>
      </TableCell>

      <TableCell>
        <div className="flex justify-start items-center gap-1 w-full h-full font-medium">
          <TbCurrencyNaira size={18} />
          <span>{amount && formatPrice(amount)}</span>
        </div>
      </TableCell>
      <TableCell className="flex flex-col justify-center h-full">
        <span className="font-semibold text-lg uppercase">{transferTo}</span>
        <span className="font-medium text-muted-foreground uppercase">ton</span>
      </TableCell>
      <TableCell>
        <div className="flex justify-start items-center gap-1 w-full h-full font-medium">
          <TbCurrencyNaira size={18} />
          <span>{receives && formatPrice(receives)}</span>
        </div>
      </TableCell>
      <TableCell>
        <div
          className={cn(
            "p-1 flex justify-center items-center rounded-lg uppercase text-xs font-semibold",
            status === "abandoned"
              ? "bg-rose-100/40 text-rose-700"
              : status === "processing" || "pending"
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
