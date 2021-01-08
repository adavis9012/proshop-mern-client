import {CART_ADD_ITEM, CART_REMOVE_ITEM} from "../constants/carConstants";

export interface CartItem {
    product: string
    name?: string
    image?: string
    price: number
    countInStock?: string
    quantity: number
}

export interface CartState {
    cartItems: CartItem[]
}

interface CartAction extends CartState{
    type: 'CART_ADD_ITEM' | 'CART_REMOVE_ITEM'
    item: CartItem
    id?: string
}

export const cartReducer = (state: CartState= {cartItems: []}, action: CartAction) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.item;
            const existItem = state.cartItems.find(x => x.product === item.product);

            if(existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(x =>
                        x.product === existItem.product ? item : x
                    ),
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                }
            }
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item.product !== action.id),
            }
        default:
            return state;
    }
};
