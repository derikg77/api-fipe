import { buscarMarcas } from './services/apiService'; ;

async function exibirMarcas() {
    try {
        const marcas = await buscarMarcas();
        console.log('Marcas encontradas: ', marcas);

    }
    catch(error) {
        console.error('Erro ao encontrar as marcas: ', error)
    }
}
exibirMarcas();