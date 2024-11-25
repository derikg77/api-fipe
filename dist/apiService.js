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
            codigo: car.codigo,
            nome: car.nome
        }));
        if (nome) { // verificandom para filtrar o nome da marca
            return marcas.filter((marca) => {
                marca.nome.toLowerCase().includes(nome.toLowerCase());
            });
        }
        return marcas;
    });
}
