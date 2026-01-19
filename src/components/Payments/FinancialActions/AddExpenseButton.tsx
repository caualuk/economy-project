"use client";

import { useState } from "react";
import { FaPlus, FaCheck, FaSpinner, FaExclamation } from "react-icons/fa";
import Modal from "./AddTransactionModal";
import TransactionForm from "./TransactionForm";

type FormData = {
  name: string;
  type: string;
  status: string;
  value: string;
  dueDate: string;
};

export default function AddTransactionButton() {
  const now = new Date();
  const pad = (n: number) => n.toString().padStart(2, "0");
  const today = `${pad(now.getDate())}/${pad(
    now.getMonth() + 1
  )}/${now.getFullYear()}`;

  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<FormData>({
    name: "",
    type: "",
    status: "pendente",
    value: "",
    dueDate: today,
  });

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
    setForm({
      name: "",
      type: "",
      status: "pendente",
      value: "",
      dueDate: today,
    });
  }

  function handleConfirm() {
    console.log("Final form:", form);
    close();
  }

  function renderStatusIcon(status: string | undefined) {
    if (!status) return null;
    if (status === "pago")
      return <FaCheck className="inline-block mr-2 text-green-600" />;
    if (status === "pendente")
      return <FaSpinner className="inline-block mr-2 text-gray-400" />;
    if (status === "atrasado")
      return <FaExclamation className="inline-block mr-2 text-red-600" />;
    return null;
  }

  const statusLabelMap: Record<string, string> = {
    pago: "Pago",
    pendente: "Pendente",
    atrasado: "Em atraso",
  };

  return (
    <div>
      <button
        onClick={open}
        className="flex place-items-center bg-black text-white px-4 h-8 gap-2 rounded-md hover:cursor-pointer"
      >
        <FaPlus /> Adicionar Despesa
      </button>

      <Modal isOpen={isOpen} onClose={close}>
        <div className="w-full max-w-2xl">
          {/* Title only, no stepper */}
          <div className="border-b border-gray-200 text-center">
            <h2 className="text-4xl font-bold mb-4 mx-auto max-w-3xl">
              Adicione suas despesas para <br /> melhorar o controle em apenas 
              <br />um lugar.
            </h2>
          </div>

          {/* Show only the form */}
          <TransactionForm
            form={form}
            setForm={setForm}
            onSubmit={handleConfirm}
          />
        </div>
      </Modal>
    </div>
  );
}