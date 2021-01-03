import React from "react";
import Rating from "./Rating";
import {Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import {ProductInterface} from "../reducers/productReducers";

const Product: React.FC<ProductInterface> = (props) => {
    return (
        <Card className="my-3 p-3 rounded">
            <Link to={`/product/${props._id}`}>
                <Card.Img src={props.image} variant="top"/>
            </Link>
            <Card.Body>
                <Link to={`/product/${props._id}`}>
                    <Card.Title as="div">
                        <strong>{props.name}</strong>
                    </Card.Title>
                    <Rating value={props.rating} text={`${props.numReviews} reviews`} />
                    <Card.Text as="h3">
                        ${props.price}
                    </Card.Text>
                </Link>
            </Card.Body>
        </Card>
    );
};

export default Product;