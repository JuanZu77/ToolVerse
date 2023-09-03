import React, { useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import styles from "./userLogin.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { cerrarSesion } from "../../../redux/actions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faUser as faUserThin } from "@fortawesome/free-regular-svg-icons";

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

  return (
    <div
      className={styles.userLogin}
      onMouseEnter={showUserMenu}
      onMouseLeave={hideUserMenu}
    >
      {isAuthenticated ? (
        // Usuario logueado: mostrar el icono de usuario logueado
        <FontAwesomeIcon icon={faUser} className={styles.UserIconLoggedIn} />
      ) : (
        // Usuario deslogueado: mostrar el icono de usuario deslogueado
        <FontAwesomeIcon icon={faUserThin} className={styles.UserIcon} />
      )}
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