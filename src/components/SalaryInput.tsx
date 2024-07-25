import { SalaryPeriod } from '@/types/Salary';

type Props = {
  value: number;
  period: SalaryPeriod;
  onValueChange: (value: number) => void;
  onPeriodChange: (period: SalaryPeriod) => void;
};

export default function SalaryInput({ value, period, onValueChange, onPeriodChange }: Props) {
  return (
    <div className="flex justify-center items-baseline">
  <label className="block mb-2 mr-2 font-bold">USD</label>
  <input
    type="number"
    value={value}
    onChange={(e) => onValueChange(parseFloat(e.target.value))}
    className="border border-gray-300 rounded p-2 w-1/2" // Key changes here
    required={true}
  />
  <select
    value={period}
    onChange={(e) => onPeriodChange(e.target.value as SalaryPeriod)}
    className="border border-gray-300 rounded p-2 w-1/2 ml-2" // Key changes here
  >
    <option value="annual">Anual</option>
    <option value="monthly">Mensal</option>
  </select>
</div>
  );
}
