import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";

const cards = [
  {
    title: "Receita Total",
    value: 1423,
    goodMessage: "Tendência de alta neste mês",
    badMessage: "Tendência de baixa neste mês",
    percentual: 12.5,
  },
  {
    title: "Entradas",
    value: 1234,
    percentual: 20,
  },
  {
    title: "Despesas",
    value: 1234,
    percentual: -42.2,
  },
  {
    title: "Crescimento Financeiro",
    percentual: 12,
  },
];

// 🔹 Função para formatar valores em Real (BRL)
const formatBRL = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);

export default function Cards() {
  return (
    <div className="mt-6 grid grid-cols-4 gap-4">
      {cards.map((card, index) => {
        const isPositive = card.percentual >= 0;
        const hasValue = card.value !== undefined;
        const isGrowthCard = card.title === "Crescimento Financeiro";

        return (
          <div
            key={index}
            className="bg-gradient-to-b from-white to-gray-50 p-4 rounded-2xl shadow border border-gray-200"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <h3 className="text-gray-500 font-semibold">{card.title}</h3>

              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-gray-300 rounded-lg">
                {isPositive ? (
                  <FaArrowTrendUp className="text-black w-3 h-3" />
                ) : (
                  <FaArrowTrendDown className="text-red-600 w-3 h-3" />
                )}
                <span className="text-sm font-medium">
                  {isPositive ? "+" : ""}
                  {card.percentual}%
                </span>
              </div>
            </div>

            {/* Valor principal */}
            <h1 className="text-[35px] font-semibold mt-2">
              {hasValue ? formatBRL(card.value!) : `${card.percentual}%`}
            </h1>

            {/* Mensagem */}
            <div className="flex items-center gap-2 mt-6 text-sm">
              {hasValue && card.goodMessage ? (
                // Receita Total (mensagem customizada)
                <>
                  <p className="font-medium">
                    {isPositive ? card.goodMessage : card.badMessage}
                  </p>
                  {isPositive ? (
                    <FaArrowTrendUp className="w-4 h-4 text-black" />
                  ) : (
                    <FaArrowTrendDown className="w-4 h-4 text-red-600" />
                  )}
                </>
              ) : isGrowthCard ? (
                // Crescimento Financeiro
                <p className="font-medium text-gray-600">
                  {isPositive ? "+" : "-"} {Math.abs(card.percentual)}% em
                  relação ao mês anterior
                </p>
              ) : (
                // Entradas e Despesas
                <>
                  <p
                    className={`font-medium ${
                      isPositive ? "text-black" : "text-red-600"
                    }`}
                  >
                    {isPositive ? "Aumento" : "Redução"} de{" "}
                    {Math.abs(card.percentual)}% neste período
                  </p>
                  {isPositive ? (
                    <FaArrowTrendUp className="w-4 h-4 text-black" />
                  ) : (
                    <FaArrowTrendDown className="w-4 h-4 text-red-600" />
                  )}
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
