import Header from "./Header/Header";
import Cards from "./Cards/Cards";
import AreaChartExample from "../Dashboard/ReChart/ReChart";
import Graphic from "../Dashboard/Graphic/Graphic";
import PaymentsTable from "../Payments/PaymentsTable/PaymentsTable";
import FinancialHeader from "../Payments/FinancialHeader/FinancialHeader";

export default function MainContainer() {
  return (
    <div className="flex-1 bg-white p-3 rounded-t-3xl mt-6 mr-6 ml-4 min-h-screen pb-16">
      <Header />
      <Cards />
      <Graphic />

      {/* PaymentsSection */}
      <FinancialHeader />
      {/* PaymentsTable */}
      <PaymentsTable />
    </div>
  );
}
