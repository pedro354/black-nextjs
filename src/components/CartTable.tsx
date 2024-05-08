import Image from "next/image";
import { useEffect, useState } from "react";
import { Button, Col, Row, Table } from "reactstrap";
import { useCart } from "../hooks/useCart";
import { ProductType } from "../services/products";
// tipo de carrinho para produto e tipo de produto. tipo de quantidade passado como number
type CartEntry = {
  product: ProductType
  quantity: number
}
// componente criado para linha da tabela. Que vai receber uma entrada
const CartTableRow = (props: {
  entry: CartEntry
}) => {
  // dentro desta linha usará o useCart que adiciona ou remove
  const { addProduct, removeProduct } = useCart()
  // retornamos uma tabela
  return (
    <tr>
      <td>
        <Row className="align-items-center">
          <Col xs={3} md={2} lg={1} style={{justifyContent: 'center'}}>
            <Image
              src={props.entry.product.imageUrl}
              alt={props.entry.product.name}
              height={50}
              width={50}
            />
          </Col>
          <Col xs={8} md={10} lg={11} style={{textAlign: 'center'}}>
            {props.entry.product.name}
          </Col>
        </Row>
      </td>
      <td>R$ {props.entry.product.price}</td>
      <td>{props.entry.quantity}</td>
      <td>R$ {(props.entry.product.price * props.entry.quantity)}</td>
      <td>
        <Button
          color="primary"
          size="sm"
          onClick={() => addProduct(props.entry.product)}
        >
          +
        </Button>
        {' '}
        <Button
          color="danger"
          size="sm"
          onClick={() => removeProduct(props.entry.product.id)}
        >
          –
        </Button>
      </td>
    </tr>
  )
}

//   exportando uma função de tabela de carrinho
export default function CartTable() {
  // um state para entrada de carrinhos, que é um array
  const [cartEntries, setCartEntries] = useState<CartEntry[]>([])
  const { cart } = useCart()
  // converter o array de varios produtos acima para o formato quer está no cartEntry, basicamente todos os itens que são iguais ele vaijuntar em um item só e obter a quantidade.
  useEffect(() => {
    //  utilizando o reduce para transformar o array
    const entriesList = cart.reduce((list, product) => {
      // e para cada indice que encontrar o produto onde o id estiver correspondente ele vai retornar a lista.
      const entryIndex = list.findIndex(entry => entry.product.id === product.id)
      // retornando a lista
      // caso esse item nao esteja  no carrinho, (ou seja -1) não encontra um elemento ele retorna -1. e se não estiver ele cria um novo item para o status da lista
      if (entryIndex === -1) {
        return [
          ...list,
          {
            product,
            quantity: 1
          }
        ]
      }
      // mas caso esse indice for encontrado vai pegar a posição onde ele esta e incrementar a quantidade
      // lista acumulada
      list[entryIndex].quantity++
      return list

    }, [] as CartEntry[])
    // depois q termina tudo usando sort para deixar ordenado e organizado de acordo com o id
    entriesList.sort((a, b) => a.product.id - b.product.id)
    // atualizando o state com o array
    setCartEntries(entriesList)
    // detalhe que cada mudança no carrinho ele reflete no useEffect cart
  }, [cart])
  // retorna uma tabela 
  return (
    <Table responsive className="align-middle" style={{ minWidth: '32em' }}>
      <thead style={{borderBottom: 'solid'}}>
      <tr>
          <th>Produto</th>
          <th>Preço</th>
          <th>Qtd.</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {/* utilizando o map nas entrada,criando uma linha para cada uma delas passando o key e o entry */}
				{cartEntries.map(entry => <CartTableRow key={entry.product.id} entry={entry} />)}
      </tbody>
    </Table>
  )
}