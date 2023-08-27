import React from "react";
import { useState } from "react";
import styles from "./ContactUs.module.css";
//import axios from "axios";
import { useNavigate } from "react-router-dom";
import backgroundImage from "./fondo.avif"
import Footer from "../Footer";
import swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function ContactUs() {
  const navigate = useNavigate();
  const mySwal = withReactContent(swal);

  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mySwal.fire({
      title: "Success",
        text: "¡Tu solicitud se ha enviado con exito!",
        icon: "success",
        buttons: true,
    })
   .then (navigate("/home"));
  };

  //!Necesito un endpoint para enviar la solicitud del cliente
  /* const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:3001/email`, {
        destination: "rojas650634@gmail.com",
        body: formState.message,
        title: formState.subject,
      })
      .then((d) => {
        alert("Tu correo ha sido enviado con exito").then(navigate("/home"));
      })
      .catch((err) => console.log("ERROR", err));
  }; */

  return (
    <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover", height: "100vh" }}>
    <h1 style={{fontWeight:"bold", color: "black", fontSize: "xx-large"}}>Tienes alguna consulta o sugerencia, haznoslo saber</h1>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.contactForm}>
          <label className={styles.formLabel}>
            Nombre:
            <input
              type="text"
              name="firstName"
              value={formState.firstName}
              onChange={handleChange}
              className={styles.formInput}
              required
            />
          </label>

          <label className={styles.formLabel}>
            Apellido:
            <input
              type="text"
              name="lastName"
              value={formState.lastName}
              onChange={handleChange}
              className={styles.formInput}
              required
            />
          </label>

          <label className={styles.formLabel}>
            Email:
            <input
              type="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              className={styles.formInput}
              required
            />
          </label>

          <label className={styles.formLabel}>
            Asunto:
            <input
              type="text"
              name="subject"
              value={formState.subject}
              onChange={handleChange}
              className={styles.formInput}
              required
            />
          </label>

          <label className={styles.formLabel}>
            Mensaje:
            <textarea
              name="message"
              value={formState.message}
              onChange={handleChange}
              className={styles.formTextarea}
              required
            />
          </label>

          <input type="submit" value="Enviar" className={styles.formSubmit} />
        </form>
      </div>
      <Footer/>
    </div>
  );
}
