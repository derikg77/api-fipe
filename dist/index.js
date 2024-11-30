var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { buscarMarcas, buscarModelos } from './apiService.js';
// const modelosFixos = [
//     { marca: 'Toyota', modelos: ['Corolla', 'Hilux', 'Yaris'] },
//     { marca: 'Ford', modelos: ['Focus', 'Ranger', 'Mustang'] },
//     { marca: 'Volkswagen', modelos: ['Golf', 'Polo', 'Tiguan'] },
//     { marca: 'Chevrolet', modelos: ['Onix', 'Tracker', 'Cruze'] },
// ];
// Função para exibir marcas
function exibirMarcas(nome) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Marca selecionada:', nome);
        try {
            const input = document.getElementById('marcaInput');
            const itemSearch = input.value.toLowerCase();
            const marcaSelect = document.getElementById('marcasSelect');
            // Simulando marcas disponíveis (como retorno de API)
            const marcas = yield buscarMarcas(); // Simula busca de marcas a partir da API
            console.log('Marcas disponíveis:', marcas);
            const marcasFiltradas = marcas.filter((marca) => marca.nome.toLowerCase().includes(itemSearch));
            console.log('Marcas filtradas:', marcasFiltradas);
            const resulList = document.getElementById('results');
            resulList.innerHTML = '';
            if (!itemSearch) {
                resulList.innerHTML = '<li class="error">Por favor, digite o nome de uma marca.</li>';
                return;
            }
            if (marcasFiltradas.length > 0) {
                marcasFiltradas.forEach((marca) => {
                    const listItem = document.createElement('li');
                    const optionMarca = document.createElement('option');
                    marcaSelect.innerHTML = '<option value="">Selecione uma marca</option>';
                    optionMarca.value = marca.nome;
                    optionMarca.textContent = marca.nome;
                    listItem.textContent = `Nome: ${marca.nome}`;
                    listItem.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
                        console.log(`Marca clicada: ${marca}`);
                        yield exibirModelos(marca.nome);
                    }));
                    optionMarca.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
                        console.log(`Marca clicada: ${marca}`);
                        // for(const marcaFiltrada of marcasFiltradas) {
                        console.log(`Marca: ${marca.nome}`);
                        yield exibirModelos(marca.nome);
                        // }
                    }));
                    marcaSelect.appendChild(optionMarca);
                    resulList.appendChild(listItem);
                    marcaSelect.classList.remove('hidden');
                });
            }
            else {
                resulList.innerHTML = '<li class="error">Nenhuma marca encontrada</li>';
            }
        }
        catch (error) {
            console.error('Erro ao buscar marcas:', error);
        }
    });
}
// Função para exibir modelos com base na marca selecionada
function exibirModelos(marcaNome) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Marca selecionada:', marcaNome);
        const modelosSelect = document.getElementById('modelosSelect');
        try {
            // Limpando as opções anteriores
            modelosSelect.innerHTML = '<option value="">Selecione um modelo</option>';
            // Buscando os modelos da marca via API
            const modelos = yield buscarModelos(); // Passa a marca selecionada para buscar modelos
            console.log('Modelos encontrados:', modelos);
            if (modelos.length > 0) {
                modelos.forEach((modelo) => {
                    const option = document.createElement('option');
                    option.value = modelo.nome;
                    option.textContent = modelo.nome;
                    modelosSelect.appendChild(option);
                });
                modelosSelect.classList.remove('hidden'); // Exibe o select com os modelos
            }
            else {
                modelosSelect.innerHTML = '<option>Nenhum modelo encontrado</option>';
            }
        }
        catch (error) {
            console.error('Erro ao buscar modelos:', error);
            modelosSelect.innerHTML = '<option>Erro ao carregar modelos</option>';
            modelosSelect.classList.remove('hidden');
        }
    });
}
const buscarBtn = document.getElementById('buscarBtn');
buscarBtn.addEventListener('click', () => {
    console.log('Botão de busca clicado');
    exibirMarcas(); // Exibe as marcas ao clicar no botão
});
window.onload = () => {
    const modelosSelect = document.getElementById('modelosSelect');
    modelosSelect.classList.add('hidden'); // Ocultar o select inicialmente
    modelosSelect.addEventListener('click', () => exibirModelos);
};
window.onload = () => {
    const marcaSelect = document.getElementById('marcasSelect');
    marcaSelect.classList.add('hidden');
    marcaSelect.addEventListener('click', () => exibirMarcas);
};
