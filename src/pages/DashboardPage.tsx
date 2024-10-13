import PortfolioBalance from "@/components/DashboardComponents/PortfolioBalance";
import { QuickAction } from "@/components/DashboardComponents/QuickAction";
import TopCommodities from "@/components/DashboardComponents/TopCommodities";
import Layout from "@/components/Layout";
import Nav from "@/components/nav/Nav";
import { RecentTransaction } from "@/components/shared/RecentTransaction";
import YourCommodity from "@/components/shared/YourCommodity";

export default function DashboardPage() {
  return (
    <Layout>
      <Nav header="Dashboard" />

      <main className="flex flex-col bg-gray-100 p-4 w-full min-h-dvh overflow-scroll no-scrollbar">
        <div className="flex lg:flex-row flex-col gap-8 w-full">
          <div className="w-full lg:max-w-[70%]">
            <PortfolioBalance />
          </div>
          <div className="w-full lg:max-w-[30%]">
            <QuickAction />
          </div>
        </div>
        <div className="flex flex-col gap-8 my-5 w-full">
          <TopCommodities />
        </div>
        <div className="flex lg:flex-row flex-col gap-8 w-full">
          <div className="w-full lg:max-w-[70%]">
            <YourCommodity />
          </div>
          <div className="w-full lg:max-w-[30%]">
            <RecentTransaction />
          </div>
        </div>
      </main>
    </Layout>
  );
}
