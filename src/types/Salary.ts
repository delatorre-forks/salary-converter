export type SalaryPeriod = 'annual' | 'monthly';

export type SalaryInfo = {
  usd: number;
  brl: number;
  period: SalaryPeriod;
};
