import { SalaryInfo } from '../types/Salary';

type Props = {
  salary: SalaryInfo;
};

export default function SalaryOutput({ salary }: Props) {
  const formatBRL = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <div className='flex flex-col py-4 mx-auto'>
      <p className="text-lg">
        USD {salary.usd.toFixed(2)} {salary.period} =       
      </p>
      <p className="text-4xl font-bold text-green-700">
        {formatBRL.format(salary.brl)} / mês
      </p>
    </div>
  );
}