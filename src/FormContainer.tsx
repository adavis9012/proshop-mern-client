import React from "react";
import {Col, Container, Row} from "react-bootstrap";

const FormContainer: React.FC<React.PropsWithChildren<any>> = ({children}) => {
    return (
        <Container>
            <Row>
                <Col xs={12} md={6}>
                    {children}
                </Col>
            </Row>
        </Container>
    );
}

export default FormContainer;
