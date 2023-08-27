import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./MyShopping.module.css";
import { useDispatch } from "react-redux";
import * as actions from "../../../../redux/actions";

const MyShopping = () => {
  const dispatch = useDispatch();
  const [purchaseHistory, setPurchaseHistory] = useState([]);


  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    axios
      .get("/purchaseOrder")
      .then((response) => {
        const ordersArr = response.data
        const obtengoProds = async () => {
          console.log('el ordersArr es un array', ordersArr)
          try {
            let datosTotales = []
            // obtengo los purchaseCartId en el array de History
            for (const order of ordersArr) {
              console.log('la orden', order)
              let purchaseCartId = order.purchaseCartId
              console.log('tengo el purchaseCartId', purchaseCartId)
              const productos = await dispatch(actions.getProductsInCart(purchaseCartId))
              console.log('los productos en el cart', productos)

              let prodFinal = productos.map((prod) => {
                let name = prod.product.name
                let quantity = prod.quantity
                let obj = {
                  name,
                  quantity
                }
                return obj
              })

              console.log('el array de los objetos', prodFinal)

              let orderObj = {
                orderId: order.id,
                productos: prodFinal,
                total: order.total,
                fecha: formatDate(order.createdAt)
              }

              console.log('el objeto para sumarlo al array', orderObj)
              datosTotales.push(orderObj)

            }
            setPurchaseHistory(datosTotales)
            console.log('la purchaseCartHisrtory', purchaseHistory)
          } catch (error) {
            console.log('Error buscando los productos del user', error)
          }
        }
        obtengoProds()
      })
      .catch((error) => {
        console.log("Error al obtener el historial de compras:", error);
      });
  }, []);

  return (
    <div>
      <div className={styles.title}>
        <h1>Historial de Compras</h1>
      </div>
      <div className={styles.purchaseContainer}>
        {purchaseHistory.length > 0 ? (
          purchaseHistory.map((purchase) => (
            <div className={styles.purchaseItem} key={purchase.id}>
              <p><b>Compra ID: </b> {purchase.orderId}</p>
              <p><b>Fecha: </b> {purchase.fecha}</p>
              <p><b>Producto(s): </b></p>
              {
                purchase.productos.map((prod) => {
                  return (
                    <div>
                      <p><b>Producto: </b>{prod.name}</p>
                      <p><b>Cantidad: </b>{prod.quantity}</p>
                    </div>
                  )
                })
              }
              <p><b>Total: </b> {purchase.total}</p>
            </div>
          ))
        ) : (
          <p>No hay compras registradas</p>
        )}
      </div>
    </div>
  );
};

export default MyShopping;