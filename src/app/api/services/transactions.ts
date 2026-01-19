export async function getTransactions(){
    const response = await fetch('http://localhost:8080/transactions', {
        cache: 'no-store',
    });

    if(!response.ok) {
        throw new Error('Falha ao buscar transações');
    }

    return response.json();
}