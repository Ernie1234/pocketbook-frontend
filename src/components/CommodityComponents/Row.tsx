import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";

import { formatPrice } from "@/utils/fnLib";
import { TbCurrencyNaira } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { ComChart } from "../shared/ComChart";

interface Props {
  id: string;
  index: number;
  name: string;
  price: number | undefined;
  unit: string;
  description: string;
}

export default function Row({ id, index, name, price, unit }: Props) {
  const navigate = useNavigate();

  return (
    <TableRow
      className="hover:cursor-pointer"
      onClick={() => navigate(`/dashboard/commodity/${id}`)}
    >
      <TableCell>
        <div className="flex justify-center items-center w-full h-full">
          <div className="bg-blue-200/30 p-2 rounded-full max-w-max font-medium text-center text-green-900">
            # {index + 1}
          </div>
        </div>
      </TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>
        <div className="flex items-center gap-0.5 w-full h-full">
          <TbCurrencyNaira size={18} />
          <span>{price && formatPrice(price)}</span>
        </div>
      </TableCell>
      <TableCell className="capitalize">{unit}</TableCell>
      <TableCell>+6.04%</TableCell>
      <TableCell>
        <AspectRatio ratio={16 / 9} className="bg-muted">
          <ComChart />
        </AspectRatio>
      </TableCell>
      <TableCell>
        <Button variant="greenBtn">Buy</Button>
      </TableCell>
    </TableRow>
  );
}
