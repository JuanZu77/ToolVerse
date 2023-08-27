import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import style from "./Detail.module.css";
import { addToCart, getToolById } from "../../../redux/actions";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import ReviewPage from "../../Review/ReviewPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as actions from "../../../redux/actions";

const Detail = () => {
  const products = useSelector((state) => state.toolsDetail);
  const user = useSelector((state) => state.user);
  const reviews = user?.reviews;
  const dispatch = useDispatch();
  const { id } = useParams();
  const [prodInCart, setProdInCart] = useState(false)

  useEffect(() => {
    try {
      dispatch(getToolById(id));
    } catch (error) {
      console.log("Error al obtener los datos del producto:", error);
    }
  }, [dispatch, id]);

  // const findReview = reviews.find(
  //   (review) => review.productId === parseInt(id)
  // );
  const findReview = reviews ? reviews.find(
    (review) => review.productId === parseInt(id)
  ) : null;
  

  useEffect(() => {
    const userDidBuyProd = async () => {
      if (!user) return; // Verifica si el usuario existe antes de continuar

      // el user id
      const userId = user?.id

      try {
        // obtengo los datos del user por userId
        const usuario = await dispatch(actions.getUserById(userId))

        // obtengo los cartIds que tenga
        const userCarts = usuario?.purchaseCarts

        let productosPorIdArray = []
        // por cada carrito busco los idProd de cada carrito -> los pusheo en un array para poder compararlos con el id de producto actual
        for (const cart of userCarts) {
          const productos = await dispatch(actions.getProductsInCart(cart.id));

          productos.forEach((prod) => {
            productosPorIdArray.push(prod.productId);
          });
        }

        const idNumero = Number(id)

        if (productosPorIdArray.includes(idNumero)) setProdInCart(true)
      } catch (error) {
        console.log('Error verificando si el user compró el producto', error)
      }
    };

    userDidBuyProd();
  }, [])

  if (!products) return <div>Esperando carga del producto...</div>;


  return (
    <div className={style.datailReview}>
      <div className={style.detailContainer}>
        <div className={style.imageContainer}>
          <img src={products.image} alt={products.name} />
        </div>
        <div className={style.infoContainer}>
          <h1>{products.name}</h1>
          <br></br>
          <h3>Marca: {products.brand}</h3>

          <p>
            <b>Modelo:</b> {products.model}
          </p>

          <div>
            <span className={style.block}>
              <b>Características: </b>
            </span>{" "}
            {products.feature}
          </div>
          <h4>Precio ${products.price}</h4>
          <br></br>
          <button
            className={style.addToCart}
            onClick={() => dispatch(addToCart(products))}
          >
            <b>Añadir al carrito</b>
          </button>
        </div>

      </div>
      <div className={style.reviewComp}>
        {findReview ? (
          <div>
            <div>
              {[1, 2, 3, 4, 5].map((star) => (
                <FontAwesomeIcon
                  key={star}
                  icon={star <= findReview.score ? solidStar : regularStar}
                />
              ))}
            </div>
            <textarea value={findReview.comments} disabled />
          </div>
        ) : (
          prodInCart && <ReviewPage productId={id} />
        )}
      </div>
    </div>

  );
};

export default Detail;
