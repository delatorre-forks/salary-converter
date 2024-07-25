"use client";

import { useState } from "react";
import { fetchExchangeRate } from "@/services/exchangeRate";
import { SalaryInfo, SalaryPeriod } from "@/types/Salary";
import SalaryInput from "./SalaryInput";
import SalaryOutput from "./SalaryOutput";
import SwitchCamera from "@/lib/icons/SwitchCamera";

export default function SalaryConverter() {
  const [usdSalary, setUsdSalary] = useState(1000);
  const [salaryPeriod, setSalaryPeriod] = useState<SalaryPeriod>("monthly");
  const [salary, setSalary] = useState<SalaryInfo | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleConvert() {
    setLoading(true);
    const exchangeRate = await fetchExchangeRate();
    const usdMonthly = salaryPeriod === "annual" ? usdSalary / 12 : usdSalary;
    const brlMonthly = usdMonthly * exchangeRate;
    setSalary({
      usd: usdSalary,
      brl: brlMonthly,
      period: salaryPeriod,
    });
    setLoading(false);
  }

  return (
    <div className="bg-white shadow rounded-lg py-10 px-8 max-w-md mx-auto min-h-96">
      <h1 className="text-2xl font-semibold mb-4 text-center">
        Conversor de Dólar para BRL
      </h1>
      <div className="mb-4">
        <label className="block mb-2">
          Informe a remuneração estimada em Dólar (USD)
        </label>
        <SalaryInput
          value={usdSalary}
          period={salaryPeriod}
          onValueChange={setUsdSalary}
          onPeriodChange={setSalaryPeriod}
        />
      </div>
      <button
        onClick={handleConvert}
        disabled={loading}
        className="bg-green-700 flex justify-center font-normal text-white w-full rounded py-4 px-4 hover:bg-green-800 disabled:bg-green-600"
      >
        <SwitchCamera className="mr-2" /> Converter
      </button>
      {salary ? (
        <div className="flex flex-col mt-4 justify-center items-center">
          <SalaryOutput salary={salary} />
        </div>
      ) : (
        <div className="flex flex-col mt-4 justify-center items-center">
          <p className="text-lg">USD 0.00 {salaryPeriod} =</p>
          <p className="text-4xl font-bold text-green-700">R$ 0,00</p>
        </div>
      )}
    </div>
  );
}
