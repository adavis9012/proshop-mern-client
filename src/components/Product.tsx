import React from "react";
import {Card} from "react-bootstrap";

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
            <a href={`/product/${props._id}`}>
                <Card.Img src={props.image} variant="top"/>
            </a>
            <Card.Body>
                <a href={`/product/${props._id}`}>
                    <Card.Title as="div">
                        <strong>{props.name}</strong>
                    </Card.Title>
                    <Card.Text>
                        <div className="my-3">
                            {props.rating} from {props.numReviews} reviews
                        </div>
                    </Card.Text>
                    <Card.Text as="h3">
                        ${props.price}
                    </Card.Text>
                </a>
            </Card.Body>
        </Card>
    );
};

export default Product;