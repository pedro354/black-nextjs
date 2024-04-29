import { NextPage } from "next";
import { Container, Row, Col } from "reactstrap";
const Dynamic: NextPage = () => {
    return (
        <Container tag='main'>
            <h1 className="my-5">
                Como funciionam as redereziações do Next.js
            </h1>
            <Row>
                <Col>
                    <h3>Gerado no servidor:</h3>
                </Col>
                <Col>
                    <h3>Gerado no cliente:</h3>
                </Col>
            </Row>
        </Container>
    )
}

export default Dynamic