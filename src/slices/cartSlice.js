import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    totalItems: localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem('token')) : 0, 
}

const cartSlice = createSlice({
    name: 'cart', 
    initialState: initialState,
    reducers: {
        setTotalItems(state, value){
            state.token = value.payload
        }
        //add to cart
        //remove from cart
        //reset cart    
    }
})

export const {setTotalItems} = cartSlice.actions
export default cartSlice.reducer