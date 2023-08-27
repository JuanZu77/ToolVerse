import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";

const ReviewForm = ({ onSubmitReview }) => {
  //Estado inicial
  const [score, setScore] = useState(0);
  const [comments, setComments] = useState("");

  //Setear si existe una Review del usuario
  const handleScoreChange = (newScore) => {
    if (score === 0) {
      setScore(newScore);
    }
  };

  //Enviar la Review siempre y cuando score sea mayor a cero
  const handleSubmitReview = () => {
    if (score > 0) {
      onSubmitReview({ score, comments });
      handleScoreChange(score)
    } else {
      alert("Por favor, seleccione un puntaje antes de enviar la reseña");
    }
  };

  return (
    <div>
      <h3>Deja tu reseña:</h3>

      <div>
        {[1, 2, 3, 4, 5].map((star) => (
          <FontAwesomeIcon
            key={star}
            icon={star <= score ? solidStar : regularStar}
            onClick={() => handleScoreChange(star)}
            style={
              { po: "none", cursor: "default" }
            }
          />
        ))}
        ;
      </div>
      <textarea
        value={comments}
        onChange={(e) => setComments(e.target.value)}
        placeholder="Escribe tus comentarios aquí..."
      />

      <button onClick={handleSubmitReview}>Enviar Reseña</button>
    </div>
  );
};

export default ReviewForm;
