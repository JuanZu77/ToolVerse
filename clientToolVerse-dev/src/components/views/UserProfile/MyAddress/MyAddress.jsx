import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2'; // Importa SweetAlert
import { validateForm } from "./Validation";
import {
  createShippingAddress,
  getShippingAddressByUserId,
  getUserById,
  updateShippingAddress,
} from "../../../../redux/actions";
import MyAddressForm from "./MyAddressForm";
import styles from "./MyAddress.module.css";

const MyAddress = ({ user }) => {
  const dispatch = useDispatch();
  const address = useSelector((state) => state.address);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [active, setActive] = useState(false);
  const [showSelect, setShowSelect] = useState(true);
  const [modifyAddress, setModifyAddress] = useState(null);

  const [formAddress, setFormAddress] = useState({
    country: "",
    state: "",
    city: "",
    address: "",
    postalCode: "",
    userId: user.id,
  });
  const [error, setError] = useState("");

  const handleSelect = (addressIndex) => {
    setSelectedAddress(addressIndex);
  };

  const handleSuccessAlert = () => {
    // Mostrar SweetAlert en caso de éxito
    Swal.fire({
      icon: 'success',
      title: 'Registro exitoso',
      text: 'La dirección ha sido registrada exitosamente.',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationError = validateForm(
      formAddress.country,
      formAddress.state,
      formAddress.city,
      formAddress.address,
      formAddress.postalCode
    );
    setError(validationError);

    if (!validationError) {
      dispatch(createShippingAddress(formAddress))
        .then(() => {
          dispatch(getUserById(user.id));
          console.log("Registro exitoso");
          setFormAddress({
            country: "",
            state: "",
            city: "",
            address: "",
            postalCode: "",
            userId: user.id,
          });
          setError("");
          setActive(false);
          setShowSelect(true);
          setSelectedAddress(null);
          handleSuccessAlert(); // Mostrar SweetAlert
        })
        .catch(() => {
          console.log("Error en el registro");
          setError("Error en el registro. Inténtalo nuevamente.");
        });
    }
  };

  const handleSubmitModify = (e) => {
    e.preventDefault();

    const validationError = validateForm(
      modifyAddress.country,
      modifyAddress.state,
      modifyAddress.city,
      modifyAddress.address,
      modifyAddress.postalCode
    );
    setError(validationError);

    if (!validationError) {
      dispatch(updateShippingAddress(modifyAddress.id, modifyAddress))
        .then(() => {
          dispatch(getUserById(user.id));
          console.log("Registro exitoso");
          setModifyAddress(null);
          setError("");
          setActive(false);
          setShowSelect(true);
          setSelectedAddress(null);
          handleSuccessAlert(); // Mostrar SweetAlert
        })
        .catch(() => {
          console.log("Error en el registro");
          setError("Error en el registro. Inténtalo nuevamente.");
        });
    }
  };

  const handleChange = (e) => {
    setFormAddress({ ...formAddress, [e.target.name]: e.target.value });
  };

  const handleChangeModify = (e) => {
    setModifyAddress({ ...modifyAddress, [e.target.name]: e.target.value });
  };

  const handleLoadAddress = () => {
    setModifyAddress(null);
    setActive(true);
    setSelectedAddress(null);
    setShowSelect(false);
  };

  const handleModify = () => {
    if (selectedAddress !== null) {
      setModifyAddress(address[selectedAddress]);
      setActive(true);
      setShowSelect(false);
    }
  };

  const handleCancel = () => {
    setModifyAddress(null);
    setActive(false);
    setShowSelect(true);
  };

  useEffect(() => {
    try {
      dispatch(getShippingAddressByUserId(user.id));
    } catch (error) {
      console.log("No se encontró la dirección", error);
    }
  }, [dispatch, user]);

  return (
    <div>
      <div className={styles.title}>
        <h1>Mis Direcciones</h1>
      </div>
      {!active && showSelect && (
        <div className={styles.container}>
          {!address.length ? (
            <div>
              <h3>No hay direcciones cargadas</h3>
              <br />
              <button onClick={handleLoadAddress}>Cargar dirección</button>
            </div>
          ) : (
            <div>
              <select
                name="address"
                onChange={(e) => handleSelect(e.target.value)}
              >
                <option value="" key="first" hidden>
                  Seleccione una dirección
                </option>
                {address.map((a, i) => (
                  <option value={i} key={i}>
                    {a.address} ({a.city}, {a.state}, {a.country},{" "}
                    {a.postalCode})
                  </option>
                ))}
              </select>
              {selectedAddress !== null && (
                <div>
                  <h2>Pais: {address[selectedAddress].country}</h2>
                  <h2>Estado: {address[selectedAddress].state}</h2>
                  <h2>Ciudad: {address[selectedAddress].city}</h2>
                  <h2>Dirección: {address[selectedAddress].address}</h2>
                  <h2>Código Postal: {address[selectedAddress].postalCode}</h2>
                  <button className={styles.button} onClick={handleModify}>
                    Modificar dirección
                  </button>
                </div>
              )}
              <button className={styles.button} onClick={handleLoadAddress}>
                Cargar nueva dirección
              </button>
            </div>
          )}
        </div>
      )}
      {active && (
        <MyAddressForm
          handleChange={handleChange}
          handleChangeModify={handleChangeModify}
          handleSubmit={handleSubmit}
          formAddress={formAddress}
          error={error}
          modifyAddress={modifyAddress}
          handleSubmitModify={handleSubmitModify}
          handleCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default MyAddress;

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { validateForm } from "./Validation";
// import {
//   createShippingAddress,
//   getShippingAddressByUserId,
//   getUserById,
//   updateShippingAddress,
// } from "../../../../redux/actions";
// import MyAddressForm from "./MyAddressForm";
// import styles from "./MyAddress.module.css"

// const MyAddress = ({ user }) => {
//   const dispatch = useDispatch();
//   const address = useSelector((state) => state.address);
//   const [selectedAddress, setSelectedAddress] = useState(null);
//   const [active, setActive] = useState(false);
//   const [showSelect, setShowSelect] = useState(true);
//   const [modifyAddress, setModifyAddress] = useState(null);

//   const [formAddress, setFormAddress] = useState({
//     country: "",
//     state: "",
//     city: "",
//     address: "",
//     postalCode: "",
//     userId: user.id,
//   });
//   const [error, setError] = useState("");

//   const handleSelect = (addressIndex) => {
//     setSelectedAddress(addressIndex);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const validationError = validateForm(
//       formAddress.country,
//       formAddress.state,
//       formAddress.city,
//       formAddress.address,
//       formAddress.postalCode
//     );
//     setError(validationError);

//     if (!validationError) {
//       dispatch(createShippingAddress(formAddress))
//         .then(() => {
//           dispatch(getUserById(user.id));
//           console.log("Registro exitoso");
//           setFormAddress({
//             country: "",
//             state: "",
//             city: "",
//             address: "",
//             postalCode: "",
//             userId: user.id,
//           });
//           setError("");
//           setActive(false);
//           setShowSelect(true);
//           setSelectedAddress(null);
//           alert("¡Registro exitoso!");
//         })
//         .catch(() => {
//           console.log("Error en el registro");
//           setError("Error en el registro. Inténtalo nuevamente.");
//         });
//     }
//   };

//   const handleSubmitModify = (e) => {
//     e.preventDefault();

//     const validationError = validateForm(
//       modifyAddress.country,
//       modifyAddress.state,
//       modifyAddress.city,
//       modifyAddress.address,
//       modifyAddress.postalCode
//     );
//     setError(validationError);

//     if (!validationError) {
//       dispatch(updateShippingAddress(modifyAddress.id, modifyAddress))
//         .then(() => {
//           dispatch(getUserById(user.id));
//           console.log("Registro exitoso");
//           setModifyAddress(null);
//           setError("");
//           setActive(false);
//           setShowSelect(true);
//           setSelectedAddress(null);
//           alert("¡Registro exitoso!");
//         })
//         .catch(() => {
//           console.log("Error en el registro");
//           setError("Error en el registro. Inténtalo nuevamente.");
//         });
//     }
//   };

//   const handleChange = (e) => {
//     setFormAddress({ ...formAddress, [e.target.name]: e.target.value });
//   };

//   const handleChangeModify = (e) => {
//     setModifyAddress({ ...modifyAddress, [e.target.name]: e.target.value });
//   };

//   const handleLoadAddress = () => {
//     setModifyAddress(null);
//     setActive(true);
//     setSelectedAddress(null);
//     setShowSelect(false);
//   };

//   const handleModify = () => {
//     if (selectedAddress !== null) {
//       setModifyAddress(address[selectedAddress]);
//       setActive(true);
//       setShowSelect(false);
//     }
//   };

//   const handleCancel = () => {
//     setModifyAddress(null);
//     setActive(false);
//     setShowSelect(true);
//   };

//   useEffect(() => {
//     try {
//       dispatch(getShippingAddressByUserId(user.id));
//     } catch (error) {
//       console.log("No se encontro dirección", error);
//     }
//   }, [dispatch, user]);

//   return (
//     <div>
//       <div className={styles.title}>
//         <h1>Mis Direcciones</h1>
//         </div>
//       {!active && showSelect && (
//         <div className={styles.container}>
//           {!address.length ? (
//             <div>
//               <h3>No hay direcciones cargadas</h3>
//               <br />
//               <button onClick={handleLoadAddress}>Cargar dirección</button>
//             </div>
//           ) : (
//             <div>
//               <select
//                 name="address"
//                 onChange={(e) => handleSelect(e.target.value)}
//               >
//                 <option value="" key="first" hidden>
//                   Seleccione una dirección
//                 </option>
//                 {address.map((a, i) => (
//                   <option value={i} key={i}>
//                     {a.address} ({a.city}, {a.state}, {a.country},{" "}
//                     {a.postalCode})
//                   </option>
//                 ))}
//               </select>
//               {selectedAddress !== null && (
//                 <div>
//                   <h2>Pais: {address[selectedAddress].country}</h2>
//                   <h2>Estado: {address[selectedAddress].state}</h2>
//                   <h2>Ciudad: {address[selectedAddress].city}</h2>
//                   <h2>Dirección: {address[selectedAddress].address}</h2>
//                   <h2>Código Postal: {address[selectedAddress].postalCode}</h2>
//                   <button className={styles.button} onClick={handleModify}>Modificar dirección</button>
//                 </div>
//               )}
//               <button className={styles.button} onClick={handleLoadAddress}>
//                 Cargar nueva dirección
//               </button>
//             </div>
//           )}
//         </div>
//       )}
//       {active && (
//         <MyAddressForm
//           handleChange={handleChange}
//           handleChangeModify={handleChangeModify}
//           handleSubmit={handleSubmit}
//           formAddress={formAddress}
//           error={error}
//           modifyAddress={modifyAddress}
//           handleSubmitModify={handleSubmitModify}
//           handleCancel={handleCancel}
//         />
//       )}
//     </div>
//   );
// };

// export default MyAddress;
