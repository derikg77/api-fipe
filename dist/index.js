var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { buscarMarcas } from './apiService.js';
function exibirMarcas() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const input = document.getElementById('marcaInput'); // selecionando o input e convertendo para html elemnet para que p typescript o interprete
            const itemSearch = input.value.toLowerCase();
            const marcas = yield buscarMarcas(); // buscando o valor pelo input
            console.log('Marcas disponíveis:', marcas); // Verifica o retorno da API
            console.log('Valor pesquisado:', itemSearch); // Verifica o valor digitado
            const marcasFiltradas = marcas.filter((marca) => // Filtrar o nome da marca com o filter
             marca.nome.toLowerCase().includes(itemSearch));
            console.log('Marcas filtradas:', marcasFiltradas);
            const resulList = document.getElementById('results');
            resulList.innerHTML = '';
            if (marcasFiltradas.length > 0) { // condição para exibir as marcas encontradas
                marcasFiltradas.forEach((marca) => {
                    const listItem = document.createElement('li');
                    listItem.textContent = ` Nome: ${marca.nome}`;
                    resulList.appendChild(listItem);
                });
            }
            else {
                resulList.innerHTML = '<li class="error">Nenhuma marca encontrada</li>';
            }
        }
        catch (error) {
            console.error('Erro ao encontrar as marcas: ', error); // definindo uma mensagem de erro primeiramente no console
        }
    });
}
const buscarBtn = document.getElementById('buscarBtn');
buscarBtn.addEventListener('click', exibirMarcas); // chamando o evento de clik para exibir as marcas
