import LineChartExample from "../ReChart/ReChart";

export default function Graphic() {
  return (
    <div className="mt-10 p-10 rounded-3xl shadow-lg border border-gray-200">
      <div className="flex justify-around gap-[110vh]">
        <div className="flex-none">
          <span className="font-semibold text-2xl">Relatório</span>
          <p className="text-gray-400 text-sm">Total dos últimos 3 meses</p>
        </div>
        <div className="w-70 h-10 flex justify-center">
          <button className="bg-white w-full rounded-l-lg border border-gray-300 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 cursor-pointer">
            Semana
          </button>
          <button className="bg-white w-full border-t border-b border-gray-300 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 cursor-pointer">
            Mês
          </button>
          <button className="bg-white w-full rounded-r-lg border border-gray-300 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 cursor-pointer">
            3 Meses
          </button>
        </div>
      </div>
      <LineChartExample />
    </div>
  );
}
