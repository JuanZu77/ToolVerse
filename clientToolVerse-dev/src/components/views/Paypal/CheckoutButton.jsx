import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
//import axios from "axios";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert2";

//TODO: Implementar las siguientes funcionalidades para ocupar PayPal:
// Una vez que el usuario agregue sus productos, mostrar el botón de PayPal en CartDetails solo cuando esté logueado el usuario.✓
// Vincular el monto total con el Sandbox. ✓
// Mostrar alertas visuales en el navegador
// Una vez pagado exitosamente redirigir al panel del usuario ✓

export function CheckoutButton({ totalAmount, trolley }) {
  const clientId = "AXT2dZe66lvqAQgmw-_4zQ9nnuB7kJBEx4bF9ZZqO1Zpq6C64BkJcwm2Ldfcjv3wWYJAmLkeMcKfMxfK";

  const navigate = useNavigate()

  //!si funciona
  const handlePpSuccess = async (data, actions) => {
    try {
      const order = await actions.order.capture();
      console.log("¡Pago realizado exitosamente!", order);

      // Almacena la respuesta de PayPal en el almacenamiento local
    localStorage.setItem('paypal_response', JSON.stringify(order));

      new swal({
        title: "Success",
        text: "¡Pago realizado exitosamente!",
        icon: "success",
        buttons: true,
      })
      .then(() => {
        navigate("/ppfeedback")
      })

    } catch (error) {
      console.log("Ups, hubo un error en tu  pago", error);
      alert("Ups, hubo un error en tu  pago", error);
    }
  };

  

  return (
    <PayPalScriptProvider options={{ "client-id": clientId }}>
      <div>
        <PayPalButtons
        style={{ layout: "horizontal" }}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    currency_code: "USD",
                    value: totalAmount,
                  },
                },
              ],
            });
          }}
          onApprove={(data, actions) => {
            handlePpSuccess(data, actions);
          }}
        />
      </div>
    </PayPalScriptProvider>
  );
};

