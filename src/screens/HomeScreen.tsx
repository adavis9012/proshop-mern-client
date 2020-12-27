import React, {useEffect, useState } from 'react';
import Product from "../components/Product";
import {Col, Row} from "react-bootstrap";
import axios from 'axios';

interface ProductInterface {
    _id: string
    image: string
    name: string
    description: string
    brand: string
    category: string
    price: number
    countInStock: number
    rating: number
    numReviews: number
}

const HomeScreen = () => {
    const [products, setProducts] = useState<ProductInterface[]>([]);

    useEffect(() => {
        (async () => {
            const {data} = await axios.get('/api/products');
            
            setProducts(data);
        })();
    }, []);


    return (
        <React.Fragment>
             <h1>Latest Products</h1>
            <Row>
                {products.map(product => {
                    return (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product {...product} />
                        </Col>
                    )
                })}
            </Row>
        </React.Fragment>
    )
};

export default HomeScreen;