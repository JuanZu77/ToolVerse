import React from "react";
import style from "../Pagination/Pagination.module.css"; //para dar stilo al boton
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../redux/actions";

export default function Pagination() {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.currentPage);
  const tools = useSelector((state) => state.toolsShown);
  const itemsPerPage = 12;
  const pageNumbers = Math.ceil(tools.length / itemsPerPage);

  const handleClick = (page) => {
    dispatch(setCurrentPage(page));
  };

// Calcula el rango de páginas a mostrar
const visiblePageRange = 5;
let startPage = Math.max(1, currentPage - Math.floor(visiblePageRange / 2));
let endPage = Math.min(pageNumbers, startPage + visiblePageRange - 1);

if (endPage - startPage + 1 < visiblePageRange) {
  startPage = Math.max(1, endPage - visiblePageRange + 1);
}

const renderPageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
  

return (
  <div className={style.divButtons}>
    <button
      className={`${style.AnteriorSiguiente} ${currentPage === 1 ? style.buttonDisabled : ""}`}
      disabled={currentPage === 1}
      onClick={() => handleClick(currentPage - 1)}
    >
      &lt; Anterior
    </button>
    {Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index).map((number) => (
      <button
        key={number}
        className={`${style.button} ${currentPage === number ? style.buttonActual : ""}`}
        onClick={() => handleClick(number)}
      >
        {number}
      </button>
    ))}
    <button
      className={`${style.AnteriorSiguiente} ${currentPage === pageNumbers ? style.buttonDisabled : ""}`}
      disabled={currentPage === pageNumbers}
      onClick={() => handleClick(currentPage + 1)}
    >
      Siguiente &gt;
    </button>
  </div>
);
}
