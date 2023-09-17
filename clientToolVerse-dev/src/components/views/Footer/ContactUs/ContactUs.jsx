import React from "react";
import { useState } from "react";
import styles from "./ContactUs.module.css";
//import axios from "axios";
import { useNavigate } from "react-router-dom";
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


  return (
    <div className={styles.contactContainer}>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.contactForm}>
          <h1>¿Tiene alguna pregunta o sugerencia?</h1>
  
          <div className={styles.formField}>
            <label className={styles.formLabel} htmlFor="firstName">
              Nombre:
            </label>
            <input
              type="text"
              name="firstName"
              value={formState.firstName}
              onChange={handleChange}
              className={styles.formInput}
              required
            />
          </div>
  
          <div className={styles.formField}>
            <label className={styles.formLabel} htmlFor="lastName">
              Apellido:
            </label>
            <input
              type="text"
              name="lastName"
              value={formState.lastName}
              onChange={handleChange}
              className={styles.formInput}
              required
            />
          </div>
  
          <div className={styles.formField}>
            <label className={styles.formLabel} htmlFor="email">
              Email:
            </label>
            <input
              type="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              className={styles.formInput}
              required
            />
          </div>
  
          <div className={styles.formField}>
            <label className={styles.formLabel} htmlFor="subject">
              Asunto:
            </label>
            <input
              type="text"
              name="subject"
              value={formState.subject}
              onChange={handleChange}
              className={styles.formInput}
              required
            />
          </div>
  
          <div className={styles.formField}>
            <label className={styles.formLabel} htmlFor="message">
              Mensaje:
            </label>
            <textarea
              name="message"
              value={formState.message}
              onChange={handleChange}
              className={styles.formTextarea}
              required
            />
          </div>
  
          <input type="submit" value="Enviar" className={styles.formSubmit} />
        </form>
      </div>
      <Footer />
    </div>
  );
  
}
