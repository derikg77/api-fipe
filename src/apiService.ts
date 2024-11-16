import { fetch } from 'undici';

// Definindo a interface para a resposta da API das marcas
interface Marca {
  id: string;
  nome: string;
}

const urlBase = 'https://parallelum.com.br/fipe/api/v1';

// Função para buscar as marcas de carros
export async function buscarMarcas(): Promise<string[]> {
    try {
      const response = await fetch(`${urlBase}/carros/marcas/`);
      if (!response.ok) {
        throw new Error(`Erro ao buscar as marcas: ${response.statusText}`);
      }
  
      // Inspecionando a resposta da API
      const data: any = await response.json();
      console.log('Resposta da API:', data); 
      return data.map((marca: any) => marca.nome);
    } catch (error) {
      console.error(error);
      return [];
    }
  }
export async function buscarModelos(marcaId: string): Promise<Marca[]> {
  try {
    const response = await fetch(`${urlBase}/carros/marcas/${marcaId}/modelos`);
    if (!response.ok) {
      throw new Error(`Erro ao buscar os modelos: ${response.statusText}`);
    }
    const data: any = await response.json(); // Usando `any` para evitar problemas de tipagem

    console.log("Dados da API:", data); // Verifique a estrutura da resposta aqui

    // Verifica se a chave "modelos" existe na resposta
    if (data && data.modelos) {
      return data.modelos.map((car: any) => ({
        nome: car.nome,
        marca: marcaId,
      }));
    } else {
      console.error('Não foi possível encontrar a chave "modelos" na resposta');
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
}
