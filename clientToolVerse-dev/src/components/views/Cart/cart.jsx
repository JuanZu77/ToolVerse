import style from './cart.module.css';
import CartDetails from '../CartDetails/cartDetails';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useNavigate } from 'react-router-dom';
import { React, useState } from "react";
import CartForm from '../CartForm/cartForm';


export default function Cart() {
    const isAuthenticated = useSelector(state => state.isAuthenticated);
    const navigate = useNavigate();
    const [cartError, setCartError] = useState(true)

    return (
        <div>
            <div className={style.questions}>
                {
                    !isAuthenticated ? (
                        <div className={style.noUser}>
                            <div className={style.msgLogIn}>
                                <div className={style.mje}>
                                    Parece que no has iniciado sesión.
                                </div>
                                <button className={style.logOn} onClick={() => navigate('/login')}> Inicia Sesión </button>
                            </div>
                            <div className={style.msgRegister}>
                                <div className={style.mje}>
                                    No estás registrado aún?
                                </div>
                                <button className={style.register} onClick={() => navigate('/form')}> Registro </button>
                            </div>
                        </div>
                    ) : (
                        <div className={style.userDetails}>
                            <CartForm cartError={cartError} setCartError={setCartError} />
                            <CartDetails cartError={cartError} setCartError={setCartError} />
                        </div>
                    )
                }
            </div>
        </div>
    );
}








// export default function Cart() {
//     const actualUser = useSelector(state => state.login);
//     const navigate = useNavigate();

//     return (
//         <div>
//             <div className={style.questions}>
//                 {
//                     (!actualUser.hasOwnProperty('email')) ? <div className={style.noUser}>
//                         <div className={style.msgLogIn}>
//                             <div className={style.mje}>
//                                 Parece que no has iniciado sesión.
//                             </div>
//                             <button className={style.logOn} onClick={() => navigate('/login')}> Inicia Sesión </button>
//                         </div>
                        // <div className={style.msgRegister}>
                        //     <div className={style.mje}>
                        //         No estás registrado aún?
                        //     </div>
                        //     <button className={style.register} onClick={() => navigate('/form')}> Registro </button>
                        // </div>
//                     </div>
//                         : <div className={style.userDetails}>
//                             <CartForm />
//                             <CartDetails />
//                         </div>
//                 }
//             </div>
//         </div>
//     )
// }
