import styles from './Product.module.css';
import {addToCart, removeItem} from "../../features/cart/cartSlice";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../app/store";

export interface IProduct {
    id: number;
    title: string;
    price: number;
    category: string;
    description: string;
    image: string;
}

export const Product = ({product}: { product: IProduct }) => {
    // useDispatch send actions
    const dispatch = useDispatch<AppDispatch>()

    // useSelector read data from the store
    const count = useSelector((state: RootState) =>
        state.cart.items.find((item) => item.id === product.id))?.quantity

    const handleAddToCart = () => {
        dispatch(addToCart(product.id))
    }
    const handleRemoveItem = () => {
        dispatch(removeItem(product.id))
    }
    return (
        <div key={product.id} className={styles.card}>
            <img src={product.image} className={styles.img} alt='product'/>
            {product.title.length > 38 ?
                <div className={styles.productTitle}>{product.title.substring(0, 37) + "..."}</div> :
                <div className={styles.productTitle}>{product.title}</div>}
            <div className={styles.price}>{product.price}$</div>
            <button className={styles.btn}
                    onClick={handleAddToCart}
            >Add to cart
            </button>
            <div className={styles.addRemoveMenu}>
                <button  className={styles.btnAddRemove} onClick={handleAddToCart}>+</button>
                <span className={styles.span}>{count}</span>
                <button className={styles.btnAddRemove} onClick={handleRemoveItem}>–</button>
            </div>
        </div>
    )
}