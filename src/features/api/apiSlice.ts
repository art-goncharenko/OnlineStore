import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com' }),
    endpoints: builder => ({
        getProducts: builder.query({
            query: () => '/products'
        }),
        addProduct: builder.mutation({
            query: (body) => ({
                url: '/products',
                method: 'POST',
                body
            })
        })
    })
})

// Export the auto-generated hook for the `getPosts` query endpoint
export const { useGetProductsQuery, useAddProductMutation } = apiSlice