import React, { useEffect, useState } from "react";
import axios from "axios";
import style from "./MyShopping.module.css";
import { useDispatch } from "react-redux";
import * as actions from "../../../../redux/actions";

const MyShopping = () => {
  const dispatch = useDispatch();
  const [purchaseHistory, setPurchaseHistory] = useState([]);


  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
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
      <div className={style.title}>
        <h1>Historial de Compras</h1>
      </div>
      <div className={style.purchaseContainer}>
        {purchaseHistory.length > 0 ? (
          purchaseHistory.map((purchase) => (
            <div className={style.purchaseItem} key={purchase.id}>
              <table className={style.purchaseTable}>
                <thead>
                  <tr>
                    <th>Compra ID</th>
                    <th>Fecha</th>
                    <th>Producto(s)</th>
                    <th>Cantidad</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{purchase.orderId}</td>
                    <td>{purchase.fecha}</td>
                    <td>
                      {purchase.productos.map((prod) => (
                        <div key={prod.id}>
                          <p>{prod.name}</p>
                        </div>
                      ))}
                    </td>
                    <td>
                      {purchase.productos.map((prod) => (
                        <div key={prod.id}>
                          <p>{prod.quantity}</p>
                        </div>
                      ))}
                    </td>
                    <td>{purchase.total}</td>
                  </tr>
                </tbody>
              </table>
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