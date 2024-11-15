
import { Car} from "./fibeTypes"

const fetch = require('node-fetch');

const url = 'https://parallelum.com.br/fipe/api/v1';

export async function buscarMarcas(marca: string): Promise<Car[]> {
        const response = await fetch(`${url}/carros/marcas/${marca}/modelos`);
        if (!response.ok) {
            throw new Error(`Erro ao buscar as marcas: ${response.statusText}`);
        }
        const data = await response.json();
        return data.modelos.map((car: any) =>({
            nome: car.nome,
            marca: marca,
        }))
    }
// buscarMarcas().then(marcas => console.log('Marcas encontradas:', marcas[0]));