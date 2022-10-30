import styles from './ProductList.module.css'
import {IProduct, Product} from "./Product/Product";
import {productsFetch, setCategory} from "../features/products/productSlice";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../app/store";
import {useEffect} from "react";

const categories = ["all", "electronics", "jewelery", "men's clothing", "women's clothing"]
const categoriesName: { [key in typeof categories[number]]: string } = {
    "all": "All",
    "electronics": "Electronics",
    "jewelery": "Jewelery",
    "men's clothing": "Men's clothing",
    "women's clothing": "Women's clothing",
}

export const ProductList = () => {
    const dispatch = useDispatch<AppDispatch>()
    const products = useSelector((state: RootState) => state.product.products)
    const error = useSelector((state: RootState) => state.product.error)
    const loading = useSelector((state: RootState) => state.product.loading)

    const categoryFilter = useSelector((state: RootState) =>
        state.product.category)

    useEffect(() => {
        dispatch(productsFetch())
    }, [])

    if (loading === "pending") {
        return <p>Loading</p>
    }
    if (error) {
        return <p>{error}</p>
    }

    const handleSetCategory = (category: string) => {
        dispatch(setCategory(category))
    }
    const filteredProducts = products?.filter((product: IProduct) => {
        if (categoryFilter === "all") {
            return true
        }
        return product.category === categoryFilter
    })
    const renderFilteredProducts = () => {
        if (filteredProducts) {
            return filteredProducts.map((product: IProduct) => {
                return <Product key={product.id} product={product}/>
            })
        }
    }

    return (
        <div>
            <div className={styles.topCategory}>
                {categories.map((category) => (
                    <span key={category}
                          onClick={() => handleSetCategory(category)}
                          className={(categoryFilter === category) ? styles.spanCategoryActive : styles.spanCategory }>
                    {categoriesName[category]}</span>))}
            </div>
            <div className={styles.list}>
                {renderFilteredProducts()}
            </div>
        </div>
    )
}