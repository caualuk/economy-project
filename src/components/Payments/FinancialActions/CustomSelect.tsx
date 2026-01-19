"use client";

import React, { useEffect, useRef, useState } from "react";
import { FaCheck, FaSpinner, FaExclamation } from "react-icons/fa";

type Option = { value: string; label: string };

type Props = {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
};

export default function CustomSelect({
  value,
  onChange,
  options,
  placeholder,
}: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const selected = options.find((o) => o.value === value)?.label || "";

  function renderIcon(val?: string) {
    if (!val) return null;
    if (val === "pago")
      return <FaCheck className="inline-block mr-2 text-green-600" />;
    if (val === "pendente")
      return <FaSpinner className="inline-block mr-2 w-4 h-4 text-gray-400" />;
    if (val === "atrasado")
      return <FaExclamation className="inline-block mr-2 text-red-600" />;
    return null;
  }

  function renderSelectedBadge(val?: string) {
    if (!val) return null;
    const base = "flex items-center justify-center mr-2";
    if (val === "pago") {
      return (
        <span className={`${base} w-5 h-5 bg-green-500 rounded-full`}>
          <FaCheck className="w-3 h-3 text-white" />
        </span>
      );
    }
    if (val === "pendente") {
      return (
        <span className={`${base} w-5 h-5 bg-white rounded-full`}>
          <FaSpinner className="w-4 h-4 text-gray-400" />
        </span>
      );
    }
    if (val === "atrasado") {
      return (
        <span className={`${base} w-5 h-5 bg-red-500 rounded-full`}>
          <FaExclamation className="w-3 h-3 text-white" />
        </span>
      );
    }
    return null;
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((s) => !s)}
        className="w-full border-gray-200 bg-white rounded-2xl border px-4 py-3 text-sm outline-none flex items-center justify-between"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span
          className={`${
            selected ? "text-black" : "text-gray-400"
          } flex items-center`}
        >
          {renderSelectedBadge(value)}
          <span>{selected || placeholder || "Selecione"}</span>
        </span>
        <svg
          className="ml-3 h-4 w-4 text-gray-600"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.939l3.71-3.71a.75.75 0 011.06 1.06l-4.24 4.243a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute left-0 right-0 bg-white border border-gray-200 shadow-lg z-50 max-h-48 overflow-auto py-2"
          style={{ top: "calc(100% - 1px)", borderRadius: 12 }}
        >
          {options.map((opt) => (
            <li key={opt.value} className="px-4 py-1">
              <button
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className="
      w-full
      flex items-center gap-2
      px-3 py-1.5
      rounded-full
      border border-gray-200
      bg-white
      text-sm text-gray-700
      hover:bg-gray-50
      transition
    "
              >
                {/* Status indicator circle */}
                <div className="flex items-center justify-center">
                  <span
                    className={`
          flex items-center justify-center
          w-4 h-4 
          
          ${
            opt.value === "pago"
              ? "bg-green-500 rounded-full"
              : opt.value === "pendente"
              ? "bg-white"
              : opt.value === "atrasado"
              ? "bg-red-500 rounded-full"
              : "bg-gray-300 border-gray-300"
          }
        `}
                  >
                    {opt.value === "pago" && (
                      <FaCheck className="w-3 h-3 text-white" />
                    )}

                    {opt.value === "pendente" && (
                      <FaSpinner className="w-4 h-4 text-gray-400" />
                    )}

                    {opt.value === "atrasado" && (
                      <FaExclamation className="w-3 h-3 text-white" />
                    )}
                  </span>
                </div>

                {/* Status text */}
                <span className="font-medium text-gray-700">{opt.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
