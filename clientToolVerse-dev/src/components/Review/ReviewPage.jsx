import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addReview } from '../../redux/actions';
import ReviewForm from './ReviewForm';
import Swal from 'sweetalert2';

const ReviewPage = ({ productId }) => {
  const dispatch = useDispatch();

  // Acceder a la info del usuario
  const user = useSelector((state) => state.user);
  const reviews = user?.reviews
  const isAuthenticated = useSelector((state) => state.isAuthenticated);

  // Verificar que el usuario esté logueado
  if (!isAuthenticated) {
    return <div>Por favor, inicia sesión para realizar una reseña.</div>;
  }

  // Obtener el ID del usuario logueado
  const userId = user.id;

  // Obtener la reseña del usuario para este producto (si existe)
  const userReview = reviews.find((review) => review.productId === productId && review.userId === userId);

  // Verificaar si es la primera reseña del usuario para este producto
  // const isFirstReview = !userReview;

  const handleSubmitReview = (newReview) => {
    dispatch(addReview({ ...newReview, userId, productId }));
    // le aviso al usuario que la review fue exitosa
    Swal.fire({
      icon: "success",
      title: "Información guardada",
      text: "La información ha sido guardada con éxito.",
    });
    // debería chequear los datos 
  };

  // const handleUpdateComments = (id, comments) => {
  //   dispatch(updateReviewComments(id, comments));
  // };

  return (
    <div>
      {userReview ? ( // Mostramos la reseña del usuario si ya hizo una para este product
        <div>
          <p>Puntaje: {userReview.score}</p>
          <p>Comentarios: {userReview.comments}</p>
        </div>
      ) : (
        // Mostrar el formulario para enviar reseñas, si aun no exister una reseña del usuario para este producto
        <ReviewForm productId={productId} onSubmitReview={handleSubmitReview} userId={userId} />
      )}
    </div>
  );
};

export default ReviewPage;
