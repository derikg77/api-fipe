import { buscarMarcas, buscarModelos } from './apiService.js';

// const modelosFixos = [
//     { marca: 'Toyota', modelos: ['Corolla', 'Hilux', 'Yaris'] },
//     { marca: 'Ford', modelos: ['Focus', 'Ranger', 'Mustang'] },
//     { marca: 'Volkswagen', modelos: ['Golf', 'Polo', 'Tiguan'] },
//     { marca: 'Chevrolet', modelos: ['Onix', 'Tracker', 'Cruze'] },
// ];

// Função para exibir marcas
async function exibirMarcas(nome?: string) {
    console.log('Marca selecionada:', nome);

    try {
        const input = document.getElementById('marcaInput') as HTMLInputElement;
        const itemSearch = input?.value.toLowerCase() || ''; // Verificação de segurança
        const marcaSelect = document.getElementById('marcasSelect') as HTMLSelectElement;

        // Simulando marcas disponíveis (como retorno de API)
        const marcas = await buscarMarcas(); // Simula busca de marcas a partir da API
        console.log('Marcas disponíveis:', marcas);

        const marcasFiltradas = marcas.filter((marca: any) =>
            marca?.nome?.toLowerCase().includes(itemSearch)
        );
        console.log('Marcas filtradas:', marcasFiltradas);

        const resulList = document.getElementById('results') as HTMLUListElement;
        resulList.innerHTML = '';

        if (!itemSearch) {
            resulList.innerHTML = '<li class="error">Por favor, digite o nome de uma marca.</li>';
            return;
        }

        if (marcasFiltradas.length > 0) {
            marcaSelect.innerHTML = '<option value="">Selecione uma marca</option>'; // Limpa o select

            marcasFiltradas.forEach((marca: any) => {
                const listItem = document.createElement('li');
                const optionMarca = document.createElement('option');

                optionMarca.value = marca.nome;
                optionMarca.textContent = marca.nome;
                listItem.textContent = `Nome: ${marca.nome}`;

                listItem.addEventListener('click', async () => {
                    console.log(`Marca clicada: ${marca.nome}`);
                    await exibirModelos(marca.nome);
                });

                optionMarca.addEventListener('click', async () => {
                    console.log(`Marca clicada: ${marca.nome}`);
                    await exibirModelos(marca.nome);
                });

                marcaSelect.appendChild(optionMarca);
                resulList.appendChild(listItem);
            });

            marcaSelect.classList.remove('hidden');
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

// Configura evento do botão buscar
const buscarBtn = document.getElementById('buscarBtn') as HTMLButtonElement;
buscarBtn?.addEventListener('click', () => {
    console.log('Botão de busca clicado');
    exibirMarcas(); // Exibe as marcas ao clicar no botão
});

// Configuração inicial para ocultar os selects e associar eventos
window.onload = () => {
    const modelosSelect = document.getElementById('modelosSelect') as HTMLSelectElement;
    const marcaSelect = document.getElementById('marcasSelect') as HTMLSelectElement;

    modelosSelect?.classList.add('hidden'); // Ocultar o select inicialmente
    marcaSelect?.classList.add('hidden');

    marcaSelect?.addEventListener('change', async (event) => {
        const target = event.target as HTMLSelectElement;
        const marcaSelecionada = target?.value;
        if (marcaSelecionada) {
            console.log(`Marca selecionada via select: ${marcaSelecionada}`);
            await exibirModelos(marcaSelecionada);
        }
    });
};
