import axios from 'axios';
import React, {useEffect, useState } from 'react';
import {Col, Row, Button, Image, ListGroup, Card} from 'react-bootstrap';
import {Link, RouteComponentProps} from 'react-router-dom';
import Rating from '../components/Rating';

interface MatchParams {
    id: string
}

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

interface ProductScreenProps extends RouteComponentProps<MatchParams>, ProductInterface {
    
}

const ProductScreen: React.FC<ProductScreenProps> = (props) => {
    const [product, setProduct] = useState<ProductInterface>({
        _id: '',
        image: '',
        name: '',
        description: '',
        brand: '',
        category: '',
        price: 0,
        countInStock: 0,
        rating: 0,
        numReviews: 0,
    });

    useEffect(() => {
        (async () => {
            const {data} = await axios.get(`/api/products/${props.match.params.id}`);

            setProduct(data);
        })();
    }, [props.match]);

    return (
        <React.Fragment>
            <Link className="btn btn-ligh my-3" to="/">Go Back</Link>
            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid/>
                </Col>
                <Col md={3}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Price: ${product.price}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Description: {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Price:
                                    </Col>
                                    <Col>
                                        <strong>${product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Status:
                                    </Col>
                                    <Col>
                                        {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button
                                    className="btn-block"
                                    type="button"
                                    disabled={product.countInStock === 0}
                                >
                                    Add To Cart
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
}

export default ProductScreen;