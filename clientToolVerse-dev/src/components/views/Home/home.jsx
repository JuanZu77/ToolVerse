
import style from './home.module.css'
import React from 'react';
import ProductCards from '../ProductCards/ProductCards';
import Ordering from '../../Ordering/Ordering';
import Filters from '../../Filters/Filters'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useDispatch } from "react-redux";
import {
    getTools,
    setCurrentPage,
} from "../../../redux/actions";
import Footer from '../Footer/Footer';


function Home() {
    const dispatch = useDispatch();

    return (
    <div className={style.homeDiv}>
            <br></br>
            <Carousel 
            showThumbs={false} 
            autoPlay
            infiniteLoop
            centerMode
            className={style.carrusel}
            >
                <img src="https://tienda.ferrecsa.com.mx/image/cache/catalog/BannerBOS2-1360x425h.png" alt="img" />

                <img src="https://tienda.ferrecsa.com.mx/image/cache/catalog/bannMAKITA1-1360x425h.png" alt="img" />

                <img src="https://tienda.ferrecsa.com.mx/image/cache/catalog/bannDewlt-1360x425h.png" alt="img" />

                <img src="https://tienda.ferrecsa.com.mx/image/cache/catalog/bannpaypal-1360x425h.png" alt="img" />
            </Carousel>

        {/*DIV FILTERS, ORDERS and BUTTON remove filters*/}
            <div className={style.filtOrd}>
                <Filters />
                <Ordering />
                <div className={style.button}>
                    <input type="submit" value=" QUITAR FILTROS " onClick={() => {
                        dispatch(getTools());
                        dispatch(setCurrentPage(1));
                    }} />
                </div>
            </div>

            <ProductCards />
            

            <Footer/>

    </div>
  )
}
export default Home;