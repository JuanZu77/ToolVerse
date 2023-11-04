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
  const reviews = user?.reviews || [];
  const dispatch = useDispatch();
  const { id } = useParams();
  const [prodInCart, setProdInCart] = useState(false);
  //const [isProductInCart, setIsProductInCart] = useState(false); // Nuevo estado para comprobar si el producto está en el carrito
  const isProductInCart = useSelector((state) => state.itemCart.some((product) => product.id === products.id));

  const [isEditingComments, setIsEditingComments] = useState(false);
  const [editedComments, setEditedComments] = useState(""); // Nuevo estado para los comentarios editados

  const isAuthenticated = useSelector((state) => state.isAuthenticated);

  useEffect(() => {
    try {
      dispatch(getToolById(id));
    } catch (error) {
      console.log("Error al obtener los datos del producto:", error);
    }
  }, [dispatch, id]);


  useEffect(() => {
    // Agrega el código aquí para cargar los comentarios al refrescar la página
    if (user) {
      const foundReview = reviews.find(
        (review) => review.productId === parseInt(id)
      );
      if (foundReview) {
        setEditedComments(foundReview.comments);

      }
    }
  }, [reviews, id, user]);


  const findReview = reviews ? reviews.find(
    (review) => review.productId === parseInt(id)
  ) : null;


  useEffect(() => {
    const userDidBuyProd = async () => {
      if (!user) return;

      const userId = user?.id;

      try {
        const usuario = await dispatch(actions.getUserById(userId));
        const userCarts = usuario?.purchaseCarts;
        let productosPorIdArray = [];

        for (const cart of userCarts) {
          const productos = await dispatch(actions.getProductsInCart(cart.id));
          productos.forEach((prod) => {
            productosPorIdArray.push(prod.productId);
          });
        }

        const idNumero = Number(id);

        if (productosPorIdArray.includes(idNumero)) {
          setProdInCart(true);
          //setIsProductInCart(true); // Establecer el estado isProductInCart en verdadero si el producto está en el carrito
        }

        console.log("esta en el carrito?",isProductInCart)
      } catch (error) {
        console.log('Error verificando si el usuario compró el producto', error);
      }
    };

    userDidBuyProd();
  }, []);



  const handleUpdateComments = () => {
    dispatch(actions.updateReviewComments(findReview.id, editedComments));
    setIsEditingComments(false);
    window.location.reload();
  };

  if (!products) return <div>Esperando carga del producto...</div>;
  

  const handleAddToCart = () => {
    dispatch(addToCart(products));
    //setIsProductInCart(true); // Asegúrate de que setIsProductInCart se esté llamando aquí
    console.log('Producto agregado al carrito');
  };

  const handleDelete = () => {
    dispatch(actions.removeFromCart(products.id)); //Usar products.id para eliminar el producto del carrito
    //setIsProductInCart(false); //Establecer isProductInCart en falso después de eliminar
    };
    

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

          {isProductInCart ? (
          // Botón "Eliminar del Carrito" cuando el producto está en el carrito
          <button
            className={style.deleteProd}
            onClick={() => handleDelete(products.id)}
          >
            Eliminar del Carrito
          </button>
        ) : (
          // Botón "Añadir al Carrito" cuando el producto no está en el carrito
          <button
            className={style.addToCart}
            onClick={()=>handleAddToCart(products)}
          >
            <b>Añadir al Carrito</b>
          </button>
        )}

        </div>
      </div>

     {/* REVIEWS */}
<div className={style.reviewComp}>
  {isAuthenticated && findReview ? (
    <div>
      <div>
        {[1, 2, 3, 4, 5].map((star) => (
          <FontAwesomeIcon
            key={star}
            icon={star <= findReview.score ? solidStar : regularStar}
            className={style.star}
          />
        ))}
      </div>
      {isEditingComments ? (
        <div>
          <textarea
            value={editedComments}
            onChange={(e) => setEditedComments(e.target.value)}
          />
          <br></br>
          <button
            onClick={() => {
              handleUpdateComments();
  
            }}
            className={style.buttonUpdateEditReviews}
          >
            Actualizar Comentarios
          </button>

          <br></br>
          <button
            className={style.buttonCancelReviews}
            onClick={() => window.location.reload()}
          >
            Cancelar
          </button>
        </div>
      ) : (
        <div>
          <textarea value={findReview.comments} disabled />

          <br></br>
          <button
            className={style.buttonUpdateEditReviews}
            onClick={() => setIsEditingComments(true)}
          >
            Editar Comentarios
          </button>
        </div>
      )}
    </div>
  ) : prodInCart ? (
    <ReviewPage productId={id} />
  ) : isAuthenticated ? (
    <div>
      <p>Debes comprar el producto para realizar una reseña.</p>
    </div>
  ) : (
    <div>
      <p>Por favor, inicia sesión para realizar una reseña.</p>
    </div>
  )}
</div>
    </div>
  );
};

export default Detail;