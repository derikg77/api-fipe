import { buscarMarcas } from './apiService.js';  


async function exibirMarcas() {
   
    try {
      
        const input: any = document.getElementById('marcaInput') as HTMLInputElement // selecionando o input e convertendo para html elemnet para que p typescript o interprete
        const marcaId: any = input.value.trim(); // selecionando a marca do modelo
        const cars: any =  await buscarMarcas(marcaId); // esperando a promisse retornar o modelo e a marca 

        const resultList = document.getElementById('results') as HTMLUListElement; // selecionando o resultado que vai retonar da listagem do input
       
    } catch (error) {
        console.error('Erro ao encontrar as marcas: ', error); // definindo uma mensagem de erro primeiramente no console
    }
}


const buscarBtn = document.getElementById('buscarBtn') as HTMLButtonElement
console.log(buscarBtn.addEventListener('click', exibirMarcas))
