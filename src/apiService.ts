interface Car {
    nome: string,
    marca: string,
    modelo: string,
} // criei uma interface com nome, marca e modelo ambas do tipo string para melhor manipular na API

export async function buscarMarcas( marca: string,  modelo?: string): Promise<Car[]> { // estou exportando a função e definindo os parametros da interface e chamando ela no final
    const baseUrl = 'https://parallelum.com.br/fipe/api/v1/carros/marcas'; // estou armanzenando o url da API em uma variavel
    const url = `${baseUrl}/${marca}/modelos/${modelo}`; // defini outra variavel para poder setar o que eu quero com template literal

        const response = await fetch(url); // esperando a resposta da API via fetch
        if (!response.ok) {
            throw new Error(`Erro ao buscar as marcas: ${response.statusText}`); // verificando se a resposta retornar ok
        }
        const data = await response.json(); // convertendo os dados da api em arquivo json
        return data.modelos.map((car: any) =>({ // fazendo um map para percorrer e me retornar uma array nova com os dados que quero da API
            nome: car.nome,
            marca: car.marca,
            modelo: car.modelo
        }))
      
    }
    