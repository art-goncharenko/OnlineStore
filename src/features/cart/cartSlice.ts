import { createSlice} from '@reduxjs/toolkit'

export type CartState = CartItem[];

export interface CartItem {
    id: number,
    quantity: number
}

export interface CartSlice {
    items: CartItem[]
}

const initialState: CartSlice = {
    items: [],
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const id = action.payload;
            const itemInCart = state.items.find((item) => item.id === id)
            if (itemInCart) {
                itemInCart.quantity++
            } else {
                state.items.push({id, quantity: 1})
            }
        },
        removeItem: (state, action) => {
            const id = action.payload;
            const itemInCart = state.items.find((item) =>  item.id === id);
            if(itemInCart?.quantity === 1) {
                state.items = state.items.filter((item) => item.id !== id )
                return
            }
            if (itemInCart) {
                itemInCart.quantity--
            }
        },
        resetCart: (state) => {
            state.items = [];
        }
    },
})

// Action creators are generated for each case reducer function
export const {addToCart, removeItem, resetCart} = cartSlice.actions

export default cartSlice.reducer