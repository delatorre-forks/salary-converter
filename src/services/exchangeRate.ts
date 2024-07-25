export async function fetchExchangeRate(): Promise<number> {
  try {
    const response = await fetch('/api/exchange-rate');
    if (!response.ok) {
      throw new Error('Falha ao obter a cotação');
    }
    const data = await response.json();
    return data.exchangeRate;
  } catch (error) {
    console.error('Erro ao buscar taxa de câmbio:', error);
    return 0;
  }
}