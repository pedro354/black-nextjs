import { GetServerSideProps, NextPage } from "next";
import { ReactNode, useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";

interface ApiResponse {
    name: string;
    timestamp: Date;
}
// define a função getServerSideProps e a exporta para que possa ser utilizada em outros arquivos. Ela também especifica que essa função deve retornar uma Promise que eventualmente resolverá um objeto com props para a página.
export const  getServerSideProps: GetServerSideProps = async () => {
    // utiliza fetch para fazer uma requisição HTTP GET para uma URL específica definida em uma variável de ambiente NEXT_PUBLIC_APIURL. A resposta da requisição é convertida para JSON e atribuída à variável serverSideData, que parece ser do tipo ApiResponse.
    const serverSideData: ApiResponse = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/api/hello`).then(res => res.json()) 
    // retorna um objeto contendo as props que serão passadas para a página. Neste caso, apenas uma propriedade chamada serverSideData está sendo passada, contendo os dados obtidos do servidor na etapa anterior.
    return {
        props: {
            serverSideData
        }
    }
}

const Dynamic: NextPage = (props:{
    // elemento filho que é do tipo ReactNode representa qualquer coisa que pode ser renderizada como um nó React.
    children?: ReactNode
    //  props opcional serverSideData é usado para passar os dados do lado do servidor para o componente. ApiResponse parece ser o tipo de dado esperado para os dados do lado do servidor.(tipo opcional representado por '?')
    serverSideData?: ApiResponse
}) => {
    //rederizndo componentes com useState tendo um 'tipo'(uma interface)
    const [clientSideData, setClientSideData] = useState<ApiResponse>()
    //No useEffect carregar os dados da API
    useEffect(() => {
        //Agora simplesmente chama a função 
        fecthData()
        //um array vazio para não ficar chamando a api toda vez
    }, [])
    //uma função assincrona para obter os dados da api
    const fecthData = async () => {
        // pegando a resposta com o 'fecth' e devolver ela convertida para json.
        const data = await fetch('/api/hello').then(response => response.json())
        //dados retornados
        setClientSideData(data)
    }
    return (
        <Container tag='main'>
            <h1 className="my-5">
                Como funciionam as redereziações do Next.js
            </h1>
            <Row>
                <Col >
                    <h3>Gerado no servidor:</h3>
                    <h2>
                        {props.serverSideData?.timestamp.toString()}
                    </h2>
                </Col>
                <Col>
                    <h3>Gerado no cliente:</h3>
                    <h2>{clientSideData?.timestamp.toString()}</h2>
                </Col>
            </Row>
        </Container>
    )
}

export default Dynamic