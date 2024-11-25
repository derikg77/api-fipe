interface Marca {
    nome: string,
} // criei uma interface com nome, marca e modelo ambas do tipo string para melhor manipular na API

export async function buscarMarcas(nome?: string): Promise<Marca[]> { // estou exportando a função e definindo os parametros da interface e chamando ela no final
    const baseUrl = 'https://parallelum.com.br/fipe/api/v1/carros/marcas'; // estou armanzenando o url da API em uma variavel
    const response = await fetch(baseUrl); // esperando a resposta da API via fetch
    if (!response.ok) {
        throw new Error(`Erro ao buscar as marcas: ${response.statusText}`); // verificando se a resposta retornar ok
    }
    const data = await response.json(); // convertendo os dados da api em arquivo json
    const marcas: Marca[] = data.map((car: any) => ({ // fazendo um map para percorrer e me retornar uma array nova com os dados que quero da API
        codigo: car.codigo,  
        nome: car.nome       
    }))
    if(nome) { // verificandom para filtrar o nome da marca
        return marcas.filter((marca) => {
            marca.nome.toLowerCase().includes(nome.toLowerCase())
        })
    }
    return marcas;
}
