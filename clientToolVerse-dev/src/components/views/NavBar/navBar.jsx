import React from "react";
import style from './navBar.module.css';
import { useNavigate } from 'react-router-dom';
import UserLogin from "../UserLogin/userLogin";
import logoHome from './LogoPng.png';
import logoCart from './logoCart.png';
import SearchBar from '../SearchBar/searchBar';

export default function Nav() {
    const navigate = useNavigate();

    return (
        <div className={style.navBar}>
            <button className={style.toHome} onClick={() => navigate('/home')}> <img src={logoHome} alt="logoHome" className={style.toHome} /> </button>
            <SearchBar className={style.searchBar} />
            <div className={style.logOnCart}>
                <div className={style.registerLogOn}>
                    <button className={style.register} onClick={() => navigate('/form')}> Registro </button>

                </div>
                <button className={style.cartBtn} onClick={() => navigate('/cart')}> <img src={logoCart} alt="logoCart" className={style.cartBtnImg} /> </button>
                <UserLogin className={style.userLogin} />
            </div>
        </div>
    )
}