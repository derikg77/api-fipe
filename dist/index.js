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
            const marcaId = input.value.trim(); // selecionando a marca do modelo
            const cars = yield buscarMarcas(marcaId); // esperando a promisse retornar o modelo e a marca 
            const resultList = document.getElementById('results'); // selecionando o resultado que vai retonar da listagem do input
        }
        catch (error) {
            console.error('Erro ao encontrar as marcas: ', error); // definindo uma mensagem de erro primeiramente no console
        }
    });
}
const buscarBtn = document.getElementById('buscarBtn');
console.log(buscarBtn.addEventListener('click', exibirMarcas));
