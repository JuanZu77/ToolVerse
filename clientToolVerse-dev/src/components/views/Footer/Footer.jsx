import React from 'react';
import logo from "./ToolVe.png"
import styles from "./Footer.module.css";
import { Link } from "react-router-dom";


const Footer = () => {

    return (

        <footer className={styles.footer}>
            <section>
                <div className={styles['logo-container']}>
                    <Link to="/home">
                        <img src={logo} alt="logo" />
                    </Link>
                </div>
                <div className={styles['links']}>
                    <a href="/about">Nuestro Equipo</a>
                    <div className={styles['contact-us']}>
                        <a href="/contactus">Contáctanos</a>
                    </div>
                </div>
            </section>
            <div>

            </div>

            <p>Toolverse© 2023 Todos los derechos reservados.</p>
        </footer>


    )
};

export default Footer;
