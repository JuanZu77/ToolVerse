import React, { useRef, useEffect, useState } from "react";
import styles from "./CreateProduct.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getCategory, getTools } from "../../../../redux/actions";
import axios from "axios";
import CloudinaryUploadWidget from "../../CloudinaryUploadWidget/CloudinaryUploadWidget";

const CreateProduct = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategory(),
    getTools())
  }, [dispatch]);

  const categoria = useSelector((state) => state.category);
  const imageRef = useRef()

  const [product, setProduct] = useState({
    brand: "",
    name: "",
    model: "",
    feature: "",
    detail: "",
    price: "",
     image: "",
    category: [],
    stock: "",
  });
  const [error, setError] = useState({
    brand: "",
    name: "",
    model: "",
    feature: "",
    detail: "",
    price: "",
     image: "",
    category: "",
    stock: "",
  });

  const handlerProduct = (e) => {

    if(e.target.name !== "image"){
      let inputsAux = {...product, [e.target.name]: e.target.value}
      setProduct(inputsAux);
    }
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    alert("Enviando. . . . .");
    const imageUrl = typeof product.image === 'object' ? product.image.url : product.image;
    console.log("URL generada por Cloudinary:", imageUrl);
    const productDataToSend = { ...product, image: imageUrl };
  
    axios
      .post(`/products`, productDataToSend)
      .then((res) => {
        console.log(res)
        alert("Producto Creado Correctamente");
        setProduct({
          ...product,
          brand: "",
          name: "",
          model: "",
          feature: "",
          detail: "",
          price: "",
          image: "",
          category: [],
          stock: "",
        });
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          alert("Bad Request: Invalid Product Data");
        } else {
          alert("Error" + error.message);
        }
      });
  };
  
  const handlerSelect = (e) => {
    const { options } = e.target;
    const selectedCategories = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedCategories.push(parseInt(options[i].value));
      }
    }
    setProduct({ ...product, category: selectedCategories });
  };
  const buscaId = (id) => {
    const buscaCategory = categoria.find((busca) => busca.id === id);
    return buscaCategory ? buscaCategory.name : ""
  };
  const categoryMap = product.category?.map((e) => buscaId(e)) || [];
  
  return (
    <div className={styles.divColor}>
      <div>
        <form onSubmit={handlerSubmit} className={styles.formContainer}>
          {/* Nombre */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="name">
              Nombre:
            </label>
            <input
              className={styles.formInput}
              type="text"
              id="name"
              value={product.name}
              onChange={handlerProduct}
              name="name"
              placeholder="Nombre del producto"
              required
            />
            <span>{error.name ? error.name : " "}</span>
          </div>
  
          {/* Marca */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="brand">
              Marca:
            </label>
            <select
              className={styles.formSelect}
              name="brand"
              id="brand"
              onChange={handlerProduct}
              placeholder="Seleccion de Marca"
            >
              <option value="">Selección de Marca</option>
              <option value="Makita">Makita</option>
              <option value="Einhell">Einhell</option>
              <option value="Dewalt">Dewalt</option>
              <option value="Truper">Truper</option>
              <option value="Stanley">Stanley</option>
              <option value="Irwin">Irwin</option>
              <option value="Bosh">Bosh</option>
            </select>
            <span>{error.brand}</span>
          </div>
  
          {/* Modelo */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="model">
              Modelo:
            </label>
            <input
              className={styles.formInput}
              type="text"
              id="model"
              value={product.model}
              onChange={handlerProduct}
              name="model"
              placeholder="Nombre del Modelo"
              required
            />
            <span>{error.model}</span>
          </div>
  
          {/* Características */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="feature">
              Características:
            </label>
            <input
              className={styles.formInput}
              id="feature"
              value={product.feature}
              onChange={handlerProduct}
              name="feature"
              placeholder="Características"
              rows={2}
              cols={25}
            />
            <span>{error.feature}</span>
          </div>
  
          {/* Detalle */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="detail">
              Detalle:
            </label>
            <input
              className={styles.formInput}
              type="text"
              id="detail"
              value={product.detail}
              onChange={handlerProduct}
              name="detail"
              placeholder="Detalles"
            />
            <span>{error.detail}</span>
          </div>
  
          {/* Precio */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="price">
              Precio ($):
            </label>
            <input
              className={styles.formInput}
              type="number"
              id="price"
              value={product.price?.toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
              onChange={handlerProduct}
              name="price"
              placeholder="Precio"
            />
          </div>
  
          {/* Subir imagen */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="image">
              Sube tu imagen desde donde quieras
            </label>
            <input
              className={styles.formInput}
              type="text"
              id="image"
              name="image"
              onChange={handlerProduct}
              value={product.image}
              hidden
            />
            <CloudinaryUploadWidget imageUrl={setProduct} inputs={product} />
            <img id="uploadedimage" src="" ref={imageRef} alt="" />
          </div>
  
          {/* Categoría */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="category">
              Categoría:
            </label>
            <input
              className={styles.formInput}
              type="text"
              id="categoryInput"
              value={categoryMap.join(", ")}
              onChange={handlerProduct}
              placeholder="Selecciona Categoria"
            />
            <select className={styles.selectedCategories}
              id="category"
              name="category"
              multiple={true}
              value={product.category}
              onChange={handlerSelect}
            >
              {categoria.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name}
                </option>
              ))}
            </select>
            <span>{error.category}</span>
          </div>
  
          {/* Stock */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="stock">
              Stock Inicial:
            </label>
            <input
              className={styles.formInput}
              type="number"
              id="stock"
              value={product.stock}
              onChange={handlerProduct}
              name="stock"
              placeholder="Stock Inicial"
            />
            <span>{error.stock}</span>
          </div>
  
          {/* Botón de envío */}
          <button className={styles.formSubmit} type="submit">
            Crear Producto
          </button>
        </form>
      </div>
    </div>
  );
  
};

export default CreateProduct;
