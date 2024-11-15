"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const apiService_1 = require("./services/apiService");
function exibirMarcas() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const brand = '59';
            const cars = yield (0, apiService_1.buscarMarcas)(brand);
            cars.forEach((car) => {
                console.log(`Marca: ${car.marca}, Nome: ${car.nome}`);
            });
        }
        catch (error) {
            console.error('Erro ao encontrar as marcas: ', error);
        }
    });
}
exibirMarcas();
