import React, { useEffect } from "react";
import Card from "../Card/Card";
import style from "./ProductCards.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getTools } from "../../../redux/actions";
import Pagination from "../../Pagination/Pagination";

const ProductCards = () => {
  const allTools = useSelector((state) => state.toolsShown);
  const currentPage = useSelector((state) => state.currentPage);
  const itemsPerPage = 12;

  const dispatch = useDispatch();

  useEffect(() => {
    try {
      dispatch(getTools());
    } catch (error) {
      console.log("Error al obtener los datos de los productos", error);
    }
  }, [dispatch]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const toolsToShow = allTools.slice(startIndex, endIndex);

  if (toolsToShow.length === 0) {
    return <div>No hay herramientas para mostrar en esta página.</div>;
  }

  return (
    <div>
      <div>
        <Pagination />
      </div>
      <div className={style.container}>
        {toolsToShow.map((tool) => (
          <Card key={tool.id} {...tool} />
        ))}
      </div>
      <div>
        <Pagination />
      </div>
    </div>
  );
};

export default ProductCards;
