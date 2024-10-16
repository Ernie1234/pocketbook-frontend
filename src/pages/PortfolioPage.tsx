import PortfolioBalance from "@/components/DashboardComponents/PortfolioBalance";
import Layout from "@/components/Layout";
import Nav from "@/components/nav/Nav";
import { PortChart } from "@/components/PortfolioComponents/PortChart";
import { RecentTransaction } from "@/components/shared/RecentTransaction";
import YourCommodity from "@/components/shared/YourCommodity";

export default function PortfolioPage() {
  return (
    <Layout>
      <Nav header="Portfolio" />
      <main className="flex lg:flex-row flex-col gap-5 lg:gap-8 bg-gray-100 p-4 w-full min-h-dvh overflow-scroll no-scrollbar">
        <div className="flex flex-col gap-8 w-full lg:max-w-[70%]">
          <div className="w-full h-fit max-h-min">
            <PortfolioBalance adjust />
          </div>
          <YourCommodity />
        </div>
        <div className="flex flex-col gap-8 w-full lg:max-w-[30%]">
          <RecentTransaction />
          <PortChart />
        </div>
      </main>
    </Layout>
  );
}
