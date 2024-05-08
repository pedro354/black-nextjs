// definindo uma interface ProductType que descreve a estrutura de um produto. Um produto tem um id (identificador único), uma description (descrição), um price (preço), um imageUrl (URL da imagem do produto) e inStock (quantidade em estoque).
export type ProductType = {
    id: number
    name: string
    description: string
    price: number
    imageUrl: string
    inStock: number
}
// Esta função fetchProducts é uma função assíncrona que busca todos os produtos da API. Ela faz uma requisição HTTP utilizando o método fetch para a URL especificada (process.env.NEXT_PUBLIC_APIURL). Em seguida, ela espera a resposta (que é um objeto Response) e a converte para JSON usando res.json(). O resultado esperado é uma array de objetos ProductType.
export const fetchProducts = async () => {
    const products: ProductType[] = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/api/products`).then(res => res.json())
    return products
}
// Esta função fetchProduct é semelhante à fetchProducts, mas ela busca um único produto com base em seu ID. O ID do produto é passado como argumento para a função. Ela também faz uma requisição HTTP utilizando fetch, mas desta vez a URL é formada concatenando o ID do produto fornecido com a URL base. Mais uma vez, espera-se uma resposta JSON que representa um único objeto ProductType.
export const fetchProduct = async (id: string | number) => {
    const product: ProductType = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/api/products/${id}`).then(res => res.json())
    return product
}