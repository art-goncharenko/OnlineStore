import {createSelector} from "@reduxjs/toolkit";
import {AppDispatch, RootState} from "../../app/store";
import {IProduct} from "../Product/Product";
import {useDispatch, useSelector} from "react-redux";

import styles from './CartItem.module.css';
import {addToCart, removeItem} from "../../features/cart/cartSlice";

export const CartItem = ({id}: { id: number }) => {

    const dispatch = useDispatch<AppDispatch>()

    const getProductByIdSelector = (id: number) => {
        return createSelector((state: RootState) => state?.api?.queries?.['getProducts("")']?.data as IProduct[],
            (products) => {
                return products?.find((item) => item.id === id)
            })
    }

    const product = useSelector(getProductByIdSelector(id))

    const count = useSelector((state: RootState) =>
        state.cart.items.find((item) => item.id === id))?.quantity

    const totalItemPrice = useSelector((state: RootState) => {
        const price = product?.price as number
        const count = state.cart.items.find((item) => item.id === id)?.quantity as number
        return (price * count).toFixed(2)
    })

    const handleAddToCart = () => {
        dispatch(addToCart(id))
    }
    const handleRemoveItem = () => {
        dispatch(removeItem(id))
    }
    return (
        <div className={styles.itemCard}>
            <div className={styles.spacer}/>
            <div className={styles.image}>
                <img src={product?.image} alt="productPhoto"></img>
            </div>
            <div className={styles.productDetails}>
                <div className={styles.productTitle}>{product?.title}</div>
                <br/>
                <p className={styles.productDescription}>{product?.description}</p>
            </div>
            <div className={styles.productPrice}>{product?.price}$</div>
            <div className={styles.addRemoveMenu}>
                <button onClick={handleAddToCart} className={styles.btnAddRemove}>+</button>
                <span className={styles.span}>{count}</span>
                <button onClick={handleRemoveItem} className={styles.btnAddRemove}>–</button>
            </div>
            <div className={styles.productTotal}>{totalItemPrice}$</div>
        </div>
    )
}