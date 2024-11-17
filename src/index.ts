import { buscarMarcas } from './apiService';

async function exibirMarcas() {
    try {
        const marcaInput = document.getElementById('marcaInput') as HTMLInputElement;
        const marcaId = marcaInput.value || '59'; 
        const cars = await buscarMarcas(marcaId);

        const resultsList = document.getElementById('results') as HTMLUListElement;
        resultsList.innerHTML = ''; 
        cars.forEach((car) => {
            const listItem = document.createElement('li');
            listItem.textContent = `Marca: ${car.marca}, Nome: ${car.nome}`;
            resultsList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Erro ao encontrar as marcas: ', error);
        const resultsList = document.getElementById('results') as HTMLUListElement;
        resultsList.innerHTML = '<li>Erro ao carregar as marcas. Tente novamente.</li>';
    }
}

document.getElementById('buscarBtn')?.addEventListener('click', exibirMarcas);
