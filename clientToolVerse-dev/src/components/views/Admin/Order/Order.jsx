import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder, getOrders } from "../../../../redux/actions";
import styles from "./Order.module.css";
//import { useNavigate } from "react-router-dom";

const Order = () => {
  //const navigate = useNavigate()
  const dispatch = useDispatch();
  const orders = useSelector(state => state.orders);
  console.log(orders);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const handleDeleteOrder = (orderId) => {
    dispatch(deleteOrder(orderId)); 
  };

  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Telefono</th>
            <th>N° Orden</th>
            <th>Precio</th>
            <th>paymentMethod</th>
            <th>Direccion</th>
            <th>Pais</th>
            <th>Accion</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.user.firstName}</td>
              <td>{order.user.phone}</td>
              <td>{order.id}</td>
              <td>{order.total}</td>
              <td>{order.paymentMethod.name}</td>
              <td>{order.shippingAddress.address}</td>
              <td>{order.shippingAddress.country}</td>
              <td>
                <>
                <button onClick={() => handleDeleteOrder(order.id)}>Eliminar</button>
                </>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Order;
