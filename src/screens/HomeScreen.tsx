import React, {useEffect} from 'react';
import Loader from "../components/Loader";
import Message from "../components/Message";
import Product from "../components/Product";
import {Col, Row} from "react-bootstrap";
import {ProductListState} from "../reducers/productReducers";
import {listProducts} from "../actions/productAction";
import {useDispatch, useSelector} from "react-redux";

interface RootState {
    productList: ProductListState
}

const HomeScreen = () => {
    const dispatch = useDispatch();
    const productList: ProductListState = useSelector((state: RootState) => state.productList);
    const {loading, error, products} = productList;

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);

    function render() {
        return (
            <React.Fragment>
                <h1>Latest Products</h1>
                {
                    loading ?
                        <Loader/>
                        : error
                        ? renderError()
                        : renderRow()
                }
            </React.Fragment>
        );
    }

    function renderError() {
        return (
            <Message variant="danger">{error}</Message>
        );
    }

    function renderRow() {
        return (
            <Row>
                {
                    products && products.map(product => {
                        return (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product {...product} />
                            </Col>
                        );
                    })
                }
            </Row>
        );
    }

    return render();
};

export default HomeScreen;