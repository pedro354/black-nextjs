import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Button, Card, CardBody, CardSubtitle } from "reactstrap";
import { ProductType } from "../services/products";
import SuccessToast from './SuccessToast'
import { useCart } from "@/hooks/useCart";

type ProductCardProps = {
    product: ProductType
}

const ProductCard: React.FC<ProductCardProps> = ({product}) => {
    const [toastIsOpen, setToastIsOpen] = useState(false)
    const {id, name, imageUrl, price} = product
    const { addProduct } = useCart()
    return (
        <>
            <Card>
            {/* Link para o produto */}
            <Link href={`/products/${id}`}>
                 {/*Exibindo uma imagem sendo obtida atraves das props desse componentes funcional dos produtos.
                 Componentes do next Image, da altura e largura que otimiza as imagens e previne o csl previne as proporções erradas das páginas.
                 */}
                <Image className="card-img-top" src={imageUrl} alt={product.name} height={200} width={600}></Image>
            </Link>
            <CardBody>
                {/* Link para o corpo dos produtos */}
                <Link href={`/products/${id}`}>
                    {/* estilização do nome e preço */}
                <h5 className="card-title" style={{cursor:"pointer"}}>
                {name}
                </h5>
                </Link>
                <CardSubtitle className="mb-3 text-muted" tag="h6">
                    R$ {price}
                </CardSubtitle>
                {/*   */}
                <Button
                    color="dark"
                    className="pb-2"
                    block
                    // onClick está setando o state utilizado. 
                    onClick={() => {
                        addProduct(product)
                        setToastIsOpen(true)
                        setTimeout(() => setToastIsOpen(false), 1000 * 3)
                    }}
                >
                    Adicionar ao Carrinho
                </Button>
            </CardBody>
            </Card>
            {/* toast é uma mensagem discreta no canto da tela quando quer mostrar uma mensgem para o usuario, para que toda vez que clicar no botao de clicar no carrinho, ele vai abrir o toast e abrir o setTimeout, aguardar por tres segundos e depois vai fechar o toast */}
            <SuccessToast toastIsOpen={toastIsOpen} setToastIsOpen={setToastIsOpen} />
        </>
    )
}

export default ProductCard