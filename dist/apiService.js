var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function buscarMarcas(nome) {
    return __awaiter(this, void 0, void 0, function* () {
        const baseUrl = 'https://parallelum.com.br/fipe/api/v1/carros/marcas'; // estou armanzenando o url da API em uma variavel
        const response = yield fetch(baseUrl); // esperando a resposta da API via fetch
        if (!response.ok) {
            throw new Error(`Erro ao buscar as marcas: ${response.statusText}`); // verificando se a resposta retornar ok
        }
        const data = yield response.json(); // convertendo os dados da api em arquivo json
        const marcas = data.map((car) => ({
            nome: car.nome
        }));
        if (nome) { // verificando para filtrar o nome da marca
            return marcas.filter((marca) => {
                marca.nome.toLowerCase().includes(nome.toLowerCase());
            });
        }
        return marcas;
    });
}
export function buscarModelos(nome) {
    return __awaiter(this, void 0, void 0, function* () {
        const baseUrl = 'https://parallelum.com.br/fipe/api/v1/carros/marcas/59/modelos'; // api com os modelos listados
        const response = yield fetch(baseUrl); // esperando a resposta da api
        if (!response.ok) { // verificação do status da api
            throw new Error(`Erro ao buscar os modelos: ${response.statusText}`);
        }
        const data = yield response.json(); // convertendo a resposta em json e armazenando na variavel data
        console.log('Resposta da API de modelos:', data); // Verifica os dados recebidos
        const modelos = data.modelos.map((modelo) => ({
            nome: modelo.nome
        }));
        if (nome) { // verificar para filtrar somente o nome do modelo
            return modelos.filter((modelo) => {
                modelo.nome.toLowerCase().includes(nome.toLowerCase());
            });
        }
        return modelos; // retornando os modelos no final da condição
    });
}
