// importa os tipos NextApiRequest e NextApiResponse do pacote "next". Esses tipos são usados para definir os tipos das requisições e respostas HTTP em APIs do Next.js.
//importando os dados de produtos de um arquivo chamado "database.json". O caminho começa com "../../../" porque estamos retrocedendo três diretórios a partir do local atual do arquivo para encontrar o "database.json". Presumivelmente, este arquivo contém os dados que serão retornados pela API.
import { NextApiRequest, NextApiResponse } from "next";
import products from "../../database.json"
//Esta linha define a função de roteamento da API. É exportada como padrão, o que significa que ela pode ser importada por outros arquivos como a função principal da API. A função recebe dois parâmetros: req, que é um objeto representando a requisição HTTP feita ao servidor, e res, que é um objeto representando a resposta HTTP que será enviada de volta ao cliente.
export default function handler(req: NextApiRequest, res: NextApiResponse) {
    //Aqui, estamos enviando uma resposta de status 200 (OK) junto com os dados dos produtos em formato JSON. Isso significa que, quando esta função é chamada através de uma requisição HTTP, ela retornará os dados dos produtos com um status de sucesso.
    res.status(200).json(products)
}