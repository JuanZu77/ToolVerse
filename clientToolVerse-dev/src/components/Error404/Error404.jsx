import {useLocation, Link} from 'react-router-dom';
import style from './Error404.module.css';

const Error404 = () => {

  //const currentURL = window.location.pathname;
  const location = useLocation();

     return (
      <div className={style.container}>
      
      <div className={style.error}>
         <h1>Page Not Found</h1>
      </div>

      <div className={style.typeError}>
         <h2>404</h2>
      </div>
 
      <div className={style.messageOne}>
         <p>Sorry, the page <span>{location.pathname} </span>could not be found </p>
      </div>

      <div className={style.messageTwo}>
          <p>
            ⚠️ The page you are looking for might have been removed had its name changed or is temporarily unavailable. 
            <br/>
          </p>
      </div>

      <div className={style.backHome}>
          <Link to = '/home' >    
            <button className={style.button}>Go to HOMEPAGE </button>
          </Link>
      </div>
     
  </div>
    );
  };
  
  export default Error404;
