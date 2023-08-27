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

  const renderPageNumbers = [];
  for (let i = 1; i <= pageNumbers; i++) {
    renderPageNumbers.push(i);
  }

  return (
    <div className={style.divButtons}>
      <button
        disabled={currentPage === 1}
        onClick={() => handleClick(currentPage - 1)}
      >
        Anterior
      </button>
      {renderPageNumbers.map((number) => (
        <button
          key={number}
          className={currentPage === number ? style.button : ""}
          onClick={() => handleClick(number)}
        >
          {number}
        </button>
      ))}
      <button
        disabled={currentPage === pageNumbers}
        onClick={() => handleClick(currentPage + 1)}
      >
        Siguiente
      </button>
    </div>
  );
}
