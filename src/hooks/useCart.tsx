import { ProductType } from "@/services/products"
import { ReactNode, createContext, useContext, useEffect, useState } from "react"
//Um tipo que vai ser esperado que vai ter um retorno que vai ser esperado
type CartContextType = {
    // um carrinho que vai ser um array de produtos
    cart: ProductType[]
    // função de adicionar produto
    addProduct: (product: ProductType) => void
    // função de remover produto
    removeProduct: (productId: number) => void
}
// criando o context. Ela é um objeto de contexto criado usando a função createContext. A função createContext recebe um argumento de tipo genérico CartContextType, que é presumivelmente um tipo definido em outro lugar no código.
const CartContext = createContext<CartContextType>({} as CartContextType)
// exportando o context provider. recebendo props que vai ta recebendo tipo children
export const CartContextProvider = (props: {
    children?: ReactNode;
    // dentro dela passamos uma arrowfunction abaixo
}) => {
    // cria um estado chamado cart, que é um array de objetos do tipo ProductType, e a função setCart que permite atualizar esse estado. 
    const [cart, setCart] = useState<ProductType[]>([])
    // inicialmente o useEffect vai verificar o carrinho que está armazenado no localStorage. 
    useEffect(() => {
        const storedCart = localStorage.getItem('shopping-cart')
        // se estiver alguma coisa no localStorage vai atualizar abaixo o state(setar) cart como sendo igual ao conteudo do carrinho.
        if (storedCart) {
            setCart(JSON.parse(storedCart))
        }
    }, [])
    // ela vai receber o produto e incluir esse produto no array, e vai atualizar tanto o localstorage quanto o usestate para refletir na aplicação.
    const addProduct = (product: ProductType) => {
        const updatedCart = [...cart, product]
        localStorage.setItem('shopping-cart', JSON.stringify(updatedCart))
        setCart(updatedCart)
    }
    // ele vai obter o id do produto como parametro, utilizando o findIndex para encontrar o indice no array de produtos 
    const removeProduct = (productId: number) => {
        const productIndex = cart.findIndex(product => product.id === (productId))
        // caso ele exista, se for diferente de -1, onde nao encontra o elemento. E tiver  no array ele vai remover o produto do carrinho.
        if (productIndex !== -1) {
            // duplicando o array
            const updatedCart = [...cart]
            //  usando o splice para remover o elemento
            updatedCart.splice(productIndex, 1)
            // atualizando o local storage na sequencia
            localStorage.setItem('shopping-cart', JSON.stringify(updatedCart))
            setCart(updatedCart)
        }
    }
    // retorna o context provider, ja com os valores disponiveis para utilização na pagina
    return (
        <CartContext.Provider
            value={ { cart, addProduct, removeProduct } }
        >
            {/* children o conteudo interno do provider */}
            { props.children }
        </CartContext.Provider>
    );
}
// basicamente vai exportar uma função anonima o useContext para utilizar o cartContext. Assim que chamar o hook estiver o contexto vai estar idpsonviel de uma vez so
export const useCart = () => useContext(CartContext)
