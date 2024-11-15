import { buscarMarcas } from './services/apiService'; 

async function exibirMarcas() {
    try {
       const brand = '59'
       const cars = await buscarMarcas(brand);
       cars.forEach((car) => {
        console.log(`Marca: ${car.marca}, Nome: ${car.nome}`)
       })

    }
    catch(error) {
        console.error('Erro ao encontrar as marcas: ', error)
    }
}
exibirMarcas();