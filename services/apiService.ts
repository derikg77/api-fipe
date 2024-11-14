const fetch = require('node-fetch');

const url = 'https://parallelum.com.br/fipe/api/v1/carros/marcas';

export async function buscarMarcas() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erro ao buscar as marcas: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro: ', error);
    }
}
// buscarMarcas().then(marcas => console.log('Marcas encontradas:', marcas[0]));