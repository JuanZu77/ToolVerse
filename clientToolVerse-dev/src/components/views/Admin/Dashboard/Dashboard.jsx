import React, { useState } from "react";
import styles from "./Dashboard.module.css";

// Importa los componentes que deseas mostrar en el Dashboard
import ProductsList from "../ProductsList/ProductsList";
import EditProducts from "../EditProducts/EditProducts";
import CreateProduct from "../CreateProduct/CreateProduct";
import User from "../User/User";
import Order from "../Order/Order";

const Dashboard = () => {
  const [active, setActive] = useState("ListaProductos"); // Establece la opción activa por defecto

  const handleButtonClick = (activeValue) => {
    setActive(activeValue);
  };

  // Mapea los nombres de las opciones a los componentes correspondientes

  return (
    <div className={styles.menuContainer}>
      <div className={styles.dashContainer}>
        <div className={styles.secondaryContainer}>
          <h3 style={{ paddingTop: "2rem", fontSize: "24px"}}>MENU</h3>
          <button
            className={`${styles.customButton} ${
              active === "ListaProductos" ? styles.activeComponent : ""
            }`}
            onClick={() => handleButtonClick("ListaProductos")}
          >
            Lista de Productos
          </button>
          <button
            className={`${styles.customButton} ${
              active === "EditarProductos" ? styles.activeComponent : ""
            }`}
            onClick={() => handleButtonClick("EditarProductos")}
          >
            Editar Productos
          </button>
          <button
            className={`${styles.customButton} ${
              active === "CrearProducto" ? styles.activeComponent : ""
            }`}
            onClick={() => handleButtonClick("CrearProducto")}
          >
            Crear Productos
          </button>
          <button
            className={`${styles.customButton} ${
              active === "Usuarios" ? styles.activeComponent : ""
            }`}
            onClick={() => handleButtonClick("Usuarios")}
          >
            Usuarios
          </button>
          <button
            className={`${styles.customButton} ${
              active === "OrdenesCompra" ? styles.activeComponent : ""
            }`}
            onClick={() => handleButtonClick("OrdenesCompra")}
          >
            Ordenes de Compra
          </button>
        </div>
        <div className={styles.contentContainer}>
          {/* Renderiza el componente correspondiente */}
          {active === "ListaProductos" && <ProductsList />}
          {active === "EditarProductos" && <EditProducts />}
          {active === "CrearProducto" && <CreateProduct />}
          {active === "Usuarios" && <User />}
          {active === "OrdenesCompra" && <Order />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

