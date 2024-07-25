export const runtime = 'edge';

export async function GET() {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL', {
      next: { revalidate: 300 }
    });

    if (!response.ok) {
      throw new Error('Falha ao obter a cotação');
    }

    const data = await response.json();
    const exchangeRate = parseFloat(data.USDBRL.ask);

    return new Response(JSON.stringify({ exchangeRate }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Erro ao buscar taxa de câmbio:', error);
    return new Response(JSON.stringify({ error: 'Erro ao obter a taxa de câmbio' }), { status: 500 });
  }
}