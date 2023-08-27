import style from './purchaseOrder.module.css';
import { useSelector } from "react-redux/es/hooks/useSelector";
import mercadoPago from '../img/MercadoPago.jpeg';
import axios from "axios";
import { CheckoutButton } from "../Paypal/CheckoutButton";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../../../redux/actions";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'
import { useNavigate } from 'react-router-dom';

export default function PurchaseOrder() {
    var doc = new jsPDF('p', 'pt');
    const dispatch = useDispatch();
    const trolley = useSelector((state) => state.itemCart);
    const actualUser = useSelector((state) => state.actualUser);
    const [total, setTotal] = useState("");
    const [pagos, setPagos] = useState(false)
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state.isAuthenticated);

    // useEffect para escuchar los cambios en actualUser
  useEffect(() => {
    if (!actualUser.country || !actualUser.state || !actualUser.city || !actualUser.address || !actualUser.postalCode) {
      dispatch(actions.getShippingAddressByUserId(actualUser.id));
    }
  }, [actualUser, dispatch]);


    const calculateTotal = () => {
        let suma = 0;
        trolley.forEach((product) => {
            suma = suma + product.price * product.quantity;
        });
        suma = parseFloat(suma.toFixed(2));
        return suma;
    };

    useEffect(() => {
        try {
            const totalAmount = calculateTotal();
            setTotal(totalAmount);
        } catch (error) {
            console.log("Error al calcular el total", error);
        }
    }, [total]);

    const handleMP = () => {
        axios.post('http://localhost:3001/payment', trolley.map((e) => e)).then((res) => window.location.href = res.data.response.body.init_point);
        setPagos(false)
    }

    const exitStock = () => {
        trolley.forEach((product) => {
            const productId = product.id;
            const quantity = product.quantity;
            dispatch(actions.registerStockExit(productId, quantity)); // Registramos la salida del stock
            const newStock = product.stock - quantity; // Calculamos el nuevo stock después de la compra
            dispatch(actions.updateProductStock(productId, newStock)); // Actualizamos el stock en el estado global
        });
    };

    const createPdf = () => {
        doc.setFontSize(24);
        doc.setFont("helvetica", "bold");
        doc.text(20, 40, "TOOLVERSE - Orden de Compra");

        doc.setFont("courier", "normal");
        doc.setFontSize(18);
        doc.text(20, 80, "Envío a:");
        doc.setFontSize(14);
        doc.text(20, 100, "" + actualUser.firstName + " " + actualUser.lastName);
        doc.text(20, 120, "" + actualUser.email + "  Teléfono: " + actualUser.phone);
        doc.text(20, 160, "" + actualUser.address + " " + actualUser.postalCode);
        doc.setFontSize(12);
        doc.text(20, 180, "" + actualUser.city + ". " + actualUser.state + ". " + actualUser.country);
        doc.setFont("courier", "bold");
        doc.setFontSize(14);
        doc.text(340, 220, "Total a pagar: $" + total)

        var data = []
        trolley.forEach((element) => {
            let product = {
                id: element.id,
                product: element.name,
                quantity: element.quantity,
                price: element.price,
            }
            data.push(product)
        })

        autoTable(doc, {
            margin: { top: 240 },
            body: data,
            columns: [
                { header: 'id', dataKey: 'id' },
                { header: 'Producto', dataKey: 'product' },
                { header: 'Cantidad', dataKey: 'quantity' },
                { header: 'Precio', dataKey: 'price' },
            ],
        })

        doc.save("ToolVersePurchaseOrder.pdf")
    }


    const confirm = () => {
        //comentario: control de stock -> esto se va a mover en el futuro al punto en el que el pago esté hecho
        exitStock();

        //comentario: crea un Detalle de Compra que va a ser asociado al carrito creada antes

        //Comentario: para renderizar las plataformas de pago -> debería ver si la(s) PurchaseDetail están asociadas al carrito -> eso ocurre una vez que hemos confirmado la compra
        setPagos(true)
    }

       // Verificamos si el usuario está autenticado, si no lo está, lo redirigimos a /login
       if (!isAuthenticated) {
        navigate("/login");
        return null;
    }

    return (
        <div className={style.overallCompra}>
            {trolley.length === 0 ? <div>Aún no has hecho ninguna compra </div>
                : <div>
                    <h1 className={style.titulo}>Confirmando Compra:</h1>
                    <div>
                        <div className={style.detallesTotal}>
                            <div className={style.userDetails}>
                                <h4>Envío a:</h4>
                                <div>Nombre: {actualUser.firstName}</div>
                                <div>Apellido: {actualUser.lastName}</div>
                                <div>Email: {actualUser.email}</div>
                                <div>Teléfono: {actualUser.phone}</div>
                                <div>Dirección postal: </div>
                                <div>País: {actualUser.country}</div>
                                <div>Estado: {actualUser.state}</div>
                                <div>Ciudad: {actualUser.city}</div>
                                <div>Calle: {actualUser.address}</div>
                                <div>CP: {actualUser.postalCode}</div>
                            </div>
                            <div>

                                {
                                    trolley.map((product) => {
                                        return (
                                            <div key={product.id} className={style.prodDetails}>
                                                <div className={style.nameImgMini}>
                                                    <div className={style.nameMiniProd}>{product.name}</div>
                                                    <img src={product.image} alt="producto" className={style.imgProd} />
                                                </div>
                                                <div className={style.brandModelMini}>
                                                    <div className={style.brandMiniProd}>{product.brand}</div>
                                                    <div className={style.modelMiniProd}>{product.model}</div>
                                                </div>
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
                                value="Create PDF"
                                onClick={() => createPdf()}
                            />
                        </div>

                        <div className={style.button}>
                            <input
                                type="submit"
                                value="Confirma la Compra"
                                onClick={() => confirm()}
                            />
                        </div>

                        {
                            pagos && <div className={style.metPago}>
                                <h2 className={style.elige}>Elige tu Método de Pago</h2>
                                <div className={style.toPay}>
                                    <button onClick={() => handleMP()} className={style.buttonPay}>
                                        <img src={mercadoPago} alt="Mercado Pago" className={style.mercadoPago} />
                                    </button>

                                    <div className={style.buttonPay}>
                                        <CheckoutButton totalAmount={total} />
                                    </div>

                                </div>
                            </div>
                        }

                    </div>
                </div>
            }
        </div>
    )
}
