import CommodityForm from "@/components/CommodityComponents/CommodityForm";
import Layout from "@/components/Layout";
import Nav from "@/components/nav/Nav";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function CommodityPage() {
  const role = "ADMIN";

  return (
    <Layout>
      <Nav header="Commodity" />
      <main className="flex flex-col bg-gray-100 p-4 w-full min-h-dvh overflow-scroll no-scrollbar">
        <div className="flex justify-between items-center">
          {/* <h3>search component here</h3> */}
          {role === "ADMIN" && (
            <Sheet>
              <SheetTrigger asChild>
                <Button>New Commodity</Button>
              </SheetTrigger>
              {/* <SheetContent className="w-full sm:min-w-[70vw]"> */}
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
          {/* {commodities.length === 0 && (
            <div className="mx-auto mt-16 text-xl">No commodity in store</div>
            )} */}
          {/* Commodity container*/}
          {/* {commodities.length !== 0 && (
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
                  {commodities.map((commodity, index) => {
                    const comPrice = commodity.price.at(-1)?.price;
                    
                    return (
                        <Row
                        id={commodity.id}
                        index={index}
                        price={comPrice}
                        description={commodity.description}
                        name={commodity.name}
                        unit={commodity.unit}
                        key={index}
                        />
                        );
                        })}
                        </TableBody>
                        </Table>
                        </div>
          )} */}
        </div>
      </main>
    </Layout>
  );
}
