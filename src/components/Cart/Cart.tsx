import styles from './Cart.module.css';
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {CartItem} from "../CartItem/CartItem";
import {CartTotal} from "../CartTotal/CartTotal";
import {Link} from "react-router-dom";

export const Cart = () => {

    const cartItems = useSelector((state: RootState) => state.cart.items)

    return (
        <div>
            <h2>Cart</h2>
            <div className={styles.titles}>
                <h3 className={styles.productTitle}>Product</h3>
                <h3 className={styles.priceTitle}>Price</h3>
                <h3 className={styles.quantityTitle}>Quantity</h3>
                <h3 className={styles.totalTitle}>Total</h3>
            </div>
            {cartItems === undefined || cartItems.length === 0 ?
                <div className={styles.emptyCart}>Your cart is empty. Go <Link to="/Products">shopping</Link></div> :
            cartItems.map((product) => {
            return <CartItem key={product.id} id={product.id}/>})}
            <CartTotal/>
        </div>
    )
}