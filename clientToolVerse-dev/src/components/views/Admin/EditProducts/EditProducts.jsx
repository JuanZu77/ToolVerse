import React, { useEffect, useState } from "react";
import styles from "./EditProducts.module.css";
import { getTools, setCurrentPage } from "../../../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Pagination from "../../../Pagination/Pagination";
import SearchBar from "../SearchBarAdmin/searchBar";
import Filters from '../../../Filters/Filters';
import swal from "sweetalert2";


const EditProducts = () => {
  const allProducts = useSelector((state) => state.toolsShown);
  const currentPage = useSelector((state) => state.currentPage)
  const dispatch = useDispatch();
  const itemsPerPage = 12;

  const [editData, setEditData] = useState({});

  useEffect(() => {
    try {
      dispatch(getTools());
    } catch (error) {
      console.log("Error al obtener los productos:", error);
    }
  }, [dispatch]);

  const handleEdit = (id, name, model, brand, price, detail ) => {
    setEditData((prevEditData) =>({
      ...prevEditData, [id]: {
      id,
      name,
      model,
      brand,
      price,
      detail
      }
    }))
  };

  const handleSave = async (id) => {
    try {
      const editedProduct = editData[id];

    if(editedProduct) {
      const {name, model, brand, price, detail} = editedProduct;
      await axios.put(`http://localhost:3001/products/${id}`, {
      name,
      model,
      brand,
      price,
      detail
    });
    //La unica linea que puse para que los inputs se actualizen simultaneamente :)
    await dispatch(getTools());

    setEditData((prevEditData) => {
      const updatedEditData = {...prevEditData};
      delete updatedEditData[id];
      return updatedEditData;
    })
    };
    console.log(`PUT request http://localhost:3001/products/${id}`);
    return new swal({
      title: "Success",
      text: "Edicion exitosa",
      icon: "success",
      showConfirmButton: false,
      timer: 2000
    })

    } catch (error) {
      console.log("Error updating", error);
    }
  };

  const handleCancel = (id) => {
    setEditData((prevEditData) => {
      const updatedEditData = {...prevEditData};
      delete updatedEditData[id];
      return updatedEditData;
    })
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const toolsShown = allProducts.slice(startIndex, endIndex);

  return (
    <div >
      <SearchBar />
      <Filters />
      <div className={styles.button}>
                    <input type="submit" value="Restablecer filtros" onClick={() => {
                        dispatch(getTools());
                        dispatch(setCurrentPage(1));
                    }} />
                </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Producto</th>
            <th>Modelo</th>
            <th>Marca</th>
            <th>Precio</th>
            <th>Detalles</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {toolsShown.length === 0 ? (
            <tr>
              <td>No hay productos para mostrar</td>
            </tr>
          ) : (
            toolsShown.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{editData[product.id] ? (
                  <input
                    type="text"
                    value={editData[product.id].name}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      setEditData((prevEditData) => ({
                        ...prevEditData, 
                        [product.id] : {
                          ...prevEditData[product.id],
                          name: newValue
                        },
                      }))
                    }}

                  />
                ) : (
                  product.name
                )}
                </td>
                <td>{editData[product.id] ? (
                  <input
                    type="text"
                    value={editData[product.id].model}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      setEditData((prevEditData) => ({
                        ...prevEditData, 
                        [product.id] : {
                          ...prevEditData[product.id],
                          model: newValue
                        },
                      }))
                    }}

                  />
                ) : (
                  product.model
                )}
                </td>
                <td>{editData[product.id] ? (
                  <input
                    type="text"
                    value={editData[product.id].brand}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      setEditData((prevEditData) => ({
                        ...prevEditData, 
                        [product.id] : {
                          ...prevEditData[product.id],
                          brand: newValue
                        },
                      }))
                    }}

                  />
                ) : (
                  product.brand
                )}
                </td>
                <td>{editData[product.id] ? (
                  <input
                    type="number"
                    value={editData[product.id].price}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      setEditData((prevEditData) => ({
                        ...prevEditData, 
                        [product.id] : {
                          ...prevEditData[product.id],
                          price: newValue
                        },
                      }))
                    }}

                  />
                ) : (
                  product.price
                )}
                </td>
                <td>{editData[product.id] ? (
                  <textarea
                    type="text"
                    value={editData[product.id].detail}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      setEditData((prevEditData) => ({
                        ...prevEditData, 
                        [product.id] : {
                          ...prevEditData[product.id],
                          detail: newValue
                        },
                      }))
                    }}

                  />
                ) : (
                  product.detail
                )}
                </td>
                <th className={styles.actionsHeader}>
                {editData[product.id] ? (
                  <>
                  <button onClick={() => handleSave(product.id)} className={styles.button}>Aceptar</button>
                  <button onClick={() => handleCancel(product.id)} className={styles.button}>Cancelar</button>
                  </>
                ) : (
                  <button onClick={() => handleEdit(product.id, product.name, product.model, product.brand, product.price, product.detail)} className={styles.button}>Editar</button>
                )}
                  
                </th>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <Pagination/>
    </div>
  );
};

export default EditProducts;
