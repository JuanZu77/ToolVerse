import React, { useState, useRef, /*useEffect*/ } from "react";
import { CSSTransition } from "react-transition-group";
import styles from "./userLogin.module.css";
import userIcon from "./userLogin.png";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { cerrarSesion } from "../../../redux/actions";

export default function UserLogin() {
  const [isUserMenuVisible, setUserMenuVisibility] = useState(false);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const dispatch = useDispatch();

  const handleMenuItemClick = (destination) => {
    setUserMenuVisibility(false);
    navigate(destination);
  };

  const showUserMenu = () => {
    setUserMenuVisibility(true);
  };

  const hideUserMenu = () => {
    setUserMenuVisibility(false);
  };

  const handleLogout = () => {
    dispatch(cerrarSesion());
  };

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     navigate("/login");
  //   }
  // }, [isAuthenticated, navigate]);

  console.log ('userLogin, se envio cierre de sesion, autenticacion es:',isAuthenticated)

  return (
    <div
      className={styles.userLogin}
      onMouseEnter={showUserMenu}
      onMouseLeave={hideUserMenu}
    >      
      <img src={userIcon} alt="User Icon" className={styles.UserIcon} />
      <CSSTransition
        in={isUserMenuVisible}
        timeout={350}
        classNames="UserMenuAnimation"
        unmountOnExit
        nodeRef={userMenuRef}
      >
        <div className={styles.UserMenu} ref={userMenuRef}>
          {isAuthenticated ? ( 
            <>            
              <button onClick={() => handleMenuItemClick("/userProfile")}>Panel de Usuario</button>
              <button onClick={handleLogout}>Cerrar Sesión</button>
            </>
          ) : (
           
            <>
              <button onClick={() => handleMenuItemClick("/login")}>Cliente</button>
            </>
          )}
        </div>
      </CSSTransition>
    </div>
  );
}
