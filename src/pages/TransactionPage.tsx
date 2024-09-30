import Layout from "@/components/Layout";
import Nav from "@/components/nav/Nav";

export default function TransactionPage() {
  return (
    <Layout>
      <Nav header="Transaction" />
      <main className="flex flex-col bg-gray-100 p-4 w-full min-h-dvh overflow-scroll no-scrollbar">
        {/* <Table allTrans={allTrans} /> */}
        {/* <Table transaction={transaction} allTrans={allTrans} /> */}
      </main>
    </Layout>
  );
}
