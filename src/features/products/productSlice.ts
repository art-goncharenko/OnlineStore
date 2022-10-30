import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const productsFetch = createAsyncThunk(
    "products/productsFetch",
    async (thunkAPI) => {
        const response = await axios.get("https://fakestoreapi.com/products");
        return await response?.data;
    }
)

interface ProductState {
    products: any[];
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
    error: string | null | undefined;
    category: string;
}

const initialState: ProductState = {
    products: [],
    loading: "idle",
    error: null,
    category: "all"
}

export const productsSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setCategory: (state, action) => {
            state.category = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(productsFetch.pending, (state, action) => {
            state.loading = "pending";
        });
        builder.addCase(productsFetch.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.products = action.payload;
        });
        builder.addCase(productsFetch.rejected, (state, action) => {
            state.loading = "failed";
            state.error = action.error.message;
        });

    }
})
export const {setCategory} = productsSlice.actions;
export const productReducer = productsSlice.reducer;
