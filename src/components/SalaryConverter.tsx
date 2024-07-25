"use client";

import { useState } from "react";
import { fetchExchangeRate } from "@/services/exchangeRate";
import { SalaryInfo, SalaryPeriod } from "@/types/Salary";
import SalaryInput from "./SalaryInput";
import SalaryOutput from "./SalaryOutput";
import SwitchCamera from "@/lib/icons/SwitchCamera";

export default function SalaryConverter() {
  const [usdSalary, setUsdSalary] = useState(0);
  const [salaryPeriod, setSalaryPeriod] = useState<SalaryPeriod>("monthly");
  const [salary, setSalary] = useState<SalaryInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function handleConvert() {
    setLoading(true);
    const exchangeRate = await fetchExchangeRate();
    const usdMonthly = salaryPeriod === "annual" ? usdSalary / 12 : usdSalary;
    const brlMonthly = usdMonthly * exchangeRate;

    if (usdSalary === 0 || isNaN(usdSalary)) {
      setSalary(null);
      setLoading(false);
      setError(true);
      return;
    }

    setSalary({
      usd: usdSalary,
      brl: brlMonthly,
      period: salaryPeriod,
    });
    setError(false);
    setLoading(false);
  }

  return (
    <div className="bg-white shadow rounded-lg py-6 px-4 sm:py-10 sm:px-8 max-w-md mx-auto min-h-[400px]">
  <h1 className="text-xl sm:text-2xl font-semibold mt-2 mb-6 text-center">
    Conversor de Dólar para Real
  </h1>
  <div className="my-6">
    <label htmlFor="salary-input" className="block mb-2">
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
    className="bg-green-700 flex justify-center font-normal text-white w-full rounded py-2 sm:py-4 px-4 hover:bg-green-800 disabled:bg-green-600"
  >
    <SwitchCamera className="mr-2" /> Converter para Real
  </button>
  <div className="mt-4 pt-2 flex flex-col justify-center items-center"> 
    {salary ? (
      <SalaryOutput salary={salary} /> 
    ) : (
      <>
        {error && <p className="text-sm text-red-800">Insira um valor válido</p>}
        {!error && (
          <>
            <p className="text-lg">USD 0.00 {salaryPeriod} =</p>
            <p className="text-4xl font-bold text-green-700">R$ 0,00</p>
          </>
        )}
      </>
    )}
  </div>
</div>
  );
}
