import style from "../Ordering/Ordering.module.css";
import {
  orderByName,
  orderByPrice,
  setCurrentPage,
} from "../../redux/actions";

import { useDispatch } from "react-redux";

const Ordering = () => {

  const dispatch = useDispatch();

  return (
    <div className={style.orderingContainer}>

        <div className={style.alphabeticalyByPrice}>
          <span className={style.orderTitle}>Ordenar por Nombre: </span>
          <select
            name="orderByName"
            onChange={(e) => {
              dispatch(orderByName(e.target.value));
              dispatch(setCurrentPage(1));
            }}
          >
            {["de A-Z", "de Z-A"].map((e, i) => (
              <option value={e} key={i}>
                {e}
              </option>
            ))}
          </select>
        </div>

        <div className={style.alphabeticalyByPrice}>
          <span className={style.orderTitle}>Ordenar por Precio: </span>
          <select
            name="orderByPrice"
            onChange={(e) => {
              dispatch(orderByPrice(e.target.value));
              dispatch(setCurrentPage(1));
            }}
          >
            {["Ascendente", "Descendente"].map((e, i) => (
              <option value={e} key={i}>
                {e}
              </option>
            ))}
          </select>
        </div>

    </div>
  );
};

export default Ordering;
