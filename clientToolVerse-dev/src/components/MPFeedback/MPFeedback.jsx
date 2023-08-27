import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import style from "./MPFeedback.module.css";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import * as actions from "../../redux/actions";
import loadingGear from "../views/img/Spin-1s-200px.gif"
import generatePdf from "../GeneratePdf/generatePdf";
import successPay from "../views/img/successPay.jpeg"

const MPFeedback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const userId = user.id
  const shippingAddress = useSelector((state) => state.addressSelected)
  const shippingAddressId = shippingAddress.id

  const paymentMethodId = 1 // queda en 1 porque este componente se renderiza desde MercadoPago 
  const [loading, setLoading] = useState(true)

  const queryParams = new URLSearchParams(location.search);

  const [purchaseCartId, setPurchaseCartId] = useState('');
  const [trolley, setTrolley] = useState([]);

  const idPago = queryParams.get("payment_id");
  const formaPago = 'Mercado Pago';
  const status = queryParams.get("status");
  const orderId = queryParams.get("merchant_order_id");

  useEffect(() => {
    const getInfo = async () => {
      try {
        let purchaseCartId = await dispatch(actions.getLastPuchasteCart(userId));
        let trolley = await dispatch(actions.getProductsInCart(purchaseCartId));

        setPurchaseCartId(purchaseCartId);
        setTrolley(trolley)

        if (shippingAddressId) setLoading(false);

      } catch (error) {
        console.log('Error buscando la información', error)
      }
    }
    getInfo()
  }, [dispatch, userId, shippingAddressId]);

  useEffect(() => {
    const exitStock = () => {
      trolley.forEach((product) => {
        const productId = product.id;
        const quantity = product.quantity;
        dispatch(actions.registerStockExit(productId, quantity)); // Registramos la salida del stock
        const newStock = product.stock - quantity; // Calculamos el nuevo stock después de la compra
        dispatch(actions.updateProductStock(productId, newStock)); // Actualizamos el stock en el estado global
      });
    };

    const calculateTotal = () => {
      let suma = 0;
      trolley.forEach((product) => {
        suma = suma + product.product.price * product.quantity;
      });
      suma = parseFloat(suma.toFixed(2));
      return suma;
    };

    // para que se eliminen los productos en el carrito que acaba de ser pagado, se modifique el stock y se cree la orden de compra en la base de datos
    const axnsFinales = () => {
      try {
        // calculo el total de la compra
        const total = calculateTotal();

        // se crea la orden de compra en la base de datos
        dispatch(actions.addPurchaseOrder(userId, purchaseCartId, shippingAddressId, paymentMethodId, total))

        // registra la salida del Stock -> esto sí ocurre exitosamente
        exitStock();

        // elimina el carrito del estado de redux 
        dispatch(actions.deleteTrolley())
      }
      catch (error) {
        console.log('Error al realizar las axnsFinales', error)
      }
    }

    if (!loading && trolley?.length > 0 && userId && purchaseCartId && shippingAddressId) {
      axnsFinales();
    }
  }, [dispatch, loading, purchaseCartId, shippingAddressId, trolley, userId]);

  console.log('el carrito despues de todo el codigaso', trolley)

  return (
    <div>
      {
        loading ? <div> <img src={loadingGear} alt='Loading resources' /> </div>

          : <div className={style.successPay}>
            <div> <img src={successPay} alt='Pago exitoso' className={style.successPayImg} /> </div>
            <div className={style.containerFeedback}>
              <h1>Detalle del pago</h1>
              <ul>
                <li>ID de pago: {queryParams.get("payment_id")}</li>
                {/* <li>Forma de pago: {queryParams.get("payment_type")}</li>
                <li>Estado: {queryParams.get("status")}</li> */}
                <li>Numero de orden: {queryParams.get("merchant_order_id")}</li>

                <div className={style.userDetails}>
                  <h4>Envío a:</h4>
                  <div>Nombre: {user.firstName} {user.lastName}</div>
                  <div>Email: {user.email} Teléfono: {user.phone}</div>

                </div>
                <div className={style.shippingDetails} >
                  <h4>Dirección postal: </h4>
                  <div>{shippingAddress.address}, {shippingAddress.city}</div>
                  <div>{shippingAddress.postalCode}, {shippingAddress.state}, {shippingAddress.country}</div>
                </div>

                <div className={style.productDetails}>
                  <h4>Producto(s):</h4>
                  {
                    trolley?.map((product) => {
                      return (
                        <div>
                          <div>Product: {product.product.name}</div>
                          <div>Cantidad: {product.quantity}</div>
                          <div>Precio: {product.product.price}</div>
                        </div>
                      )
                    })
                  }
                </div>
              </ul>
              <div className={style.buttons}>
                <button className={style.backHome} onClick={() => generatePdf(user, shippingAddress, trolley, idPago, formaPago, status, orderId)}>
                  Guarda el Detalle
                </button>
                <button className={style.backHome} onClick={() => navigate("/home")}>Volver al Home</button>
              </div>
            </div>
          </div>
      }
    </div>
  );
};

export default MPFeedback;
