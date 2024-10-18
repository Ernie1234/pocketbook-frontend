import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import { useGetAllCommodities } from "@/hooks/queries/use-commodity";
import { useAuthStore } from "@/store/authStore";

import CommodityForm from "@/components/CommodityComponents/CommodityForm";
import Row from "@/components/CommodityComponents/Row";
import Layout from "@/components/Layout";
import Nav from "@/components/nav/Nav";

export default function CommoditiesPage() {
  const { commodities, isLoading, error, isError } = useGetAllCommodities();
  const { user } = useAuthStore();
  const role = user?.role;

  if (isLoading) return <p>Loading commodity...</p>;
  if (isError) return <p>Error: {error?.message}</p>;

  return (
    <Layout>
      <Nav header="Commodity" />
      <main className="flex flex-col bg-gray-100 p-4 w-full min-h-dvh overflow-scroll no-scrollbar">
        <div className="flex justify-between items-center">
          <h3>search component here</h3>
          {role === "ADMIN" && (
            <Sheet>
              <SheetTrigger asChild>
                <Button>New Commodity</Button>
              </SheetTrigger>
              <SheetContent className="w-[400px] sm:w-[540px]">
                <SheetHeader>
                  <SheetTitle>Add new commodity</SheetTitle>
                </SheetHeader>
                <CommodityForm />
              </SheetContent>
            </Sheet>
          )}
        </div>
        {/* Your commodity market goes here */}
        <div className="flex flex-col gap-3 w-full">
          {/* Empty state */}
          {commodities?.length === 0 && (
            <div className="mx-auto mt-16 text-xl">No commodity in store</div>
          )}
          {/* Commodity container*/}
          {commodities?.length !== 0 && (
            <div className="bg-white mt-8 border rounded-2xl">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px] text-center">
                      Ranking
                    </TableHead>
                    <TableHead>Commodity Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Unit</TableHead>
                    <TableHead>7d</TableHead>
                    <TableHead>Chart</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="px-8">
                  {commodities?.map((commodity, index) => {
                    const comPrice = commodity.prices.at(-1)?.price;

                    return (
                      <Row
                        slug={commodity.slug}
                        index={index}
                        price={comPrice}
                        description={commodity.description}
                        name={commodity.commodityName}
                        unit={commodity.unit}
                        key={commodity.slug}
                      />
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
}
