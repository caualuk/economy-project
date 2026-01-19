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
  const [step, setStep] = useState<0 | 1>(0);
  const [form, setForm] = useState<FormData>({
    name: "",
    type: "",
    status: "pendente",
    value: "",
    dueDate: today,
  });

  function open() {
    setIsOpen(true);
    setStep(0);
  }

  function close() {
    setIsOpen(false);
    setStep(0);
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
          {/* Stepper */}
          <div className="flex items-center gap-6 mb-6">
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full text-white ${
                  step === 0 ? "bg-black" : "bg-gray-200 text-gray-600"
                }`}
              >
                1
              </div>
              <div className="text-sm text-gray-700">Adicionar transação</div>
            </div>

            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full text-white ${
                  step === 1 ? "bg-black" : "bg-gray-200 text-gray-600"
                }`}
              >
                2
              </div>
              <div className="text-sm text-gray-700">Confirmação</div>
            </div>
          </div>

          <div className="border-b border-gray-200 text-center">
            <h2 className="text-4xl font-bold mb-4 mx-auto max-w-3xl">
              Adicione suas despesas para <br /> melhorar o controle em apenas 
              <br />um lugar.
              
            </h2>
          </div>

          {step === 0 && (
            <TransactionForm
              form={form}
              setForm={setForm}
              onNext={() => setStep(1)}
            />
          )}

          {step === 1 && (
            <div className="mt-4 space-y-6">
              <div>
                <div className="text-sm text-gray-500">Nome</div>
                <div className="text-base font-medium">{form.name || "-"}</div>
              </div>

              <div>
                <div className="text-sm text-gray-500">Tipo</div>
                <div className="text-base font-medium">{form.type || "-"}</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500">Status</div>
                  <div className="text-base font-medium flex items-center gap-2">
                    {renderStatusIcon(form.status)}
                    <span className="bg-red-500">
                      {form.status
                        ? statusLabelMap[form.status] || form.status
                        : "-"}
                    </span>
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-500">Data</div>
                  <div className="text-base font-medium">
                    {form.dueDate || "-"}
                  </div>
                </div>
              </div>

              <div>
                <div className="text-sm text-gray-500">Valor</div>
                <div className="text-base font-medium">{form.value || "-"}</div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setStep(0)}
                  className="text-purple-600 px-4 py-2"
                >
                  Voltar
                </button>

                <button
                  onClick={handleConfirm}
                  className="rounded-full bg-black px-6 py-3 text-white"
                >
                  Adicionar
                </button>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
