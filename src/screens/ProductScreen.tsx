import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Form, Image, ListGroup, Row} from 'react-bootstrap';
import {Link, RouteComponentProps} from 'react-router-dom';
import Rating from '../components/Rating';
import {useDispatch, useSelector} from "react-redux";
import {ProductDetailsState} from "../reducers/productReducers";
import {listProductDetails} from "../actions/productAction";
import Loader from "../components/Loader";
import Message from "../components/Message";

interface MatchParams {
    id: string
}

interface RootState {
    productDetails: ProductDetailsState
}

const ProductScreen: React.FC<RouteComponentProps<MatchParams>> = ({history, match}) => {
    const [quantity, setQuantity] = useState('0');
    const dispatch = useDispatch();
    const productDetails: ProductDetailsState = useSelector((state: RootState) => state.productDetails);
    const {loading, product, error} = productDetails;

    useEffect(() => {
        dispatch(listProductDetails(match.params.id));
    }, [dispatch, match]);

    function render() {
        return (
            <React.Fragment>
                <Link className="btn btn-ligh my-3" to="/">Go Back</Link>
                {
                    loading
                        ? <Loader/>
                        : error
                        ? <Message variant="danger">error</Message>
                        : renderRow()
                }
            </React.Fragment>
        );
    }

    function renderQuantityForm() {
        const inStockKeys = Array(product.countInStock).keys();

        return (
            <ListGroup.Item>
                <Row>
                    <Col>Qty</Col>
                    <Col>
                        <Form.Control
                            as="select"
                            value={quantity}
                            onChange={(event => setQuantity(event.target.value))}
                        >
                            {
                                Array.from(inStockKeys).map(value => {
                                    const x = value + 1;

                                    return (
                                        <option key={x} value={x}>
                                            {x}
                                        </option>
                                    )
                                })
                            }
                        </Form.Control>
                    </Col>
                </Row>
            </ListGroup.Item>
        );
    }

    function renderRow() {
        return (
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
                            {
                                product.countInStock > 0 && renderQuantityForm()
                            }
                            <ListGroup.Item>
                                <Button
                                    onClick={addToCartHandler}
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
        );
    }

    function addToCartHandler() {
        history.push(`/cart/${match.params.id}?qty=${quantity}`);
    }

    return render();
};

export default ProductScreen;