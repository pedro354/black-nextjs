import { NextApiRequest, NextApiResponse } from "next";
import products from '../../../../database.json'


export default function handler(req: NextApiRequest, res: NextApiResponse){
    //obtendo o id dos parametros das rotas, extraindo qlqr parametro nas rotas a partir do req.query
    const { id } = req.query
    // Estamos procurando pelo produto com o ID correspondente ao valor passado na requisição. A função find percorre o array de produtos e retorna o primeiro produto que satisfaz a condição especificada dentro do callback. O Number(id) converte o parâmetro de ID de string para número, para garantir que seja comparável.
    const product = products.find(product => product.id === Number(id))
    // Aqui, estamos enviando uma resposta de status 200 (OK) junto com os dados do produto encontrado em formato JSON. Isso significa que, quando esta função é chamada através de uma requisição HTTP, ela retornará os dados do produto com o ID correspondente, se encontrado, com um status de sucesso. Se nenhum produto for encontrado com o ID especificado, o valor de product será undefined, e isso será retornado como resposta JSON vazio.
    res.status(200).json(product)
}