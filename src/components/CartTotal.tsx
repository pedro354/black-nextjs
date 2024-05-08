import { useCart } from "@/hooks/useCart"
import { Card, CardBody } from "reactstrap"

const CartTotal = () => {
    // usa o hook para obter o carrinho
    const { cart } = useCart()
    return (
        <Card className="ms-auto" style={{maxWidth: '20rem'}}>
        <CardBody className="d flex justify-content-between">
        <strong>
            Total:
        </strong>
        <span>
            {/* utilizando o reduce para somar todos os preços */}
            R$ {cart.reduce((total, product) => total + product.price, 0) }
        </span>
        </CardBody>
        </Card>
    )
}
export default CartTotal