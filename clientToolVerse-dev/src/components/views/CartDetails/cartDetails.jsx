import style from "./cartDetails.module.css";
import empty from "../img/emptyTrolley.gif";
import vaciar from "../img/vaciar.png";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useNavigate } from "react-router-dom";
import MiniProduct from "../MiniProduct/miniProduct";
import { useDispatch } from "react-redux";
import * as actions from "../../../redux/actions";
import React, { useEffect, useState } from "react";
import loadingGear from "../img/Spin-1s-200px.gif";
import Swal from "sweetalert2";

export default function CartDetails({ cartError, setCartError }) {
  const trolley = useSelector((state) => state.itemCart);
  const userId = useSelector((state) => state.user.id)
  const address = useSelector((state) => state.address)
  const selectedAddress = useSelector((state) => state.addressSelected)
  console.log('la address seleccionada en el cartDetail', selectedAddress)
  const actualUser = useSelector((state) => state.actualUser);
  console.log('el actual user', actualUser)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState("");


  useEffect(() => {
    const calculateTotal = () => {
      let suma = 0;
      trolley.forEach((product) => {
        suma = suma + product.price * product.quantity;
      });
      suma = parseFloat(suma.toFixed(2));
      return setTotal(suma);
    };
    try {
      calculateTotal();
      if (!address) dispatch(actions.getShippingAddressByUserId(userId));
    } catch (error) {
      console.log("Error al calcular el total", error);
    }
  }, [selectedAddress, address, dispatch, userId, trolley]);

  const continuePurchase = async () => {
    try {
      if (!selectedAddress && !actualUser) {
        // activa el loader
        //setLoading(true);
        alert('Por favor verifica que toda la información sea correcta')
        return
      }
      // si ya he clickeado no hace nada
      if (loading) return;


      // Por un lado crea el carrito de compras -> necesito el userId! y obtengo el purchaseCartId
      const purchaseCartId = await dispatch(actions.createCartBdd(userId));

      // Por el otro carga los productos en el carrito
      // crea un array de objetos con los productos
      let productsTrolley = [];
      trolley.forEach((product) => {
        let productoABDD = {
          productId: product.id,
          quantity: product.quantity,
        };
        productsTrolley.push(productoABDD);
      });

      // enviar el array de productos y el purchaseCartId -> necesito saber que el carrito está listo para seguir adelante
      const carritoListo = await dispatch(actions.addDetail(purchaseCartId, productsTrolley));

      // Nos lleva a la página siguiente una vez que el carrito esté listo
      if (carritoListo && selectedAddress) {
        // desactiva el loader
        setLoading(false);

        setCartError(true)

        // nos lleva a la siguiente página
        navigate("/purchaseCartDisplay");
      }

    } catch (error) {
      console.log('Errores al crear el carrito y los detalles', error);
    }
  };

  const deleteTrolley = () => {
    Swal.fire({
      title: "Eliminar productos",
      text: "Esto eliminará TODOS los productos en el carrito. ¿Deseas continuar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(actions.deleteTrolley());
        Swal.fire("Eliminado", "Los productos han sido eliminados del carrito.", "success");
      }
    });
  };

  return (
    <div className={style.overallDetail}>
      {trolley.length === 0 ? (
        <div className={style.emptyTrolley}>
          <h3>Parece que aún no has colocado nada en la cesta</h3>
          <img
            src={empty}
            alt="The trolley is empty"
            className={style.emptyTrolleyImg}
          />
          <button
            className={style.goShopping}
            onClick={() => navigate('/home')}
          >
            Go Shopping
          </button>
        </div>
      ) : (
        <div className={style.trolleyFull}>
          {trolley.map((product) => {
            return (
              <MiniProduct
                key={product.id}
                id={product.id}
                name={product.name}
                image={product.image}
                model={product.model}
                brand={product.brand}
                price={product.price}
                feature={product.feature}
                quantity={product.quantity}
              />
            );
          })}
          <div className={style.summingTotal}>
            <button className={style.deleteAll}>
              <img src={vaciar} alt="Vaciar el carrito"
                onClick={() => deleteTrolley()} className={style.emptyTrolley} />
            </button>
            <div className={style.total}> Monto total ${total} </div>
            {
              !cartError && actualUser && selectedAddress ? <div>
                {
                  loading ? <div> <img src={loadingGear} alt='Loading resources' /> </div>
                    : <div className={style.button}>
                      <input
                        type="submit"
                        value="Continúa con tu compra"
                        onClick={() => continuePurchase()}
                      />
                    </div>
                }

              </div>

                : <div className={style.errorAddress}> Para avanzar con tu compra, por favor completa tus datos </div>
            }
          </div>
        </div>

      )}
    </div>
  );
}

