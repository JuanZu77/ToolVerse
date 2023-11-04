import React from 'react';
import { useSelector} from 'react-redux';
import ReviewForm from './ReviewForm';
import Swal from 'sweetalert2';
import axios from 'axios';

const ReviewPage = ({ productId }) => {

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

  
  // const handleSubmitReview = async (newReview) => {
  //   try {
  //     const shouldSubmit = window.confirm("¿Deseas enviar esta reseña?");
  
  //     if (shouldSubmit) {
  //       dispatch(addReview({ ...newReview, userId, productId }));
     
  //         window.location.reload();
        
  //     }
  //   } catch (error) {
  //     console.error("Error al enviar la reseña:", error);
  //   }
  // };

  const handleSubmitReview = async (newReview) => {
    try {
      const shouldSubmit = window.confirm("¿Deseas enviar esta reseña?");
      
  
      if (shouldSubmit) {
        // Envía la reseña
        // eslint-disable-next-line no-unused-vars
        const response = await axios.post('/review', { ...newReview, userId, productId });
        
        // Muestra la alerta de éxito
        await Swal.fire({
          icon: "success",
          title: "Información guardada",
          text: "La información ha sido guardada con éxito.",
        });
  
        // Después de un breve retraso, recarga la página
        setTimeout(() => {
          window.location.reload();
        }, 1000); // Cambia el valor de 1000 si deseas un retraso diferente
      }
    } catch (error) {
      console.error("Error al enviar la reseña:", error);
    }
  };
  


  
  const userReview = reviews.find((review) => review.productId === productId && review.userId === userId);

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
