import style from './purchaseCartDisplay.module.css';
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { CheckoutButton } from "../Paypal/CheckoutButton";
import mercadoPago from '../img/MercadoPago.jpeg';
import React, { useEffect, useState } from 'react';
import loadingGear from "../img/Spin-1s-200px.gif"

// este componente va a renderizar lo que obtenga de la BDD al buscar el purchaseCartId y sus detalles
// permite realizar la compra -> lo que genera la purchaseOrder

export default function PurchaseCartDisplay() {
    const [pagos, setPagos] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state.isAuthenticated);
    const actualUser = useSelector((state) => state.actualUser);
    const selectedAddress = useSelector((state) => state.addressSelected);

    const trolley = useSelector((state) => state.itemCart);

    // Verificamos si el usuario está autenticado, si no lo está, lo redirigimos a /login
    useEffect(() => {
        if (actualUser && selectedAddress) setLoading(false)
        else setLoading(true)

    }, [actualUser, selectedAddress]);

    if (!isAuthenticated) {
        navigate("/login");
        return null;
    }


    const calculateTotal = () => {
        let suma = 0;
        trolley.forEach((product) => {
            suma = suma + product.price * product.quantity;
        })
        suma = parseFloat(suma.toFixed(2));
        return suma;
    }

    const total = calculateTotal();

    const handleMP = () => {
        setLoading(true);
        axios.post('/payment', trolley.map((e) => e)).then((res) => window.location.href = res.data.response.body.init_point);
    }

    return (
        <div>
            {
                loading ? <div> <img src={loadingGear} alt='Loading resources' /> </div>
                    : <div className={style.overallCompra}>
                        {trolley.length === 0 ? <h1>Aún no has hecho ninguna compra </h1>
                            : <div>
                                <h1 className={style.titulo}>Confirmando Compra:</h1>
                                <div className={style.detallesTotal}>
                                    <div className={style.userDetails}>
                                        <h4>Envío a:</h4>
                                        <div>Nombre: {actualUser.firstName}</div>
                                        <div>Apellido: {actualUser.lastName}</div>
                                        <div>Email: {actualUser.email}</div>
                                        <div>Teléfono: {actualUser.phone}</div>
                                        <h4>Dirección postal: </h4>
                                        <div>País: {selectedAddress.country}</div>
                                        <div>Estado: {selectedAddress.state}</div>
                                        <div>Ciudad: {selectedAddress.city}</div>
                                        <div>Calle: {selectedAddress.address}</div>
                                        <div>CP: {selectedAddress.postalCode}</div>
                                    </div>

                                    <div>
                                        <h2> Producto(s): </h2>
                                        {
                                            trolley.map((product) => {
                                                return (
                                                    <div className={style.prodDetails}>
                                                        <div className={style.nameMiniProd}>{product.name}</div>
                                                        <div className={style.priceMiniProd}>${product.price}</div>
                                                        <div>Cantidad: {product.quantity}</div>
                                                    </div>
                                                )

                                            })
                                        }
                                        <h2 className={style.total}> Total: ${total}</h2>
                                    </div>
                                </div>
                                <div className={style.button}>
                                    <input
                                        type="submit"
                                        value="Elige tu Método de Pago"
                                        onClick={() => setPagos(true)}
                                    />
                                </div>

                                {
                                    pagos && <div className={style.metPago}>
                                        <div className={style.toPay}>
                                            {
                                                loading ? <div> <img src={loadingGear} alt='Loading resources' /> </div>

                                                    : <div className={style.paymentsMet}>
                                                        <button onClick={() => handleMP()} className={style.buttonPay}>
                                                            <img src={mercadoPago} alt="Mercado Pago" className={style.mercadoPago} />
                                                        </button>
                                                        <div className={style.checkOutbtn}>
                                                            <CheckoutButton totalAmount={total} trolley={trolley} />
                                                        </div>

                                                    </div>
                                            }
                                        </div>
                                    </div>
                                }
                            </div>
                        }
                    </div>
            }
        </div>

    )

}