import React from "react"
import { ProductType } from "../services/products"
import { Col, Row } from "reactstrap"
import ProductCard from "./ProductCard"


type ProductListProps = {
    products: ProductType[]
}
// recebe a lista de produtos na props para renderizar como uma pagina estática 
const ProductsList: React.FC<ProductListProps> = ({products}) => {
    return (
        <>
        {/* o map que vai gerar uma coluna para cada card que criamos */}
            <Row className="g-5">
                {products.map(product =>(
                    <Col md={6} lg={4} xl={3} key={product.id}>
                    <ProductCard
                    product={product}
                    />
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default ProductsList