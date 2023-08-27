import React, { useEffect, useState } from "react";
import style from "./UserProfile.module.css";
import { useDispatch, useSelector } from "react-redux";
import MyAddress from "./MyAddress/MyAddress";
import MyProfile from "./MyProfile/MyProfile";
import MyReviews from "./MyReviews/MyReviews";
import MyShopping from "./MyShopping/MyShopping";
import { useNavigate } from "react-router-dom";
import { getUserById } from "../../../redux/actions";

const UserProfile = () => {
  const { id } = useSelector((state) => state.login);
  console.log(id);
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const user = useSelector((state) => state.user);
  const [active, setActive] = useState("MiPerfil");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const fetchUserData = async () => {
      try {
        await dispatch(getUserById(id));
      } catch (error) {
        console.log("No se puede obtener el usuario", error);
      }
    };

    fetchUserData();
  }, [dispatch, id, isAuthenticated, navigate]);

  if (!user) {
    return <div>Cargando...</div>;
  }

  const handleButtonClick = (activeValue) => {
    setActive(activeValue);
  };

  return (
    <div className={style.userProfileContainer}>
      <div className={style.secondaryContainer}>
        <div className={style.nameContainer}> 
          <h1>
            Hola {user.firstName} {user.lastName}
          </h1>
          <br></br>
        </div>
        <div className={style.menuContainer}>
          <button
            className={`${style.customButton} ${active === "MiPerfil" ? style.activeButton : ""}`}
            onClick={() => handleButtonClick("MiPerfil")}
          >
            Mi Perfil
          </button>

          <button
            className={`${style.customButton} ${active === "MisDatos" ? style.activeButton : ""}`}
            onClick={() => handleButtonClick("MisDatos")}
          >
            Mis Direcciones
          </button>

          <button
            className={`${style.customButton} ${active === "MisCompras" ? style.activeButton : ""}`}
            onClick={() => handleButtonClick("MisCompras")}
          >
            Mis Compras
          </button>

          <button
            className={`${style.customButton} ${active === "MisReviews" ? style.activeButton : ""}`}
            onClick={() => handleButtonClick("MisReviews")}
          >
            Mis Reviews
          </button>
        </div>
      </div>
      <div className={`${style.componentContainer} ${style.activeComponent}`}>
        {/* Componentes desplegados */}
        {active === "MiPerfil" && <MyProfile user={user} />}
        {active === "MisDatos" && <MyAddress user={user} />}
        {active === "MisCompras" && <MyShopping />}
        {active === "MisReviews" && <MyReviews user={user} />}
      </div>
    </div>
  );
};

export default UserProfile;
// import React, { useEffect, useState } from "react";
// import style from "./UserProfile.module.css";
// import { useDispatch, useSelector } from "react-redux";
// import MyAddress from "./MyAddress/MyAddress";
// import MyProfile from "./MyProfile/MyProfile";
// import MyReviews from "./MyReviews/MyReviews";
// import MyShopping from "./MyShopping/MyShopping";
// import { useNavigate } from "react-router-dom";
// import { getUserById } from "../../../redux/actions";

// const UserProfile = () => {
//   const { id, firstName, lastName } = useSelector((state) => state.login);
//   const isAuthenticated = useSelector((state) => state.isAuthenticated);
//   const user = useSelector((state) => state.user);
//   const [active, setActive] = useState("MiPerfil");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
  

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         await dispatch(getUserById(id));
//       } catch (error) {
//         console.log("No se puede obtener el usuario", error);
//       }
//     };
//     fetchUserData();
//   }, [dispatch, id]);

//   if (!user) {
//     return <div>Cargando...</div>;
//   }

//   const handleButtonClick = (activeValue) => {
//     setActive(activeValue);
//   };

//   if (!isAuthenticated) {
//     // Si no está autenticado, redirige a la página de inicio de sesión
//     navigate("/login");
//     return null;
//   }

//   return (
//     <div className={style.userProfileContainer}>
//       <div className={style.secondaryContainer}>
//         <div>
//           <h1>
//             Hola {firstName} {lastName}
//           </h1>
//         </div>
//         <div className={style.buttonClass}>
//           <button
//             className={style.customButton}
//             onClick={() => handleButtonClick("MiPerfil")}
//           >
//             Mi Perfil
//           </button>

//           <button
//             className={style.customButton}
//             onClick={() => handleButtonClick("MisDatos")}
//           >
//             Mis Direcciones
//           </button>

//           <button
//             className={style.customButton}
//             onClick={() => handleButtonClick("MisCompras")}
//           >
//             Mis Compras
//           </button>

//           <button
//             className={style.customButton}
//             onClick={() => handleButtonClick("MisReviews")}
//           >
//             Mis Reviews
//           </button>
//         </div>
//       </div>
//       <div className={style.componentContainer}>
//         {active === "MiPerfil" && <MyProfile user={user} />}
//         {active === "MisDatos" && <MyAddress user={user} />}
//         {active === "MisCompras" && <MyShopping />}
//         {active === "MisReviews" && <MyReviews />}
//       </div>
//     </div>
//   );
// };


// export default UserProfile;
