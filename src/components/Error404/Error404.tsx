import styles from './Error404.module.css'
import {Link} from "react-router-dom";

export const Error404 = () => {
    return (
        <div className={styles.error404}>
            <div>
                Error 404
            </div>
            <p>The page you are looking for does not exist. How you got here is a mystery.<br/> Click the button below to
            get back to the homepage</p>
            <Link to='./'><button className={styles.btn}>Go to homepage</button></Link>
        </div>
    )
}