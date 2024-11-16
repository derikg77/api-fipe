var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { buscarMarcas } from './apiService'; // Ajuste o caminho se necessário
function exibirMarcas(marcaInput) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const minMarcaId = 1;
            const maxMarcaId = 40;
            const marca = (Math.floor(Math.random() * (maxMarcaId - minMarcaId + 1)) + minMarcaId).toString();
            const cars = yield buscarMarcas();
            const resultadoLista = document.getElementById('results');
            resultadoLista.innerHTML = '';
            cars.map((car) => {
                const li = document.createElement('li');
                li.textContent = `Marca: ${car.marca}, Nome: ${car.nome}`;
                resultadoLista.appendChild(li);
            });
        }
        catch (error) {
            console.error('Erro ao encontrar as marcas: ', error);
        }
    });
}
document.getElementById('buscarBtn').addEventListener('click', () => {
    const marcaInput = document.getElementById('marcaInput').value;
    exibirMarcas(marcaInput || undefined);
});
