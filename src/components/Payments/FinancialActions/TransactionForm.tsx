"use client";

import React from "react";
import CustomSelect from "./CustomSelect";
import { FaSpinner, FaExclamation } from "react-icons/fa";
import { CiCircleCheck } from "react-icons/ci";

type FormData = {
  name: string;
  type: string;
  status: string;
  value: string;
  dueDate: string;
};

type Props = {
  form: FormData;
  setForm: (f: FormData) => void;
  onNext: () => void;
};

export default function TransactionForm({ form, setForm, onNext }: Props) {
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target as HTMLInputElement;
    setForm({ ...form, [name]: value } as FormData);
  }

  function formatCurrency(value: string) {
    const numeric = value.replace(/\D/g, "");
    const number = Number(numeric) / 100;

    return number.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function handleValueChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, value: formatCurrency(e.target.value) });
  }

  function handleDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 8);
    const dd = raw.slice(0, 2);
    const mm = raw.slice(2, 4);
    const yyyy = raw.slice(4, 8);
    let formatted = "";
    if (dd) formatted += dd;
    if (mm) formatted += "/" + mm;
    if (yyyy) formatted += "/" + yyyy;
    setForm({ ...form, dueDate: formatted });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onNext();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="mt-4">
        <label className="text-sm font-medium">Nome</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Nome da conta"
          className="w-full border-gray-200 bg-white rounded-2xl border px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-black"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Tipo</label>
          <CustomSelect
            value={form.type}
            onChange={(v) => setForm({ ...form, type: v })}
            options={[
              { value: "", label: "Selecione" },
              { value: "alimentacao", label: "Alimentação" },
              { value: "luz", label: "Luz" },
              { value: "agua", label: "Água" },
            ]}
            placeholder="Selecione"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Status</label>
          <CustomSelect
            value={form.status}
            onChange={(v) => setForm({ ...form, status: v })}
            options={[
              { value: "pago", label: "Pago" },
              { value: "pendente", label: "Pendente" },
              { value: "atrasado", label: "Em atraso" },
            ]}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Valor</label>
          <input
            name="value"
            value={form.value}
            onChange={handleValueChange}
            placeholder="R$ 0,00"
            className="w-full border-gray-200 bg-white rounded-2xl border px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-black"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Data</label>
          <input
            name="dueDate"
            value={form.dueDate}
            onChange={handleDateChange}
            placeholder="DD/MM/AAAA"
            className="w-full border-gray-200 bg-white rounded-2xl border px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-black"
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-4 ml-auto inline-flex items-center rounded-full bg-black px-6 py-3 text-white hover:opacity-90"
      >
        Adicionar
      </button>
    </form>
  );
}
