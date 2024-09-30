import PortfolioBalance from "@/components/DashboardComponents/PortfolioBalance";
import Layout from "@/components/Layout";
import Nav from "@/components/nav/Nav";
import { RecentTransaction } from "@/components/shared/RecentTransaction";

export default function PortfolioPage() {
  return (
    <Layout>
      <Nav header="Portfolio" />
      <main className="flex lg:flex-row flex-col gap-5 lg:gap-8 bg-gray-100 p-4 w-full min-h-dvh overflow-scroll no-scrollbar">
        <div className="flex flex-col gap-8 w-full lg:max-w-[70%]">
          {/* <PortfolioTable portfolio={portfolioData} /> */}
          <div className="w-full h-fit max-h-min">
            <PortfolioBalance />
          </div>
          {/* <YourCommodity portfolio={portfolioData} /> */}
        </div>
        <div className="flex flex-col gap-8 w-full lg:max-w-[30%]">
          <RecentTransaction />
          {/* <PortChart portfolio={portfolioData} /> */}
        </div>
      </main>
    </Layout>
  );
}
