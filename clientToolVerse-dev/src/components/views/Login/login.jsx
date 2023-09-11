import React, { useEffect, useState } from "react";
import styles from "./login.module.css";
import { useDispatch, useSelector } from "react-redux";
import { login, resGoogle } from "../../../redux/actions";
import { useNavigate } from "react-router-dom";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

function Login() {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const errorLogin = useSelector((state) => state.errorLogin);
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoginFormSubmitted, setIsLoginFormSubmitted] = useState(false);

  const handleInput = (event) => {
    const { name, value } = event.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(login(inputs));
    setIsLoginFormSubmitted(true);
  };

  const onSuccess = (credentialResponse) => {
    var decoded = jwt_decode(credentialResponse.credential);

    setInputs((prevInputs) => ({
      ...prevInputs,
      email: decoded.email,
      password: "logingoogle",
    }));
    setIsLoginFormSubmitted(true);
    console.log("response en onSuccess", decoded);
  };

  const responseGoogle = (response) => {
    console.log("Google response:", response);
  };

  useEffect(() => {
    if (isLoginFormSubmitted) {
      dispatch(login(inputs));
      console.log("inputs de segundo useEffect", inputs);
    }
  }, [isLoginFormSubmitted, dispatch, inputs]);

  useEffect(() => {
    if (isAuthenticated && isLoginFormSubmitted) {
      navigate("/userprofile");
    }
  }, [isAuthenticated, isLoginFormSubmitted, navigate]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>Inicia sesión</div>
      
      <div className={styles.content}>
        <form onSubmit={handleSubmit}>
          <div className={styles["user-details"]}>
            <div className={styles["input-box"]}>
              <span className={styles.details}>Email</span>
              <input
                type="text"
                placeholder="Ingresa tu email"
                name="email"
                value={inputs.email}
                onChange={handleInput}
              />
            </div>
            <div className={styles["input-box"]}>
              <span className={styles.details}>Contraseña</span>
              <input
                type="password"
                placeholder="Ingresa tu contraseña"
                name="password"
                value={inputs.password}
                onChange={handleInput}
              />
            </div>
          </div>
          <div className={styles.button}>
            <input type="submit" value="Inicia sesión" />
          </div>
        </form>
        {errorLogin && <div className={styles.error}>{errorLogin}</div>}

        <div className={styles["google-button"]}>
          <GoogleOAuthProvider clientId="125350630479-iq7tadqmu4uqgt7fs30jq9e7e3arpooh.apps.googleusercontent.com">
            <GoogleLogin
              onSuccess={onSuccess}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </GoogleOAuthProvider>
          ;
        </div>
      </div>
    </div>
  );
}

export default Login;


