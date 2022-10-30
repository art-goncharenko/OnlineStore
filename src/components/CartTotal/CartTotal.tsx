import styles from './CartTotal.module.css';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../app/store";
import {IconContext} from "react-icons";
import {ImBin} from "react-icons/im";
import {IProduct} from "../Product/Product";
import {useGetProductsQuery} from "../../features/api/apiSlice";
import {resetCart} from "../../features/cart/cartSlice";

export const CartTotal = () => {
    const {data} = useGetProductsQuery('')
    const dispatch = useDispatch<AppDispatch>()
    const handleResetCart = () => dispatch(resetCart())


    const totalPrice = useSelector((state: RootState) => {
        return state.cart.items.reduce((sum, cur) => {
            const price = data?.find((item:IProduct) => item?.id === cur?.id)?.price as number
            return sum + cur.quantity * price
        }, 0).toFixed(2)
    })

    const totalCount = useSelector((state: RootState) => {
        let totalAmount = 0;
        state.cart.items.forEach((el) => {
            totalAmount += el.quantity
        })
        return totalAmount;
    })

    return (
        <div>
            <div className={styles.spacer}/>
            <div className={styles.remove}>
                <IconContext.Provider value={{size: "1.5em"}}>
                    <ImBin onClick={handleResetCart} className={styles.remove}/>
                    <div onClick={handleResetCart}>Clear cart</div>
                </IconContext.Provider>
            </div>
            <div className={styles.subtotalPrice}>{totalPrice}$</div>
            {(totalCount === 1 ) ?
                (<div className={styles.subtotal}>Subtotal ({totalCount} item):</div>)
                : <div className={styles.subtotal}>Subtotal ({totalCount} items):</div>
            }
            <br/><br/>
            <button className={styles.checkoutBtn}>Checkout</button>
        </div>
    )
}