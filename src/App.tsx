import React from 'react';
import {ProductList} from "./components/ProductList";
import {Navbar} from "./components/Navbar/Navbar";
import {Provider} from "react-redux";
import {store} from "./app/store";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {Cart} from "./components/Cart/Cart";
import {Error404} from "./components/Error404/Error404";
import styles from "./App.module.css";

function App() {
    return (
        <div className={styles.App}>
            <Provider store={store}>
                <BrowserRouter>
                <Navbar/>
                    <Routes>
                        <Route path={"/"} element={<Navigate to="/Products"/>}/>
                        <Route path ="/Products" element={<ProductList/>}/>
                        <Route path ="/Cart" element={<Cart/>}/>
                        <Route path ={'/*'} element={<Error404/>}/>
                    </Routes>
                </BrowserRouter>
            </Provider>
        </div>
    );
}

export default App;