import { ChevronsUpDown, Plus } from "lucide-react";
import Empty from "./Empty";
import { TPortfolioCommodity } from "@/utils/types";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";
import PortfolioRow from "../PortfolioComponents/PortfolioRow";

interface Props {
  portfolio:
    | TPortfolioCommodity[]
    | {
        error: string;
      }
    | undefined;
}

export default function YourCommodity({ portfolio }: Props) {
  if (!Array.isArray(portfolio)) return <p>Error fetching portfolio here.</p>;
  // if (portfolio?.error) return <p>Error fetching portfolio here.</p>;
  if (portfolio?.length === 0)
    return (
      <div className="border-gray-200 bg-white shadow-sm p-4 border rounded-xl h-full">
        <div className="flex justify-center items-center w-full">
          <Empty
            title="No commodities"
            subtitle="Your commodities will appear here"
            showBtn
            btnTitle="Explore Commodity"
          />
        </div>
      </div>
    );

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex justify-between items-center">
        <p className="font-medium text-black text-lg">Your commodities</p>
        <Link to="/dashboard/commodity">
          <button className="flex gap-2 bg-green-800 hover:bg-green-600 px-6 py-2 rounded-full font-semibold text-white">
            <Plus /> Add New
          </button>
        </Link>
      </div>
      <div className="shadow-sm">
        {portfolio?.length === 0 ? (
          <div className="border-gray-200 bg-white shadow-sm p-4 border rounded-xl h-full">
            <div className="flex justify-center items-center w-full">
              <Empty
                title="No commodities"
                subtitle="Your commodities will appear here"
                showBtn
                btnTitle="Explore Commodity"
              />
            </div>
          </div>
        ) : (
          <div className="bg-white mt-0 border rounded-2xl">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="flex justify-start items-center gap-2">
                    Commodity <ChevronsUpDown size={18} />
                  </TableHead>
                  <TableHead>Balance</TableHead>
                  <TableHead className="flex justify-start items-center gap-2">
                    7d %
                    <ChevronsUpDown size={18} />
                  </TableHead>
                  <TableHead>Chart</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="px-8">
                {portfolio.map((commodity, index) => {
                  return (
                    <PortfolioRow
                      id={commodity.id}
                      index={index}
                      price={commodity.balance}
                      quantity={commodity.totalQuantity}
                      name={commodity.commodityName}
                      key={index}
                    />
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}
