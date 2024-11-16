var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { fetch } from 'undici';
const urlBase = 'https://parallelum.com.br/fipe/api/v1';
// Função para buscar as marcas de carros
export function buscarMarcas() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${urlBase}/carros/marcas/`);
            if (!response.ok) {
                throw new Error(`Erro ao buscar as marcas: ${response.statusText}`);
            }
            // Inspecionando a resposta da API
            const data = yield response.json();
            console.log('Resposta da API:', data); // Exibe os dados no console para entender a estrutura
            // Verifique como os dados estão estruturados e ajuste a tipagem se necessário
            // Aqui estou assumindo que data é um array de objetos com 'id' e 'nome', mas você pode precisar ajustar.
            return data.map((marca) => marca.nome);
        }
        catch (error) {
            console.error(error);
            return [];
        }
    });
}
// Função para buscar os modelos de uma marca
export function buscarModelos(marcaId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${urlBase}/carros/marcas/${marcaId}/modelos`);
            if (!response.ok) {
                throw new Error(`Erro ao buscar os modelos: ${response.statusText}`);
            }
            const data = yield response.json(); // Usando `any` para evitar problemas de tipagem
            console.log("Dados da API:", data); // Verifique a estrutura da resposta aqui
            // Verifica se a chave "modelos" existe na resposta
            if (data && data.modelos) {
                return data.modelos.map((car) => ({
                    nome: car.nome,
                    marca: marcaId,
                }));
            }
            else {
                console.error('Não foi possível encontrar a chave "modelos" na resposta');
                return [];
            }
        }
        catch (error) {
            console.error(error);
            return [];
        }
    });
}
