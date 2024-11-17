var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
import { buscarMarcas } from './apiService.js';
function exibirMarcas() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const marcaInput = document.getElementById('marcaInput');
            const marcaId = marcaInput.value || '59';
            const cars = yield buscarMarcas(marcaId);
            const resultsList = document.getElementById('results');
            resultsList.innerHTML = '';
            cars.forEach((car) => {
                const listItem = document.createElement('li');
                listItem.textContent = `Marca: ${car.marca}, Nome: ${car.nome}`;
                resultsList.appendChild(listItem);
            });
        }
        catch (error) {
            console.error('Erro ao encontrar as marcas: ', error);
            const resultsList = document.getElementById('results');
            resultsList.innerHTML = '<li>Erro ao carregar as marcas. Tente novamente.</li>';
        }
    });
}
(_a = document.getElementById('buscarBtn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', exibirMarcas);
