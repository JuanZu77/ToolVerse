import React from "react";
import style from './navBar.module.css';
import { useNavigate } from 'react-router-dom';
import UserLogin from "../UserLogin/userLogin";
import logoHome from './LOGO_3_toolverse.png';
//import logoCart from './logoCart.png';
import SearchBar from '../SearchBar/searchBar';
import { useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown, faCartShopping} from "@fortawesome/free-solid-svg-icons";

/*faCartArrowDown, faCartFlatbed, faCartFlatbedSuitcase, faCartPlus, faCartShopping, */
export default function Nav() {
    const navigate = useNavigate();
    const trolley = useSelector((state) => state.itemCart);

    return (
    <div className={style.navBar}>

            <button className={style.toHome} onClick={() => navigate('/home')}>
              <img src={logoHome} alt="logoHome" className={style.toHome} /> 
            </button>
           
             <SearchBar className={style.searchBar} />
           
            <div className={style.logOnCart}>
                <div className={style.registerLogOn}>
                            <button className={style.register} onClick={() => navigate('/form')}> Registro </button>
            </div>

                    
                <button className={style.cartBtn} onClick={() => navigate('/cart')}>
                     <FontAwesomeIcon
                     icon={trolley.length > 0 ? faCartShopping : faCartArrowDown}
                    className={`${style.cartBtnIcon} ${trolley.length === 0 ? style.lightCartIcon : ''}`}
                 />
                </button>
                    
              <UserLogin className={style.userLogin} />

            </div>
     </div>
  )
}