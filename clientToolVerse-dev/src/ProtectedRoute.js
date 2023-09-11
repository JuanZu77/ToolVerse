import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...routeProps }) => {
  const { isAuthenticated, user } = useSelector((state) => state);

  if (!isAuthenticated) {
    // Si no está autenticado, redirige a la página de inicio de sesión.
    return <Navigate to="/login" />;
  }

  if (user?.role !== "admin") {
    // Si está autenticado pero no es un administrador, redirige a la página de error.
    return <Navigate to="/error" />;
  }

  // Si está autenticado y es un administrador, muestra el componente.
  return <Component {...routeProps} />;
};

export default ProtectedRoute;



