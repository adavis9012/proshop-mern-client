import React, {useEffect} from "react";
import {Link, RouteComponentProps} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addToCart, removeFromCart} from "../actions/cartActions";
import {CartItem, CartState} from "../reducers/cartReducers";
import {Button, Card, Col, Form, Image, ListGroup, Row} from "react-bootstrap";
import Message from "../components/Message";

interface MatchParams {
    id: string
}

interface RootState {
    cart: CartState
}

const CartScreen: React.FC<RouteComponentProps<MatchParams>> = ({match, location, history}) => {
    const productId = match.params.id;
    const quantity = location.search ? Number(location.search.split('=')[1]) : 1;
    const dispatch = useDispatch();
    const cart: CartState = useSelector((state: RootState) => state.cart);
    const {cartItems} = cart;

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, quantity));
        }
    }, [dispatch, productId, quantity]);

    function render() {
        return (
            <Row>
                <Col md={8}>
                    <h1>Shopping Cart</h1>
                    {cartItems.length === 0 ? renderEmptyMessage() : renderProducts()}
                </Col>
                <Col md={4}>
                    {renderTotals()}
                </Col>
            </Row>
        );
    }

    function renderProducts() {
        return (
            <ListGroup variant="flush">
                {
                    cartItems.map(item => (
                        <ListGroup.Item key={item.product}>
                            <Row>
                                <Col md={2}>
                                    <Image src={item.image} alt={item.name} fluid rounded/>
                                </Col>
                                <Col md={3}>
                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                </Col>
                                <Col md={2}>
                                    ${item.price}
                                </Col>
                                <Col md={2}>
                                    {renderQuantityForm(item)}
                                </Col>
                                <Col md={2}>
                                    <Button type="button" variant="light"
                                            onClick={() => removeFromCartHandler(item.product)}>
                                        <i className="fas fa-trash"/>
                                    </Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))
                }
            </ListGroup>
        );
    }

    function renderQuantityForm(item: CartItem) {
        const inStockKeys = Array(item.countInStock).keys();

        return (
            <Form.Control
                as="select"
                value={item.quantity}
                onChange={(event => dispatch(addToCart(item.product, Number(event.target.value))))}
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
        )
    }

    function renderEmptyMessage() {
        return (
            <Message>
                Your cart is empty
                {' '}<Link to="/">Go Back</Link>
            </Message>
        );
    }

    function renderTotals() {
        return (
            <Card>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <h2>
                            Subtotal{' '}
                            ({calculateTotalQuantity()})
                            {' '}items
                        </h2>
                        ${calculateTotalPrice()}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Button
                            type="button"
                            className="btn-block"
                            disabled={cartItems.length === 0}
                            onClick={checkoutHandler}
                        >
                            Proceed To Checkout
                        </Button>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        );
    }

    function removeFromCartHandler(id: string) {
        dispatch(removeFromCart(id));
    }

    function checkoutHandler() {
        history.push('/login?redirect=shipping');
    }

    function calculateTotalQuantity() {
        return cartItems.reduce((accumulator, item) => {
            return accumulator + item.quantity;
        }, 0);
    }

    function calculateTotalPrice() {
        return cartItems.reduce((accumulator, item) => {
            return accumulator + item.quantity * item.price;
        }, 0).toFixed(2);
    }

    return render();
}

export default CartScreen;
