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
    <div>
      <p className="text-lg">
        USD {salary.usd.toFixed(2)} {salary.period} ={' '}
        <span className='text-4xl'><strong>{formatBRL.format(salary.brl)} por mês</strong></span>
      </p>
    </div>
  );
}