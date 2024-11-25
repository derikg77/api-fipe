import { buscarMarcas } from './apiService.js';  


async function exibirMarcas() {
   
    try {
        const input = document.getElementById('marcaInput') as HTMLInputElement // selecionando o input e convertendo para html elemnet para que p typescript o interprete
        const itemSearch = input.value.toLowerCase();
        const marcas =  await buscarMarcas(); // buscando o valor pelo input

        console.log('Marcas disponíveis:', marcas); // Verifica o retorno da API
        console.log('Valor pesquisado:', itemSearch); // Verifica o valor digitado
        
        const marcasFiltradas = marcas.filter((marca) => // Filtrar o nome da marca com o filter com o valor digitado do input
            marca.nome.toLowerCase().includes(itemSearch)
        );
        console.log('Marcas filtradas:', marcasFiltradas);
       const resulList = document.getElementById('results') as HTMLUListElement;
       resulList.innerHTML = '';
      
           if(marcasFiltradas.length > 0) { // condição para exibir as marcas encontradas
            marcasFiltradas.forEach((marca) => {
                const listItem = document.createElement('li');
                listItem.textContent = ` Nome: ${marca.nome}`;
                resulList.appendChild(listItem)
            })
           } else {
            resulList.innerHTML = '<li class="error">Nenhuma marca encontrada</li>'
           }
    
 } catch (error) {
     console.error('Erro ao encontrar as marcas: ', error); // definindo uma mensagem de erro primeiramente no console
 }
}


const buscarBtn = document.getElementById('buscarBtn') as HTMLButtonElement
buscarBtn.addEventListener('click', exibirMarcas) // chamando o evento de clik para exibir as marcas
