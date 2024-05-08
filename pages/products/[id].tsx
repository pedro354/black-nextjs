import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ProductType, fetchProduct, fetchProducts } from "@/services/products";
import Header from "@/components/Header";
import ProductDetails from "@/components/ProductDetails";
import Head from "next/head";
import { ReactNode } from "react";
import { Container } from "reactstrap";

export const getStaticProps: GetStaticProps = async (context) => {
    //  id que está sendo passado na url, utilizando o context.params?(propriedade opcional(?)).id. Indicar na sintaxe que o id ele é opcional e caso ele esteja disponivel será obtido
    const id = context.params?.id
    if (typeof id === "string") {
        const product = await fetchProduct(id)
        return {
            props: {
                product
            }
        }
    }
    return {
        // caso voce nao tenha um produto redirecione para o next
        redirect: {
            destination: "/products",
            permanent: false
        }
    }

}

// para o programa saber exatamente quais paginas estaticas precisam gerar
// Path em getStaticPaths é para obter os caminhso estaticos, falando para o next quais sao todas as rotas dinamicas possiveis para gerar uma unica página estatica para cada rota
export const getStaticPaths: GetStaticPaths = async () => {
    const products = await fetchProducts()
    // variavel paths pegando os produtos utilizando map para retornar o product o objeto no formato que se espera como retorno. Dentro retorna um objeto. No formato de params: que é um objeto onde cada uma das chaves é variavel que estamos utlizando na pasta. Esse parametro id que vai passar um valor id que vai retornar para cada produto vai retornar um objeto contentdo um parametro id que é um product.id, passando como toString porque no banco de dados é um number
    // basicamente paths vai ser um array desse objeto id 
    const paths = products.map(product => {
        return {
            params: {
                id: product.id.toString()
            }
        }
    })
    return {
        // fallback é false, ele serve para dizer ao next que está como false, para que não haja nenhum fallback, ou seja nenhuma ação de reserva  quando ele não encontrar o produto. 
        // ele faz o seguinte: ele vai retornar a pagina 404 (personalizado caso queira contruir um  erro 404)
        paths,
        fallback: false
    }
}

const Product: NextPage = (props: {
    children?: ReactNode
    product?: ProductType
}) => {
    return (
        <>
            <Head>
                {/* resumo: nome e descrição como está na prop de produto */ }
                <title>{ props.product!.name }</title>
                <meta name="description" content={ props.product!.description } />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {/* cabeçalho da página */ }
            <Header />
            {/* e o objeto productdeatails que recebe a prop */ }
            <Container className="mt-5">
                <ProductDetails product={ props.product! } />
            </Container>
        </>
    )
}

export default Product