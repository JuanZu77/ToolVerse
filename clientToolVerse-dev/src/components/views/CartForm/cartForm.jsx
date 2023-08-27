import style from './cartForm.module.css';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import React, { useEffect, useState } from "react";
import * as actions from "../../../redux/actions";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export function validate({ firstName, lastName, phone, country, state, city, address, postalCode }) {
    let cartErrors = {};
    if (!firstName) cartErrors.firstName = 'Por favor coloca el nombre del receptor';
    if (!lastName) cartErrors.lastName = 'Por favor coloca el apellido del receptor';
    if (!phone) cartErrors.phone = 'Por favor coloca un número de contacto';
    if (!country) cartErrors.country = 'Por favor coloca un país';
    if (!state) cartErrors.state = 'Por favor coloca un estado';
    if (!city) cartErrors.city = 'Por favor coloca una ciudad';
    if (!address) cartErrors.address = 'Por favor coloca una dirección a donde enviar los productos';
    if (!postalCode) cartErrors.postalCode = 'Por favor coloca un código postal';
    return cartErrors;
}

export default function CartForm({ cartError, setCartError }) {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    // const login = useSelector(state => state.login)
    const userLogin = useSelector(state=>state.user)
    const address = useSelector(state => state.address)
    const [addAddress, setAddAddress] = useState(false); //para activar la form del address

    const [selectedAddress, setSelectedAddress] = useState({
        id: '',
        country: '',
        state: '',
        city: '',
        address: '',
        postalCode: ''
    }); // la address que va a enviarse al estado global para ser utilizada luego, don't forget id!!!!

    const [user, setUser] = useState({
        id: userLogin.id,
        firstName: userLogin.firstName,
        lastName: userLogin.lastName,
        email: userLogin.email,
        phone: userLogin.phone,
        country: '',
        state: '',
        city: '',
        address: '',
        postalCode: '',
    });

    console.log('user', user)

    const [cartErrors, setCartErrors] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        country: '',
        state: '',
        city: '',
        address: '',
        postalCode: ''
    });

    console.log('address antes de use', address)

    useEffect(() => {
        if (userLogin.id && address && address.length > 0) {
            setUser(prevUser => ({
                ...prevUser,
                country: address[0].country || "",
                state: address[0].state || "",
                city: address[0].city || "",
                address: address[0].address || "",
                postalCode: address[0].postalCode || "",
            }));
        }
    }, [userLogin.id, address]);

    const handleLoadAddress = () => {
        navigate('/userprofile')
    };

    const handleSelect = (addressIndex) => {
        // me devuelve un id de address -> vamos a buscar los datos de esta address
        const indexAsNumber = parseInt(addressIndex, 10); // para comparar nro con nro

        const datos = address.find((address) => address.id === indexAsNumber);
        console.log('los datos devueltos', datos)
        setSelectedAddress(datos);
        console.log('así queda la addressSeleccionada', selectedAddress)
        // aquí tengo que despachar la acción para que el estado global muestre esa dirección
        dispatch(actions.selectAddress(datos))
    };

    const handleInputChange = (event) => {
        const { value, name } = event.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value,
        }));

        setCartErrors(
            validate({
                ...user,
                [name]: value
            })
        )
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const errors = validate(user);
        if (Object.values(errors).length === 0) {
            let dirPostal = {
                id: selectedAddress.id,
                country: selectedAddress.country,
                state: selectedAddress.state,
                city: selectedAddress.city,
                address: selectedAddress.address,
                postalCode: selectedAddress.postalCode,
                //userId: login.id
            }
            dispatch(actions.selectAddress(dirPostal))
            // dispatch(actions.createShippingAddress(dirPostal));
            dispatch(actions.actualUser(user));
            setCartError(false)
            Swal.fire({
                icon: "success",
                title: "Información guardada",
                text: "La información ha sido guardada con éxito.",
              });
        }
        else {
            setCartErrors(errors);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Por favor verifica que toda la información sea correcta.",
              });
        }
    }


    return (
        <div className={style.cartForm}>
            <div className={style.title}>Completa tus datos:</div>
            <form onSubmit={handleSubmit} className={style.cartForm}>
                <label className={style.labelForm}>Nombre: </label>
                <input type="text" className={style.inputGral} name='firstName' placeholder='Nombre del receptor' onChange={handleInputChange} value={user.firstName} />
                <span>  </span>
                {
                    cartErrors.firstName && <p className={style.warning}>{cartErrors.firstName}</p>
                }

                <label className={style.labelForm}>Apellido: </label>
                <input type="text" className={style.inputGral} name='lastName' placeholder='Apellido del receptor' onChange={handleInputChange} value={user.lastName} />
                <span>  </span>
                {
                    cartErrors.lastName && <p className={style.warning}>{cartErrors.lastName}</p>
                }

                <label className={style.labelForm}>Email: </label>
                <input type="text" className={style.inputGral} name='email' placeholder='E-mail del receptor' onChange={handleInputChange} value={user.email} />
                <span>  </span>

                <label className={style.labelForm}>Teléfono: </label>
                <input type="text" className={style.inputGral} name='phone' placeholder='Teléfono del receptor' onChange={handleInputChange} value={user.phone} />
                <span>  </span>

                {
                    cartErrors.phone && <p className={style.warning}>{cartErrors.phone}</p>
                }


                <label className={style.labelForm}>Dirección postal: </label>
                <div>
                    {!address.length ? (
                        <div>
                            <h3>No hay direcciones cargadas</h3>
                            <br />
                            <button onClick={handleLoadAddress}>Cargar dirección</button>
                        </div>
                    ) : (
                        <div>
                            <select
                                name="address" className={style.inputGral}
                                onChange={(e) => handleSelect(e.target.value)}
                            >
                                <option value="" key="first" hidden >
                                    Seleccione una dirección
                                </option>
                                {address.map((a, i) => (
                                    <option value={a.id} key={i}>
                                        {a.address} ({a.city}, {a.state}, {a.country},{" "}
                                        {a.postalCode})
                                    </option>
                                ))}
                            </select>
                            {selectedAddress !== null && (
                                <div>
                                    <h2>Pais: {selectedAddress.country}</h2>
                                    <h2>Estado: {selectedAddress.state}</h2>
                                    <h2>Ciudad: {selectedAddress.city}</h2>
                                    <h2>Dirección: {selectedAddress.address}</h2>
                                    <h2>Código Postal: {selectedAddress.postalCode}</h2>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {
                    addAddress && <div className={style.addAddress}>
                        <input type="text" className={style.inputGral} name='country' placeholder='País' onChange={handleInputChange} value={user.country} />
                        {
                            cartErrors.country && <p className={style.warning}>{cartErrors.country}</p>
                        }
                        <input type="text" className={style.inputGral} name='state' placeholder='Estado' onChange={handleInputChange} value={user.state} />
                        {
                            cartErrors.state && <p className={style.warning}>{cartErrors.state}</p>
                        }
                        <input type="text" className={style.inputGral} name='city' placeholder='Ciudad' onChange={handleInputChange} value={user.city} />
                        {
                            cartErrors.city && <p className={style.warning}>{cartErrors.city}</p>
                        }
                        <input type="text" className={style.inputGral} name='address' placeholder='Calle y número' onChange={handleInputChange} value={user.address} />
                        {
                            cartErrors.address && <p className={style.warning}>{cartErrors.address}</p>
                        }
                        <input type="text" className={style.inputGral} name='postalCode' placeholder='Código Postal' onChange={handleInputChange} value={user.postalCode} />
                        {
                            cartErrors.postalCode && <p className={style.warning}>{cartErrors.postalCode}</p>
                        }
                        <span>  </span>

                    </div>
                }

                <div className={style.button}>
                    <input type="submit" value=" Todos los datos son correctos" onClick={handleSubmit} />
                </div>
            </form>
        </div>
    )
}