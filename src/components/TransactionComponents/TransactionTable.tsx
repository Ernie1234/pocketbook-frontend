import { useState } from "react";
import { ChevronsUpDown } from "lucide-react";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

import { Tabs } from "@/types/Transaction.types";
import { useGetAllUserTransaction } from "@/hooks/queries/use-transaction";
import TransactionRow from "./TransactionRow";
import SwapTransactionRow from "./SwapTransactionRow";
import SoldTransactionRow from "./SoldTransactionRow";
import SendTransactionRow from "./SendTransactionRow";

export default function TransactionTable() {
  const [activeTab, setActiveTab] = useState(Tabs.BOUGHT);

  const { transaction, isError, isLoading, error } = useGetAllUserTransaction();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching data:{error?.message}</p>;

  // TO GET ALL TRANSACTIONS THAT HAS THE TYPE === BOUGHT
  const boughtTransactions = transaction?.filter((t) => t.type === Tabs.BOUGHT);
  // TO GET ALL TRANSACTIONS THAT HAS THE TYPE === SOLD
  const soldTransactions = transaction?.filter((t) => t.type === Tabs.SOLD);
  // TO GET ALL TRANSACTIONS THAT HAS THE TYPE === SOLD
  const swapTransactions = transaction?.filter((t) => t.type === Tabs.SWAP);
  // TO GET ALL TRANSACTIONS THAT HAS THE TYPE === SEND
  const sendTransactions = transaction?.filter((t) => t.type === Tabs.SENT);
  // TO GET ALL TRANSACTIONS THAT HAS THE TYPE === RECEIVED
  const receivedTransactions = transaction?.filter(
    (t) => t.type === Tabs.RECEIVED
  );

  return (
    <div className="flex flex-col border-gray-300 bg-white border rounded-xl overflow-hidden">
      <div className="flex justify-between items-center w-full transition-all duration-500">
        <p
          className={cn(
            "flex justify-center items-center p-4 w-full hover:cursor-pointer",
            activeTab === Tabs.BOUGHT
              ? "rounded-none bg-white"
              : activeTab !== Tabs.SOLD
              ? "rounded-none bg-gray-200"
              : "bg-gray-200 rounded-br-2xl"
          )}
          onClick={() => setActiveTab(Tabs.BOUGHT)}
        >
          Commodity Bought
        </p>
        <p
          className={cn(
            "flex justify-center items-center p-4 w-full hover:cursor-pointer",
            activeTab === Tabs.SOLD
              ? "rounded-none bg-white"
              : activeTab !== Tabs.BOUGHT
              ? "rounded-none bg-gray-200"
              : "bg-gray-200 rounded-br-2xl"
          )}
          onClick={() => setActiveTab(Tabs.SOLD)}
        >
          Withdraws
        </p>
        <p
          className={cn(
            "flex justify-center items-center p-4 w-full hover:cursor-pointer",
            activeTab === Tabs.SWAP
              ? "rounded-none bg-white"
              : activeTab !== Tabs.SOLD
              ? "rounded-none bg-gray-200"
              : "bg-gray-200 rounded-br-2xl"
          )}
          onClick={() => setActiveTab(Tabs.SWAP)}
        >
          Commodity swap
        </p>
        <p
          className={cn(
            "flex justify-center items-center p-4 w-full hover:cursor-pointer",
            activeTab === Tabs.SENT
              ? "rounded-none bg-white"
              : activeTab !== Tabs.SOLD
              ? "rounded-none bg-gray-200"
              : "bg-gray-200 rounded-br-2xl"
          )}
          onClick={() => setActiveTab(Tabs.SENT)}
        >
          Sent commodities
        </p>
        <p
          className={cn(
            "flex justify-center items-center p-4 w-full hover:cursor-pointer",
            activeTab === Tabs.RECEIVED
              ? "rounded-none bg-white"
              : activeTab !== Tabs.SOLD
              ? "rounded-none bg-gray-200"
              : "bg-gray-200 rounded-br-2xl"
          )}
          onClick={() => setActiveTab(Tabs.RECEIVED)}
        >
          Received commodities
        </p>
      </div>
      {activeTab === Tabs.BOUGHT && (
        <div className="bg-white rounded-2xl">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="flex items-center gap-1">
                  Date <ChevronsUpDown size={18} />
                </TableHead>
                <TableHead>Commodity Wallet</TableHead>
                <TableHead>Amount bought</TableHead>
                <TableHead>Quantity receive</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="px-8">
              {boughtTransactions?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5}>
                    <p className="py-20 w-full font-semibold text-center text-xl">
                      No bought transaction yet!
                    </p>
                  </TableCell>
                </TableRow>
              ) : (
                boughtTransactions?.map((item) => {
                  return (
                    <TransactionRow
                      key={item.id}
                      name={item.commodityName}
                      date={item.createdAt}
                      price={item.price}
                      quantity={item.quantity}
                      status={item.status}
                    />
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      )}
      {activeTab === Tabs.SWAP && (
        <div className="bg-white rounded-2xl">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="flex items-center gap-1">
                  Date <ChevronsUpDown size={18} />
                </TableHead>
                <TableHead>Transfer Wallet</TableHead>
                <TableHead>Amount swap</TableHead>
                <TableHead>Receiving wallet</TableHead>
                <TableHead>Wallet Received</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="px-8">
              {swapTransactions?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5}>
                    <p className="py-20 w-full font-semibold text-center text-xl">
                      No sold transaction yet!
                    </p>
                  </TableCell>
                </TableRow>
              ) : (
                swapTransactions?.map((item) => {
                  return (
                    <SwapTransactionRow
                      key={item.id}
                      name={item.commodityName}
                      date={item.createdAt}
                      amount={item.price}
                      status={item.status}
                      receives={item.quantity}
                      transferTo={item.reference}
                    />
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      )}
      {activeTab === Tabs.SOLD && (
        <div className="bg-white rounded-2xl">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="flex items-center gap-1">
                  Date <ChevronsUpDown size={18} />
                </TableHead>
                <TableHead>Commodity Wallet</TableHead>
                <TableHead>Amount Sold</TableHead>
                <TableHead>Amount Received</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="px-8">
              {soldTransactions?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5}>
                    <p className="py-20 w-full font-semibold text-center text-xl">
                      No sold transaction yet!
                    </p>
                  </TableCell>
                </TableRow>
              ) : (
                soldTransactions?.map((item) => {
                  return (
                    <SoldTransactionRow
                      key={item.id}
                      name={item.commodityName}
                      date={item.createdAt}
                      amount={item.price}
                      status={item.status}
                    />
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {activeTab === Tabs.SENT && (
        <div className="bg-white rounded-2xl">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="flex items-center gap-1">
                  Date <ChevronsUpDown size={18} />
                </TableHead>
                <TableHead>Commodity Wallet</TableHead>
                <TableHead>Recipient Address</TableHead>
                <TableHead>Amount Sold</TableHead>
                <TableHead>Amount Received</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="px-8">
              {sendTransactions?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5}>
                    <p className="py-20 w-full font-semibold text-center text-xl">
                      No sent transaction yet!
                    </p>
                  </TableCell>
                </TableRow>
              ) : (
                sendTransactions?.map((item) => {
                  // console.log(sendTransactions.length);
                  return (
                    <SendTransactionRow
                      key={item.id}
                      name={item.commodityName}
                      date={item.createdAt}
                      amount={item.price}
                      status={item.status}
                      address={item.reference}
                    />
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      )}
      {activeTab === Tabs.RECEIVED && (
        <div className="bg-white rounded-2xl">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="flex items-center gap-1">
                  Date <ChevronsUpDown size={18} />
                </TableHead>
                <TableHead>Commodity Wallet</TableHead>
                <TableHead>Recipient Address</TableHead>
                <TableHead>Amount Sold</TableHead>
                <TableHead>Amount Received</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="px-8">
              {receivedTransactions?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5}>
                    <p className="py-20 w-full font-semibold text-center text-xl">
                      No received transaction yet!
                    </p>
                  </TableCell>
                </TableRow>
              ) : (
                receivedTransactions?.map((item) => {
                  return (
                    <SendTransactionRow
                      key={item.id}
                      name={item.commodityName}
                      date={item.createdAt}
                      amount={item.price}
                      status={item.status}
                      address={item.reference}
                    />
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
