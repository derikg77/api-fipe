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
            const itemSearch = (input === null || input === void 0 ? void 0 : input.value.toLowerCase()) || ''; // Verificação de segurança
            const marcaSelect = document.getElementById('marcasSelect');
            // Simulando marcas disponíveis (como retorno de API)
            const marcas = yield buscarMarcas(); // Simula busca de marcas a partir da API
            console.log('Marcas disponíveis:', marcas);
            const marcasFiltradas = marcas.filter((marca) => { var _a; return (_a = marca === null || marca === void 0 ? void 0 : marca.nome) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(itemSearch); });
            console.log('Marcas filtradas:', marcasFiltradas);
            const resulList = document.getElementById('results');
            resulList.innerHTML = '';
            if (!itemSearch) {
                resulList.innerHTML = '<li class="error">Por favor, digite o nome de uma marca.</li>';
                return;
            }
            if (marcasFiltradas.length > 0) {
                marcaSelect.innerHTML = '<option value="">Selecione uma marca</option>'; // Limpa o select
                marcasFiltradas.forEach((marca) => {
                    const listItem = document.createElement('li');
                    const optionMarca = document.createElement('option');
                    optionMarca.value = marca.nome;
                    optionMarca.textContent = marca.nome;
                    listItem.textContent = `Nome: ${marca.nome}`;
                    listItem.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
                        console.log(`Marca clicada: ${marca.nome}`);
                        yield exibirModelos(marca.nome);
                    }));
                    optionMarca.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
                        console.log(`Marca clicada: ${marca.nome}`);
                        yield exibirModelos(marca.nome);
                    }));
                    marcaSelect.appendChild(optionMarca);
                    resulList.appendChild(listItem);
                });
                marcaSelect.classList.remove('hidden');
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
// Configura evento do botão buscar
const buscarBtn = document.getElementById('buscarBtn');
buscarBtn === null || buscarBtn === void 0 ? void 0 : buscarBtn.addEventListener('click', () => {
    console.log('Botão de busca clicado');
    // Acessa o valor do input
    const input = document.getElementById('marcaInput');
    const inputValue = (input === null || input === void 0 ? void 0 : input.value.trim().toLowerCase()) || ''; // Garante segurança e normalização
    console.log(`Valor do input: ${inputValue}`);
    const marcaSelecionada = (input === null || input === void 0 ? void 0 : input.value) || '';
    console.log(`Marca selecionada via select: ${marcaSelecionada}`);
    exibirMarcas(marcaSelecionada); // Exibe as marcas ao clicar no botão
});
// Configuração inicial para ocultar os selects e associar eventos
window.onload = () => {
    const modelosSelect = document.getElementById('modelosSelect');
    const marcaSelect = document.getElementById('marcasSelect');
    modelosSelect === null || modelosSelect === void 0 ? void 0 : modelosSelect.classList.add('hidden'); // Ocultar o select inicialmente
    marcaSelect === null || marcaSelect === void 0 ? void 0 : marcaSelect.classList.add('hidden');
    marcaSelect === null || marcaSelect === void 0 ? void 0 : marcaSelect.addEventListener('change', (event) => __awaiter(void 0, void 0, void 0, function* () {
        const target = event.target;
        const marcaSelecionada = target === null || target === void 0 ? void 0 : target.value;
        if (marcaSelecionada) {
            console.log(`Marca selecionada via select: ${marcaSelecionada}`);
            yield exibirModelos(marcaSelecionada);
        }
    }));
};
