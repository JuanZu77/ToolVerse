import axios from "axios";

import {
  GET_TOOLS,
  GET_TOOLS_BY_NAME,
  GET_TOOLS_BY_ID,
  CREATE_USER,
  GET_USER,
  ADD_TO_CART,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAILURE,
  REMOVE_FROM_CART,
  LESS_FROM_CART,
  ORDER_BY_NAME,
  ORDER_BY_PRICE,
  SET_CURRRENT_PAGE,
  CLEAN_BDD,
  CHANGE_FILTER_CATEGORY,
  CHANGE_FILTER_BRAND,
  LOGIN,
  CERRAR_SESION,
  VERIFY_LOGIN_SUCCESS,
  ERROR_LOGIN,
  ISAUTHENTICATED,
  REGISTER_STOCK_ENTRY_SUCCESS,
  REGISTER_STOCK_ENTRY_FAILURE,
  REGISTER_STOCK_EXIT_SUCCESS,
  UPDATE_TOOL_STOCK,
  ACTUAL_USER,
  DELETE_TROLLEY,
  GET_CATEGORY,
  PURCHASE_ORDER_SUCCESS,
  PURCHASE_ORDER_ERROR,
  CREATE_SHIPPING_ADDRESS_SUCCESS,
  CREATE_SHIPPING_ADDRESS_ERROR,
  ADD_REVIEW,
  UPDATE_REVIEW_COMMENTS,
  DELETE_REVIEW,
  SET_IS_AUTHENTICATED,
  GET_SHIPPING_ADDRESS_SUCCESS,
  GET_SHIPPING_ADDRESS_ERROR,
  DELETE_SHIPPING_ADDRESS_SUCCESS,
  DELETE_SHIPPING_ADDRESS_ERROR,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  UPDATE_SHIPPING_ADDRESS_SUCCESS,
  UPDATE_SHIPPING_ADDRESS_ERROR,
  SET_LAST_VISITED_ROUTE,
  GET_USER_ID,
  GET_USER_ID_ERROR,
  CREATE_CART_BDD,
  ORDERS,
  DELETE_ORDER,
  SELECT_ADDRESS,
  INTERSECT,
  // YES_CART_ERROR,
  // NO_CART_ERROR
} from "./type";

export const getToolsByName = (tool) => {
  return async function (dispatch) {
    try {
      let response = await axios.get(`/products?name=${tool}`);
      if (response) {
        dispatch({
          type: GET_TOOLS_BY_NAME,
          payload: response.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getTools = () => {
  return async function (dispatch) {
    try {
      const tools = await axios.get(`/products`);
      if (tools) {
        dispatch({ type: GET_TOOLS, payload: tools.data });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getToolById = (id) => {
  return async function (dispatch) {
    try {
      const tools = await axios.get(`/products/${id}`);
      if (tools) {
        dispatch({ type: GET_TOOLS_BY_ID, payload: tools.data });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const createUser = (character) => {
  return async function (dispatch) {
    try {
      const { data } = await axios.post(`/register`, character, {
        withCredentials: true,
      });
      if (data) {
        dispatch({ type: CREATE_USER, payload: data });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const isAuthenticated = () => {
  return {
    type: ISAUTHENTICATED,
  };
};

export const setIsAuthenticated = (value) => {
  return {
    type: SET_IS_AUTHENTICATED,
    payload: value,
  };
};

export const login = (character) => {
  return async function (dispatch) {
    try {
      const { data } = await axios.post(`/login`, character, {
        withCredentials: true,
      });
      if (data) {
        const token = data.token;
        console.log("action token:", data.token);

        window.localStorage.setItem("token", token);
        //window.localStorage.setItem("islogged", true);
        console.log("Set token en action Login:", token);

        dispatch({ type: LOGIN, payload: data });
        dispatch(isAuthenticated());
      }
    } catch (error) {
      dispatch(errorLogin(error?.response?.data?.message));
      console.log(error?.response?.data?.message);
    }
  };
};

export const resGoogle = (response) => {
  return async function (dispatch) {
    try {
      const googleToken = response.tokenId; // Obtener el token de Google
      console.log(`google token action`, googleToken)
      const { data } = await axios.post('/login/google', { googleToken }, {
        withCredentials: true,
      });

      console.log('google Token', googleToken)

      if (data) {

        dispatch({ type: LOGIN, payload: data });
        dispatch(isAuthenticated());
      }
    } catch (error) {
      console.log("Error al autenticar con Google:", error);
    }
  }
};


export const errorLogin = (error) => {
  return {
    type: ERROR_LOGIN,
    payload: error,
  };
};

export const actualUser = (info) => {
  return {
    type: ACTUAL_USER,
    payload: info,
  };
};

export const verifyLoginSuccess = () => {
  return {
    type: VERIFY_LOGIN_SUCCESS,
  };
};

export const cerrarSesion = (tokenCookie) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/logout", tokenCookie, {
        withCredentials: true,
      });
      if (data) {
        window.localStorage.removeItem("token");
        return dispatch({ type: CERRAR_SESION });
      }
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };
};

export const setLastVisitedRoute = (route) => {
  return {
    type: SET_LAST_VISITED_ROUTE,
    payload: route,
  };
};

export const getUser = (name) => {
  return async function (dispatch) {
    try {
      let response = await axios.get(`/user/${name}`);
      if (response) {
        dispatch({ type: GET_USER, payload: response });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const addToCart = (item) => {
  return {
    type: ADD_TO_CART,
    payload: item,
  };
};

export const removeFromCart = (itemId) => {
  try {
    return {
      type: REMOVE_FROM_CART,
      payload: itemId,
    };
  } catch (error) {
    console.log(error);
  }
};

export const lessFromCart = (itemId) => {
  try {
    return {
      type: LESS_FROM_CART,
      payload: itemId,
    };
  } catch (error) {
    console.log(error);
  }
};

export const deleteTrolley = () => {
  try {
    return {
      type: DELETE_TROLLEY,
    };
  } catch (error) {
    console.log(error);
  }
};

export const orderByName = (name) => {
  try {
    return {
      type: ORDER_BY_NAME,
      payload: name,
    };
  } catch (error) {
    console.log(error);
  }
};

export const orderByPrice = (price) => {
  try {
    return {
      type: ORDER_BY_PRICE,
      payload: price,
    };
  } catch (error) {
    console.log(error);
  }
};

export const setCurrentPage = (page) => {
  try {
    return {
      type: SET_CURRRENT_PAGE,
      payload: page,
    };
  } catch (error) {
    console.log(error);
  }
};

export const cleanBdd = () => {
  try {
    return {
      type: CLEAN_BDD,
    };
  } catch (error) {
    console.log(error);
  }
};

export const changeFilterCategory = (category) => {
  return {
    type: CHANGE_FILTER_CATEGORY,
    payload: category,
  };
};

export const changeFilterBrand = (brand) => {
  return {
    type: CHANGE_FILTER_BRAND,
    payload: brand,
  };
};

export const intersect = () => async (dispatch) => {
  try {
    return dispatch({
      type: INTERSECT,
    });
  } catch (error) {
    return error;
  }
};

//Accion que me actualiza el Stock global
export const updateProductStock = (productId, newStock) => {
  return {
    type: UPDATE_TOOL_STOCK,
    payload: {
      productId,
      newStock,
    },
  };
};
// Acción para registrar una entrada de stock
export const registerStockEntry = (toolId, quantity) => async (dispatch) => {
  try {
    const response = await axios.post(`/stock/entrada/${toolId}/${quantity}`);
    dispatch({
      type: REGISTER_STOCK_ENTRY_SUCCESS,
      payload: { id: toolId, stock: response.data.stock },
    });
  } catch (error) {
    dispatch({
      type: REGISTER_STOCK_ENTRY_FAILURE,
      payload: error.response.data.error,
    });
  }
};

// Acción para registrar una salida de stock
export const registerStockExit = (toolId, quantity) => async (dispatch) => {
  try {
    const response = await axios.post(`/stock/salida/${toolId}/${quantity}`);
    dispatch({
      type: REGISTER_STOCK_EXIT_SUCCESS,
      payload: { id: toolId, stock: response.data.stock },
    });
  } catch (error) {
    dispatch({
      type: REGISTER_STOCK_EXIT_SUCCESS,
      payload: error.response.data.error,
    });
  }
};
//Accion de traer las categorias
export const getCategory = () => {
  return async function (dispatch) {
    try {
      const category = await axios.get(`/category`);
      if (category) {
        dispatch({ type: GET_CATEGORY, payload: category.data });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// crea el carrito -> para luego enviar los detalles de los productos
export const createCartBdd = (userId) => async (dispatch) => {
  try {
    const cartId = await axios.post("/purchaseCart", { userId: userId });

    dispatch({
      type: CREATE_CART_BDD,
      payload: cartId.data.id,
    });

    return cartId.data.id;
  } catch (error) {
    console.log(error);
  }
};

export const addDetail = (purchaseCartId, products) => async (dispatch) => {
  try {
    let compra = [];
    products.forEach(async (product) => {
      const cartDetail = await axios.post("/purchaseDetail", {
        purchaseCartId: purchaseCartId,
        productId: product.productId,
        quantity: product.quantity,
      });
      let detalle = cartDetail.data;
      const prodDetails = await axios.get(`/products/${product.productId}`);
      detalle.name = prodDetails.data.name;
      detalle.price = prodDetails.data.price;

      compra.push(detalle);
    });

    dispatch({
      type: ADD_TO_CART_SUCCESS,
      payload: compra,
    });

    return compra;
  } catch (error) {
    dispatch({
      type: ADD_TO_CART_FAILURE,
      payload: error.response.data.error,
    });
  }
};

// export const getCategory = () => {
//   return async function (dispatch) {
//     try {
//       const category = await axios.get(`/category`);
//       if (category) {
//         dispatch({ type: GET_CATEGORY, payload: category.data });
//       }
//     } catch (error) {
//       (error);
//     }
//   };
// };

export const getLastPuchasteCart = (userId) => {
  return async function () {
    try {
      const user = await axios.get(`/user/${userId}`);
      console.log("el user con toda su info", user);
      const carts = user.data.purchaseCarts;

      // Encontrar el objeto cart con el id más grande
      const cartWithMaxId = carts.reduce(
        (maxCart, currentCart) => {
          if (currentCart.id > maxCart.id) {
            return currentCart;
          }
          return maxCart;
        },
        { id: -1 }
      ); // Inicializar con un valor que asegure que cualquier cart.id será mayor

      const maxId = cartWithMaxId.id;
      return maxId;
    } catch (error) {
      console.log("Error obteniendo el último carrito de compras");
    }
  };
};

export const getProductsInCart = (purchaseCartId) => async () => {
  try {
    let details = "";
    if (purchaseCartId)
      details = await axios.get(
        `/purchaseDetail/purchaseCartId/${purchaseCartId}`
      );

    return details.data;
  } catch (error) {
    console.log("Error buscando los detalles del carrito", error);
  }
};

// carga la orden de compra en la bdd
export const addPurchaseOrder =
  (userId, purchaseCartId, shippingAddressId, paymentMethodId, total) =>
    async (dispatch) => {
      try {
        const response = await axios.post("/purchaseOrder", {
          userId,
          purchaseCartId,
          shippingAddressId,
          paymentMethodId,
          total,
        });

        dispatch({
          type: PURCHASE_ORDER_SUCCESS,
          payload: response.data,
        });
      } catch (error) {
        dispatch({
          type: PURCHASE_ORDER_ERROR,
          payload: error.response.data.error,
        });
      }
    };

//carga los datos de envio en la bdd
export const createShippingAddress = (address) => async (dispatch) => {
  try {
    const response = await axios.post("/shippingAddress", address);

    dispatch({
      type: CREATE_SHIPPING_ADDRESS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_SHIPPING_ADDRESS_ERROR,
      payload: error.response.data.error,
    });
  }
};

//traigo las direcciones de la base de datos por id de cliente
export const getShippingAddressByUserId = (userId) => async (dispatch) => {
  try {
    const response = await axios.get(`/shippingAddress/user/${userId}`);
    dispatch({
      type: GET_SHIPPING_ADDRESS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_SHIPPING_ADDRESS_ERROR,
      payload: error.response.data.error,
    });
  }
};

export const selectAddress = (address) => async (dispatch) => {
  console.log("los datos que recibe las actions", address);
  try {
    dispatch({
      type: SELECT_ADDRESS,
      payload: address,
    });
  } catch (error) {
    console.log("Error al seleccionar la dirección de envío", error);
  }
};

//Actions Reviews
export const addReview = (review) => async (dispatch) => {
  console.log("datos de review:", review);
  try {
    const response = await axios.post('/review', review)
    dispatch({ type: ADD_REVIEW, payload: response.data });
  } catch (error) {
    console.log("error al crear la review", error);
  }
};

export const updateReviewComments = (id, comments) => ({
  type: UPDATE_REVIEW_COMMENTS,
  payload: { id, comments },
});

export const deleteReview = (id) => ({
  type: DELETE_REVIEW,
  payload: id,
});

export const deleteShippingAddress = (id) => async (dispatch) => {
  try {
    const response = await axios.delete(`/shippingAddress/${id}`);
    dispatch({
      type: DELETE_SHIPPING_ADDRESS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_SHIPPING_ADDRESS_ERROR,
      payload: error.response.data.error,
    });
  }
};

export const updateShippingAddress = (id, address) => async (dispatch) => {
  try {
    const response = await axios.put(`/shippingAddress/${id}`, address);
    dispatch({
      type: UPDATE_SHIPPING_ADDRESS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_SHIPPING_ADDRESS_ERROR,
      payload: error.response.data.error,
    });
  }
};

export const getUserById = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`/user/${id}`);
    dispatch({
      type: GET_USER_ID,
      payload: response.data,
    });

    return response.data
  } catch (error) {
    dispatch({
      type: GET_USER_ID_ERROR,
      payload: error.response.data.error,
    });
  }
};

export const updateUser = (id, userData) => async (dispatch) => {
  try {
    const response = await axios.put(`/user/${id}`, userData);
    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_ERROR,
      payload: error.response.data.error,
    });
  }
};

export const getAllUsers = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`/user`);
      if (response) {
        dispatch({ type: GET_USER, payload: response.data });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const getOrders = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`/purchaseOrder`);
      if (response.data) {
        const orders = response.data; // Actualiza esto según la estructura de tu respuesta
        dispatch({
          type: ORDERS,
          payload: orders,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const deleteOrder = (orderId) => {
  return async function (dispatch) {
    try {
      await axios.delete(`/purchaseOrder/${orderId}`);
      dispatch({
        type: DELETE_ORDER,
        payload: orderId,
      });
      dispatch(getOrders()); // Actualiza la lista después de eliminar
    } catch (error) {
      console.log(error);
    }
  };
};
