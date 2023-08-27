import React, { useState } from "react";
import styles from "../Form/form.module.css";
import { useDispatch } from "react-redux";
import { createUser } from "../../../redux/actions";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { validateForm } from "./validation";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

function Form() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "client",
  });

  const [error, setError] = useState({});

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validateForm(
      formData.firstName,
      formData.lastName,
      formData.email,
      formData.phone,
      formData.password,
      formData.confirmPassword
    );
    setError(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      dispatch(createUser(formData))
        .then(() => {
          console.log("Registro exitoso");
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
            role: "client",
          });
          setError({});

          Swal.fire({
            title: "Registro exitoso",
            text: "¡Tu registro ha sido exitoso!",
            icon: "success",
            confirmButtonText: "Ok",
          }).then(() => {
            navigate("/login");
          });
        })
        .catch(() => {
          console.log("Error en el registro");
          setError({ general: "Error en el registro. Inténtalo nuevamente." });
        });
    }
  };

  const responseGoogleSuccess = (credentialResponse) => {
    var decoded = jwt_decode(credentialResponse.credential);
    // Llena automáticamente el email, nombre y apellido obtenidos de Google en el formulario
    setFormData({
      ...formData,
      email: decoded.email,
      firstName: decoded.given_name,
      lastName: decoded.family_name,
    });
  };

  const responseGoogleFailure = (error) => {
    console.error("Error al iniciar sesión con Google:", error);
    // Puedes agregar aquí un mensaje de error o cualquier otra acción que desees tomar
  };

  const showRoleSelect = formData.role !== "client";

  return (
    <div className={styles.container}>
      <div className={styles.title}>Registro</div>
      <div className={styles.content}>
        <form onSubmit={handleSubmit}>
          <div className={styles["user-details"]}>
            <div className={styles["input-box"]}>
              <span className={styles.details}>Nombre</span>
              <input
                type="text"
                name="firstName"
                placeholder="Ingresa tu nombre"
                value={formData.firstName}
                onChange={handleChange}
              />
              {error.firstName && (
                <div className={styles.error}>{error.firstName}</div>
              )}
            </div>
            <div className={styles["input-box"]}>
              <span className={styles.details}>Apellido</span>
              <input
                type="text"
                name="lastName"
                placeholder="Ingresa tu apellido"
                value={formData.lastName}
                onChange={handleChange}
              />
              {error.lastName && (
                <div className={styles.error}>{error.lastName}</div>
              )}
            </div>
            <div className={styles["input-box"]}>
              <span className={styles.details}>Email</span>
              <input
                type="text"
                name="email"
                placeholder="Ingresa tu email"
                value={formData.email}
                onChange={handleChange}
              />
              {error.email && <div className={styles.error}>{error.email}</div>}
            </div>
            <div className={styles["input-box"]}>
              <span className={styles.details}>Número de Teléfono</span>
              <input
                type="text"
                name="phone"
                placeholder="Ingresa tu número de teléfono"
                value={formData.phone}
                onChange={handleChange}
              />
              {error.phone && <div className={styles.error}>{error.phone}</div>}
            </div>
            <div className={styles["input-box"]}>
              <span className={styles.details}>Contraseña</span>
              <input
                type="password"
                name="password"
                placeholder="Ingresa tu contraseña"
                value={formData.password}
                onChange={handleChange}
              />
              {error.password && (
                <div className={styles.error}>{error.password}</div>
              )}
            </div>
            <div className={styles["input-box"]}>
              <span className={styles.details}>Confirmar Contraseña</span>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirma tu contraseña"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {error.confirmPassword && (
                <div className={styles.error}>{error.confirmPassword}</div>
              )}
            </div>
            {showRoleSelect && (
              <div className={`${styles.hidden}`}>
                <span className={`${styles.hidden}`}>Rol</span>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="client">Cliente</option>
                  {/* Otras opciones de roles podrían agregarse aquí */}
                </select>
              </div>
            )}
          </div>

          <div className={styles.button}>
            <input type="submit" value="Registrate" />
          </div>
        </form>

        <div className={styles["google-button"]}>
          <GoogleOAuthProvider clientId="125350630479-iq7tadqmu4uqgt7fs30jq9e7e3arpooh.apps.googleusercontent.com">
            <GoogleLogin
              onSuccess={responseGoogleSuccess}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </GoogleOAuthProvider>
          ;
        </div>
        {error.general && <div className={styles.error}>{error.general}</div>}
      </div>
    </div>
  );
}

export default Form;

// import React, { useState } from "react";
// import styles from "../Form/form.module.css";
// import { useDispatch } from "react-redux";
// import { createUser } from "../../../redux/actions";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";
// import { validateForm } from "./validation";

// function Form() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirmPassword: "",
//     role: "client",
//   });

//   const [error, setError] = useState({});

//   const handleChange = (event) => {
//     setFormData({ ...formData, [event.target.name]: event.target.value });
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     const validationErrors = validateForm(
//       formData.firstName,
//       formData.lastName,
//       formData.email,
//       formData.phone,
//       formData.password,
//       formData.confirmPassword
//     );
//     setError(validationErrors);

//     if (Object.keys(validationErrors).length === 0) {
//       dispatch(createUser(formData))
//         .then(() => {
//           console.log("Registro exitoso");
//           setFormData({
//             firstName: "",
//             lastName: "",
//             email: "",
//             phone: "",
//             password: "",
//             confirmPassword: "",
//             role: "client",
//           });
//           setError({});

//           Swal.fire({
//             title: "Registro exitoso",
//             text: "¡Tu registro ha sido exitoso!",
//             icon: "success",
//             confirmButtonText: "Ok",
//           }).then(() => {

//             navigate("/login");
//           });
//         })
//         .catch(() => {
//           console.log("Error en el registro");
//           setError({ general: "Error en el registro. Inténtalo nuevamente." });
//         });
//     }
//   };

//   const showRoleSelect = formData.role !== "client";

//   return (
//     <div className={styles.container}>
//       <div className={styles.title}>Registro</div>
//       <div className={styles.content}>
//         <form onSubmit={handleSubmit}>
//           <div className={styles["user-details"]}>
//             <div className={styles["input-box"]}>
//               <span className={styles.details}>Nombre</span>
//               <input
//                 type="text"
//                 name="firstName"
//                 placeholder="Ingresa tu nombre"
//                 value={formData.firstName}
//                 onChange={handleChange}
//               />
//               {error.firstName && <div className={styles.error}>{error.firstName}</div>}
//             </div>
//             <div className={styles["input-box"]}>
//               <span className={styles.details}>Apellido</span>
//               <input
//                 type="text"
//                 name="lastName"
//                 placeholder="Ingresa tu apellido"
//                 value={formData.lastName}
//                 onChange={handleChange}
//               />
//               {error.lastName && <div className={styles.error}>{error.lastName}</div>}
//             </div>
//             <div className={styles["input-box"]}>
//               <span className={styles.details}>Email</span>
//               <input
//                 type="text"
//                 name="email"
//                 placeholder="Ingresa tu email"
//                 value={formData.email}
//                 onChange={handleChange}
//               />
//               {error.email && <div className={styles.error}>{error.email}</div>}
//             </div>
//             <div className={styles["input-box"]}>
//               <span className={styles.details}>Número de Teléfono</span>
//               <input
//                 type="text"
//                 name="phone"
//                 placeholder="Ingresa tu número de teléfono"
//                 value={formData.phone}
//                 onChange={handleChange}
//               />
//               {error.phone && <div className={styles.error}>{error.phone}</div>}
//             </div>
//             <div className={styles["input-box"]}>
//               <span className={styles.details}>Contraseña</span>
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Ingresa tu contraseña"
//                 value={formData.password}
//                 onChange={handleChange}
//               />
//               {error.password && <div className={styles.error}>{error.password}</div>}
//             </div>
//             <div className={styles["input-box"]}>
//               <span className={styles.details}>Confirmar Contraseña</span>
//               <input
//                 type="password"
//                 name="confirmPassword"
//                 placeholder="Confirma tu contraseña"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//               />
//               {error.confirmPassword && <div className={styles.error}>{error.confirmPassword}</div>}
//             </div>
//             {showRoleSelect && (
//               <div className={`${styles.hidden}`}>
//                 <span className={`${styles.hidden}`}>Rol</span>
//                 <select name="role" value={formData.role} onChange={handleChange}>
//                   <option value="client">Cliente</option>
//                   {/* Otras opciones de roles podrían agregarse aquí */}
//                 </select>
//               </div>
//             )}
//           </div>

//           <div className={styles.button}>
//             <input type="submit" value="Registrate" />
//           </div>
//         </form>

//         {error.general && <div className={styles.error}>{error.general}</div>}
//       </div>
//     </div>
//   );
// }

// export default Form;
