import Image from "next/image";
import React, { useState } from "react";
import { Button, Col, Row } from "reactstrap";
import SuccessToast from "./SuccessToast";
import { ProductType } from "../services/products";
import { useCart } from "@/hooks/useCart";
// tipo especifico para os produtos 
type ProductDetailsProps = {
  product: ProductType
}
// o tipo vira para a prop
const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
    // estamos definindo o componente ProductDetails. Ele recebe as propriedades product através de desestruturação. No componente, estamos renderizando uma imagem do produto usando o componente Image de Next.js, e uma coluna com detalhes adicionais do produto, como nome, preço, descrição, quantidade em estoque e um botão para comprar o produto. Também estamos renderizando um componente SuccessToast que exibe um toast de sucesso quando o produto é comprado com sucesso.
  const [toastIsOpen, setToastIsOpen] = useState(false)
  const {addProduct} = useCart()

  return (
    <Row>
      <Col lg={6}>
        <Image
          src={product.imageUrl}
          alt={product.name}
          height={500}
          width={600}
        />
      </Col>

      <Col lg={6}>
        <h1>{product.name}</h1>

        <h2 className="text-muted">R$ {product.price}</h2>

        <p className="my-3">
          <span className="d-block font-weight-bold">Descrição:</span>
          {product.description}
        </p>

        <p className="text-muted">Em estoque: {product.inStock}</p>

        <Button
          color="dark"
          className="my-3 pb-2"
          onClick={() => {
            setToastIsOpen(true)
            setTimeout(() => setToastIsOpen(false), 1000 * 3)
            addProduct(product)
        }}
        >
          Compre agora
        </Button>

        <SuccessToast toastIsOpen={toastIsOpen} setToastIsOpen={setToastIsOpen} />
      </Col>
    </Row>
  )
}

export default ProductDetails