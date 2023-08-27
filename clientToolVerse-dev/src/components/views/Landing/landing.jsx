import style from '../Landing/landing.module.css';
import { React } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../Landing/TVText.png"
import video from "../Landing/video.mp4"

export default function Landing() {

    const navigate = useNavigate();
    const getStarted = () => {
        navigate('/home');
    }

    return (
        <div className={style.videoContainer}>
            <video className={style.video} autoPlay loop muted>
                <source src={video} type="video/mp4" />
            </video>
            <div className={style.content}>
                <div className={style.logoContainer}>
                    <img src={logo} alt="logo" className={style.logo} />
                </div>
                <button className={style.button} onClick={getStarted}>GO</button>
            </div>
        </div>
      );
    }