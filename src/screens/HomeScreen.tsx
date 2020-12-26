import React from 'react';
import Product from "../components/Product";
import products from "../products";
import {Col, Row} from "react-bootstrap";

const HomeScreen = () => {
    return (
        <React.Fragment>
             <h1>Latest Products</h1>
            <Row>
                {products.map(product => {
                    return (
                        <Col sm={12} md={6} lg={4} xl={3}>
                            <Product {...product} />
                        </Col>
                    )
                })}
            </Row>
        </React.Fragment>
    )
};

export default HomeScreen;