import { buscarMarcas, buscarModelos } from './apiService.js';

// const modelosFixos = [
//     { marca: 'Toyota', modelos: ['Corolla', 'Hilux', 'Yaris'] },
//     { marca: 'Ford', modelos: ['Focus', 'Ranger', 'Mustang'] },
//     { marca: 'Volkswagen', modelos: ['Golf', 'Polo', 'Tiguan'] },
//     { marca: 'Chevrolet', modelos: ['Onix', 'Tracker', 'Cruze'] },
// ];

// Função para exibir marcas
async function exibirMarcas(nome?: string) {
    try {
        const input = document.getElementById('marcaInput') as HTMLInputElement;
        const itemSearch = input.value.toLowerCase();
        const marcaSelect = document.getElementById('marcasSelect') as HTMLSelectElement;

        // Simulando marcas disponíveis (como retorno de API)
        const marcas = await buscarMarcas(); // Simula busca de marcas a partir da API
        console.log('Marcas disponíveis:', marcas);

        const marcasFiltradas = marcas.filter((marca: any) =>
            marca.nome.toLowerCase().includes(itemSearch)
        );
        console.log('Marcas filtradas:', marcasFiltradas);

        const resulList = document.getElementById('results') as HTMLUListElement;
        resulList.innerHTML = '';

        if (!itemSearch) {
            resulList.innerHTML = '<li class="error">Por favor, digite o nome de uma marca.</li>';
            return;
        }

        if (marcasFiltradas.length > 0) {
            marcasFiltradas.forEach((marca: any) => {
                const listItem = document.createElement('li');
                const optionMarca = document.createElement('option');
                marcaSelect.innerHTML = '<option value="">Selecione uma marca</option>';
                optionMarca.value = marca.nome
                optionMarca.textContent = marca.nome
                listItem.textContent = `Nome: ${marca.nome}`;
                listItem.addEventListener('click', async () => {
                    console.log(`Marca clicada: ${marca}`);
                    if (marcasFiltradas.length === 1) {
                        await exibirModelos(marcasFiltradas[0].nome);
                    }
                });
                optionMarca.addEventListener('click', async () => {
                    console.log(`Marca clicada: ${marca}`);
                    for(const marcaFiltrada of marcasFiltradas) {
                        console.log(`Marca: ${marcaFiltrada}`)
                        await exibirMarcas(marcaFiltrada.nome)
                    }
                })
                resulList.appendChild(listItem);
                marcaSelect.appendChild(optionMarca);

                marcaSelect.classList.remove('hidden')
            });
        } else {
            resulList.innerHTML = '<li class="error">Nenhuma marca encontrada</li>';
        }
    } catch (error) {
        console.error('Erro ao buscar marcas:', error);
    }
}

// Função para exibir modelos com base na marca selecionada
async function exibirModelos(marcaNome: string) {
    console.log('Marca selecionada:', marcaNome);

    const modelosSelect = document.getElementById('modelosSelect') as HTMLSelectElement;

    try {
        // Limpando as opções anteriores
        modelosSelect.innerHTML = '<option value="">Selecione um modelo</option>';
        // Buscando os modelos da marca via API
        const modelos = await buscarModelos(); // Passa a marca selecionada para buscar modelos
        console.log('Modelos encontrados:', modelos);
        

        if (modelos.length > 0) {
            modelos.forEach((modelo: any) => {
                const option = document.createElement('option');
                option.value = modelo.nome;
                option.textContent = modelo.nome;
                modelosSelect.appendChild(option);
            });

            modelosSelect.classList.remove('hidden'); // Exibe o select com os modelos
        } else {
            modelosSelect.innerHTML = '<option>Nenhum modelo encontrado</option>';
            
        }
    } catch (error) {
        console.error('Erro ao buscar modelos:', error);
        modelosSelect.innerHTML = '<option>Erro ao carregar modelos</option>';
        modelosSelect.classList.remove('hidden');
    }
}

const buscarBtn = document.getElementById('buscarBtn') as HTMLButtonElement;
buscarBtn.addEventListener('click', () => {
    console.log('Botão de busca clicado');
    exibirMarcas(); // Exibe as marcas ao clicar no botão
});

window.onload = () => {
    const modelosSelect = document.getElementById('modelosSelect') as HTMLSelectElement;
    modelosSelect.classList.add('hidden'); // Ocultar o select inicialmente
    modelosSelect.addEventListener('click',() => exibirModelos)
};

window.onload = () => {
    const marcaSelect = document.getElementById('marcasSelect') as HTMLSelectElement;
    marcaSelect.classList.add('hidden')
    marcaSelect.addEventListener('click', () => exibirMarcas)
    
}