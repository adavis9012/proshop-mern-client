import axios from "axios";
import {CART_ADD_ITEM, CART_REMOVE_ITEM} from "../constants/carConstants";

export const addToCart = (id: string, quantity: number) => async (dispatch: any, getState: any) => {
    const {data} = await axios.get(`/api/products/${id}`);

    dispatch({
        type: CART_ADD_ITEM,
        item: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            quantity,
        }
    });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id: string) => (dispatch: any, getState: any) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        id,
    });
}
