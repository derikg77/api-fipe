import { buscarMarcas } from './apiService';  // Ajuste o caminho se necessário

async function exibirMarcas(marcaInput?: string) {
    try {
        const minMarcaId = 1;
        const maxMarcaId = 40;

        const marca: string = (Math.floor(Math.random() * (maxMarcaId - minMarcaId + 1)) + minMarcaId).toString();

        const cars = await buscarMarcas();

        const resultadoLista: any = document.getElementById('results')
        resultadoLista.innerHTML = '';
        cars.map((car: any) => {
            const li: any = document.createElement('li');
            li.textContent = `Marca: ${car.marca}, Nome: ${car.nome}`;
            resultadoLista.appendChild(li)

        });
    }
    catch (error) {
        console.error('Erro ao encontrar as marcas: ', error)
    }
}
document.getElementById('buscarBtn')!.addEventListener('click', () => {
    const marcaInput: string = (document.getElementById('marcaInput') as HTMLInputElement).value;
    exibirMarcas(marcaInput || undefined);
});
