export async function fetchExchangeRate(): Promise<number> {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL');
    if (!response.ok) {
      throw new Error('Falha ao obter a cotação');
    }
    const data = await response.json();
    return parseFloat(data.USDBRL.ask);
  } catch (error) {
    console.error('Erro ao buscar taxa de câmbio:', error);
    return 0;
  }
}