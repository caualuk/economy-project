"use client";

import { useEffect, useRef, useState } from "react";
import { FaEllipsisV, FaPen, FaTrash } from "react-icons/fa";
import { FaCheck, FaExclamation, FaSpinner } from "react-icons/fa";

// Updated type to match backend JSON structure
type Payment = {
  id: number;
  name: string;
  type: "EXPENSE" | "REVENUE";
  status: "PAID" | "PENDING" | "OVERDUE";
  amount: number;
  date: string;
  category: string;
  createdAt: string | null;
  paidAt: string | null;
};

// Type for frontend display
type DisplayPayment = {
  id: number;
  name: string;
  type: "Despesa" | "Receita";
  status: "Pago" | "Pendente" | "Atrasado";
  amount: number;
  date: string;
};

export default function PaymentsTable() {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [payments, setPayments] = useState<DisplayPayment[]>([]);
  const [loading, setLoading] = useState(true);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Function to convert backend data to frontend display format
  const mapBackendToDisplay = (backendData: Payment[]): DisplayPayment[] => {
    return backendData.map((item) => {
      // Map type from backend to frontend
      const displayType = item.type === "EXPENSE" ? "Despesa" : "Receita";

      // Map status from backend to frontend
      let displayStatus: "Pago" | "Pendente" | "Atrasado";
      switch (item.status) {
        case "PAID":
          displayStatus = "Pago";
          break;
        case "PENDING":
          displayStatus = "Pendente";
          break;
        case "OVERDUE":
          displayStatus = "Atrasado";
          break;
        default:
          displayStatus = "Pendente";
      }

      // Format date if needed (you might want to format it differently)
      const displayDate = new Date(item.date).toLocaleDateString("pt-BR");

      return {
        id: item.id,
        name: item.name,
        type: displayType,
        status: displayStatus,
        amount: item.amount,
        date: displayDate,
      };
    });
  };

  useEffect(() => {
    async function fetchPayments() {
      try {
        const response = await fetch("http://localhost:8080/transactions", {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Falha ao buscar pagamentos");
        }

        const data: Payment[] = await response.json();

        // Transform the backend data to match frontend display requirements
        const displayPayments = mapBackendToDisplay(data);
        setPayments(displayPayments);
      } catch (error) {
        console.error("Erro ao buscar pagamentos:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPayments();
  }, []);

  // Fecha menu ao clicar fora
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenuId(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function statusColor(status: DisplayPayment["status"]) {
    if (status === "Pago") return "text-green-500";
    if (status === "Pendente") return "text-yellow-500";
    return "text-red-500";
  }

  function renderStatusBadge(status: DisplayPayment["status"]) {
    const s = status.toLowerCase();
    if (s === "pago") {
      return (
        <button
          className="cursor-pointer outline-none focus:outline-none active:outline-none"
          onMouseDown={(e) => e.preventDefault()}
        >
          <div className="w-20 p-1 border border-green-700 rounded-xl flex items-center gap-2 font-medium">
            <span className="flex items-center justify-center w-5 h-5 bg-green-500 rounded-full">
              <FaCheck className="text-white text-xs" />
            </span>
            <span>Pago</span>
          </div>
        </button>
      );
    }

    if (s === "pendente") {
      return (
        <button
          className="cursor-pointer outline-none focus:outline-none active:outline-none"
          onMouseDown={(e) => e.preventDefault()}
        >
          <div className="w-25 p-1 border border-gray-400 rounded-xl flex items-center gap-2 font-medium">
            <span className="flex items-center justify-center w-5 h-5 bg-white rounded-full">
              <FaSpinner className="w-4 h-4 text-gray-400" />
            </span>
            <span>Pendente</span>
          </div>
        </button>
      );
    }

    return (
      <button
          className="cursor-pointer outline-none focus:outline-none active:outline-none"
          onMouseDown={(e) => e.preventDefault()}
        >
        <div className="w-26 p-1 border border-red-500 rounded-xl flex items-center gap-2 font-medium">
          <span className="flex items-center justify-center w-5 h-5 bg-red-500 rounded-full">
            <FaExclamation className="w-3 h-3 text-white" />
          </span>
          <span className="text-red-500">Em atraso</span>
        </div>
      </button>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        Carregando pagamentos ...
      </div>
    );
  }

  // If no payments, show message
  if (payments.length === 0) {
    return (
      <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-8 text-center">
        <p className="text-gray-500">Nenhum pagamento encontrado</p>
      </div>
    );
  }

  return (
    <div className="mt-6 rounded-2xl border border-gray-200 bg-white pb-2">
      {/* HEADER */}
      <div className="grid grid-cols-[2fr_1fr_1fr_1fr_40px] px-6 py-4 text-sm font-semibold text-gray-600 border-b border-gray-200 bg-gray-50 rounded-t-2xl">
        <span className="ml-7">Nome da Conta</span>
        <span>Tipo</span>
        <span>Status</span>
        <span>Valor</span>
        <span></span>
      </div>

      {/* ROWS */}
      {payments.map((item) => (
        <div
          key={item.id}
          className="
            grid grid-cols-[2fr_1fr_1fr_1fr_40px]
            items-center
            px-6 py-4
            text-sm
            border-b
            border-gray-200
            last:border-b-0
            hover:bg-gray-50
            transition
            relative
          "
        >
          <span className="font-medium ml-7">{item.name}</span>

          <span>{item.type}</span>

          <span>{renderStatusBadge(item.status)}</span>

          <span className="font-medium">
            {item.amount.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>

          {/* MENU */}
          <div
            className="relative w-5 cursor-pointer"
            ref={openMenuId === item.id ? menuRef : null}
          >
            <button
              onClick={() =>
                setOpenMenuId(openMenuId === item.id ? null : item.id)
              }
              className="p-1 rounded hover:bg-gray-100 transition cursor-pointer"
            >
              <FaEllipsisV className="w-3 h-3" />
            </button>

            {openMenuId === item.id && (
              <div
                className="
                  absolute
                  right-0
                  top-6
                  z-50
                  w-36
                  rounded-lg
                  bg-white
                  border
                  border-gray-200
                  shadow-lg
                  text-sm
                "
              >
                <button
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
                  onClick={() => {
                    setOpenMenuId(null);
                    console.log("Editar", item.id);
                  }}
                >
                  <FaPen /> Editar
                </button>

                <button
                  className="w-full px-4 py-2 text-left text-red-500 hover:bg-red-50 flex items-center gap-2 cursor-pointer"
                  onClick={() => {
                    setOpenMenuId(null);
                    console.log("Excluir", item.id);
                  }}
                >
                  <FaTrash /> Excluir
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
