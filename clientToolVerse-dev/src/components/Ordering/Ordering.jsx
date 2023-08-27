import style from "./Ordering.module.css";
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

      <div className={style.ordenamientos}>
        <div className={style.alphabeticalOrder}>
          <span className={style.orderTitle}>Ordenar por nombre </span>
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
        <div className={style.orderByPrice}>
          <span className={style.orderTitle}>Ordenar por precio </span>
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
    </div>
  );
};

export default Ordering;
