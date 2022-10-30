import styles from './Navbar.module.css';
import {BsCart2} from "react-icons/bs";
import {IconContext} from "react-icons";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {IProduct} from "../Product/Product";
import {Link} from "react-router-dom";
import {useGetProductsQuery} from "../../features/api/apiSlice";

export const Navbar = () => {
    const {data} = useGetProductsQuery('')

    const totalCount = useSelector((state: RootState) => {
        let totalAmount = 0;
        state.cart.items.forEach((el) => {
            totalAmount += el.quantity
        })
        return totalAmount;
    })

    const totalPrice = useSelector((state: RootState) => {
        return state.cart.items.reduce((sum, cur) => {
            const price = data?.find((item:IProduct) => item?.id === cur?.id)?.price as number
            return sum + cur.quantity * price
        }, 0).toFixed(2)
    })

    return (
        <div className={styles.navbar}>
            <Link to='/' className={styles.home}>AmazingShop</Link>
            <div>
                <IconContext.Provider value={{size: "2em", className: "cartIcon"}}>
                    <Link to="/Cart" className={styles.cartLink}> <BsCart2 className={styles.cartIcon}/></Link>
                    <span className={styles.totalQuantity}>{totalCount}</span>
                    <span className={styles.totalPrice}>{totalPrice}$</span>
                </IconContext.Provider>
            </div>
        </div>

    )
}