import React from "react";
import Rating from "./Rating";
import {Card} from "react-bootstrap";
import {Link} from "react-router-dom";

interface ProductProps {
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

const Product: React.FC<ProductProps> = (props) => {
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
                    <Rating value={props.rating} reviews={props.numReviews} />
                    <Card.Text as="h3">
                        ${props.price}
                    </Card.Text>
                </Link>
            </Card.Body>
        </Card>
    );
};

export default Product;