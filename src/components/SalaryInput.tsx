import { SalaryPeriod } from '../types/Salary';

type Props = {
  value: number;
  period: SalaryPeriod;
  onValueChange: (value: number) => void;
  onPeriodChange: (period: SalaryPeriod) => void;
};

export default function SalaryInput({ value, period, onValueChange, onPeriodChange }: Props) {
  return (
    <div>
      <input
        type="number"
        value={value}
        onChange={(e) => onValueChange(parseFloat(e.target.value))}
        className="border border-gray-300 rounded p-2 w-full"
      />
      <select
        value={period}
        onChange={(e) => onPeriodChange(e.target.value as SalaryPeriod)}
        className="border border-gray-300 rounded p-2 mt-2 w-full"
      >
        <option value="annual">Anual</option>
        <option value="monthly">Mensal</option>
      </select>
    </div>
  );
}
