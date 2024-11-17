interface Car {
    nome: string,
    marca: string,
}

export async function buscarMarcas(marca: string): Promise<Car[]> {
    const baseUrl = 'https://parallelum.com.br/fipe/api/v1/carros/marcas';
    const url = `${baseUrl}/${marca}/modelos`;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erro ao buscar as marcas: ${response.statusText}`);
        }
        const data = await response.json();
        return data.modelos.map((car: any) =>({
            nome: car.nome,
            marca: marca,
        }))
    }