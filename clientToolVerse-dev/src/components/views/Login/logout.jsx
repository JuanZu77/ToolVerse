import React from "react";
import { useDispatch } from "react-redux";
import { cerrarSesion } from "../../../redux/actions";
import { useNavigate } from "react-router-dom";
import Cookie from "js-cookie";

export function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tokenCookie = Cookie.get("token");

  const handleClick = () => {
    dispatch(cerrarSesion(tokenCookie));
    navigate("/home");
  };

  return <button onClick={handleClick}>Cerrar Sesión</button>;
}
