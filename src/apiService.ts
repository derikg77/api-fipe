interface Marca {
    nome: string,
} // criei uma interface com Marca para puxar o nome da marca

export async function buscarMarcas(nome?: string): Promise<Marca[]> { // estou exportando a função e definindo os parametros da interface e chamando ela no final
    const baseUrl = 'https://parallelum.com.br/fipe/api/v1/carros/marcas'; // estou armanzenando o url da API em uma variavel
    // const options = {
    //     method: 'GET',
    //     headers: {
    //         'x-rapidapi-key': 'f4a5bee69dmsh3b9fc36d1807915p12c1c6jsn3e00ac61d198',
    //         'x-rapidapi-host': 'tabela-fipe-api1.p.rapidapi.com'
    //     }
    // };
    
    const response = await fetch(baseUrl); // esperando a resposta da API via fetch
    if (!response.ok) {
        throw new Error(`Erro ao buscar as marcas: ${response.statusText}`); // verificando se a resposta retornar ok
    }
    const data = await response.json(); // convertendo os dados da api em arquivo json
    const marcas: Marca[] = data.map((car: any) => ({ // fazendo um map para percorrer e me retornar uma array nova com os dados que quero da API 
        nome: car.nome 
          
    }))
    if(nome) { // verificando para filtrar o nome da marca
        return marcas.filter((marca) => {
            marca.nome.toLowerCase().includes(nome.toLowerCase())
        })
    }

    return marcas;
}
interface Modelo {
    nome: string,
} // interface modelo

export async function buscarModelos(nome?: string): Promise<Modelo[]> {
    const baseUrl = 'https://parallelum.com.br/fipe/api/v1/carros/marcas/59/modelos'; // api com os modelos listados
    const response = await fetch(baseUrl) // esperando a resposta da api
    if(!response.ok) { // verificação do status da api
        throw new Error(`Erro ao buscar os modelos: ${response.statusText}`)
    }
    const data = await response.json(); // convertendo a resposta em json e armazenando na variavel data
    console.log('Resposta da API de modelos:', data); // Verifica os dados recebidos
    const modelos = data.modelos.map((modelo: any) =>({ // dando uma iteração para buscar o nome dos modelos com o map
        nome: modelo.nome
    }))
    if(nome) { // verificar para filtrar somente o nome do modelo
        return modelos.filter((modelo: any) =>   {
            modelo.nome.toLowerCase().includes(nome.toLowerCase())
        })
    }
    return modelos; // retornando os modelos no final da condição
}