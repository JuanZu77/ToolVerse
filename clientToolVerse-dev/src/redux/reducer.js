import {
  ADD_TO_CART,
  CLEAN_BDD,
  CREATE_USER,
  GET_USER,
  GET_TOOLS,
  GET_TOOLS_BY_ID,
  GET_TOOLS_BY_NAME,
  ORDER_BY_NAME,
  ORDER_BY_PRICE,
  REMOVE_FROM_CART,
  LESS_FROM_CART,
  SET_CURRRENT_PAGE,
  CHANGE_FILTER_CATEGORY,
  CHANGE_FILTER_BRAND,
  LOGIN,
  CERRAR_SESION,
  ERROR_LOGIN,
  ISAUTHENTICATED,
  UPDATE_TOOL_STOCK,
  REGISTER_STOCK_EXIT_SUCCESS,
  REGISTER_STOCK_EXIT_FAILURE,
  ACTUAL_USER,
  DELETE_TROLLEY,
  GET_CATEGORY,
  ADD_REVIEW,
  UPDATE_REVIEW_COMMENTS,
  DELETE_REVIEW,
  SET_IS_AUTHENTICATED,
  GET_SHIPPING_ADDRESS_SUCCESS,
  SET_LAST_VISITED_ROUTE,
  GET_USER_ID,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  CREATE_CART_BDD,
  ADD_TO_CART_SUCCESS,
  SELECT_ADDRESS,
  ORDERS,
  DELETE_ORDER,
  INTERSECT,
  // YES_CART_ERROR,
  // NO_CART_ERROR
} from "./type";

const initialState = {
  allTools: [], // guardamos aquí TODAS LAS TOOLS
  toolsShown: [], // éstas son las tools que van a renderizarse
  toolsDetail: {}, // Tendra la informacion detallada de cada tools.
  usersCreated: [], // Aca guardaremos nuestras User Creadas del FORM. npmbre del array MODIFICABLE
  actualUser: {}, // temporal -> el usuar
  itemCart: [], // Aca almacenaremos todos los productos cargados en el carrito
  currentPage: 1,
  login: [], // aquí veremos el user una vez que haga hecho logIn
  errorLogin: "",
  isAuthenticated: false,
  address: [],
  cartError: true,
  category: [],
  reviews: [],
  lastVisitedRoute: "/",
  user: {},
  updateUserError: null,
  addressSelected: '',
  orders: [],
  byCategory: [],
  byBrand: [],

};

function intersection(arr1, arr2, arr3) {
    var data = [arr1, arr2, arr3]
  var result = data.reduce((a, b) => a.filter(c => b.includes(c)));
  return result
}

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_TOOLS:
      return {
        ...state,
        allTools: payload,
        toolsShown: payload,
        byBrand: payload,
        byCategory: payload,
      };
    case GET_TOOLS_BY_NAME:
      return {
        ...state,
        toolsShown: payload,
      };
    case GET_TOOLS_BY_ID:
      return {
        ...state,
        toolsDetail: payload,
      };
    case CREATE_USER:
      return {
        ...state,
        usersCreated: [...state.usersCreated, payload],
      };
    case GET_USER:
      return {
        ...state,
        usersCreated: payload,
      };
    case GET_USER_ID:
      return {
        ...state,
        user: payload,
      };

    // case YES_CART_ERROR:
    //   return {
    //     ...state,
    //     cartError: true
    //   };

    // case NO_CART_ERROR:
    //   return {
    //     ...state,
    //     cartError: false
    //   };

    case ADD_TO_CART:
      const itemId = payload.id;
      const existingItemIndex = state.itemCart.findIndex(
        (item) => item.id === itemId
      );

      // Si el elemento no existe, lo agrega con una quantity = 1
      if (existingItemIndex === -1) {
        payload.quantity = 1;
        return {
          ...state,
          itemCart: [...state.itemCart, payload],
        };
      }
      // Si el elemento existe, aumenta su cantidad en 1
      else {
        const updatedCart = state.itemCart.map((item) => {
          if (item.id === itemId) {
            if (item.quantity >= 5) return item;
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          } else return item;
        });
        return {
          ...state,
          itemCart: updatedCart,
        };
      }

    case REMOVE_FROM_CART:
      return {
        ...state,
        itemCart: state.itemCart.filter((prod) => prod.id !== payload),
      };

    case LESS_FROM_CART:
      let resta = [];
      state.itemCart.forEach((item) => {
        if (item.id === payload) {
          if (item.quantity === 1) {
            return 0;
          }
          if (item.quantity > 1) {
            let lessItem = {
              ...item,
              quantity: item.quantity - 1,
            };
            return resta.push(lessItem);
          }
        } else {
          resta.push(item);
        }
      });
      return {
        ...state,
        itemCart: resta,
      };

    case DELETE_TROLLEY:
      return {
        ...state,
        itemCart: [],
      };

    case CREATE_CART_BDD:
      let cartCreated = {
        purchaseCartId: payload,
      }
      return {
        ...state,
        cartBDD: cartCreated
      }

    case ADD_TO_CART_SUCCESS:
      return {
        ...state,
        cartBDD: { ...state.cartBDD, details: payload }
      }

    case SET_CURRRENT_PAGE:
      return {
        ...state,
        currentPage: payload,
      };
    case CLEAN_BDD:
      return {
        ...state,
        toolsShown: [],
      };

    case CHANGE_FILTER_CATEGORY:
      const categoryFiltered = state.allTools.filter((e) =>
        e.category.includes(payload)
      );
      return {
        ...state,
        byCategory: categoryFiltered,
      };

    case CHANGE_FILTER_BRAND:
      const brandFiltered = state.allTools.filter((e) => e.brand === payload);
      return {
        ...state,
        byBrand: brandFiltered,
      };
      case INTERSECT:
        let interseccionado = intersection(state.allTools, state.byCategory, state.byBrand)
        return {
            ...state,
            toolsShown: interseccionado
        };
    case ORDER_BY_NAME:
      const productsName = [...state.toolsShown];
      const sortProductsName = productsName.sort((a, b) => {
        if (a.name > b.name) {
          return payload === "de A-Z" ? 1 : -1;
        }
        if (a.name < b.name) {
          return payload === "de A-Z" ? -1 : 1;
        } else return 0;
      });

      return {
        ...state,
        toolsShown: [...sortProductsName],
      };

    case ORDER_BY_PRICE:
      const productsPrice = [...state.toolsShown];
      const sortProductsPrice = productsPrice.sort((a, b) => {
        if (a.price < b.price) {
          return payload === "Ascendente" ? -1 : 1;
        }
        if (a.price > b.price) {
          return payload === "Ascendente" ? 1 : -1;
        }
        return 0;
      });
      return {
        ...state,
        toolsShown: [...sortProductsPrice],
      };

    case UPDATE_TOOL_STOCK:
      // Actualizar el estado de las herramientas después de registrar una entrada o salida de stock
      const { productId, newStock } = payload;
      const updatedAllTools = state.allTools.map((tool) =>
        tool.id === productId ? { ...tool, stock: newStock } : tool
      );
      return {
        ...state,
        allTools: updatedAllTools,
      };
    case REGISTER_STOCK_EXIT_SUCCESS:
      // Actualizar el estado de las herramientas después de registrar una entrada o salida de stock
      const updatedStock = state.allTools.map((tool) =>
        tool.id === payload.id ? { ...tool, stock: payload.stock } : tool
      );
      return {
        ...state,
        allTools: updatedStock,
      };
    case REGISTER_STOCK_EXIT_FAILURE:
      return {
        ...state,
        error: payload,
      };
    case LOGIN:
      return {
        ...state,
        login: payload,
      };

    case ACTUAL_USER:
      return {
        ...state,
        actualUser: payload,
      };

    case CERRAR_SESION:
      return {
        ...state,
        isAuthenticated: false,
        actualUser: {},
        itemCart: [],
      };
    case ISAUTHENTICATED:
      return {
        ...state,
        isAuthenticated: true,
      };
    case SET_IS_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: payload,
      };
    case SET_LAST_VISITED_ROUTE:
      return {
        ...state,
        lastVisitedRoute: payload,
      };
    case ERROR_LOGIN:
      return {
        ...state,
        errorLogin: payload,
      };
    case GET_CATEGORY:
      return {
        ...state,
        category: payload,
      };
    case ADD_REVIEW:
      return {
        ...state,
        reviews: [...state.reviews, payload],
      };
    case UPDATE_REVIEW_COMMENTS:
      const { id, comments } = payload;
      return {
        ...state,
        reviews: state.reviews.map((review) =>
          review.id === id ? { ...review, comments } : review
        ),
      };
    case DELETE_REVIEW:
      const reviewId = payload;
      return {
        ...state,
        reviews: state.reviews.filter((review) => review.id !== reviewId),
      };
    case GET_SHIPPING_ADDRESS_SUCCESS:
      // console.log('Datos recibidos en GET_SHIPPING_ADDRESS_SUCCESS:', payload);
      return {
        ...state,
        address: payload,
      };

    case SELECT_ADDRESS:
      return {
        ...state,
        addressSelected: payload
      }

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        actualUser: payload, // ACA actualizamos los datos del usuario actualizado
        updateUserError: null, // OJO  para reiniciar el error en caso de que haya ocurrido anteriormente
      };
    case UPDATE_USER_ERROR:
      return {
        ...state,
        updateUserError: payload, // ACA almacenamos el error en caso de que ocurra un error al actualizar el usuario
      };
    case ORDERS:
      return {
        ...state,
        orders: payload,
      };
    case DELETE_ORDER:
      return {
        ...state,
        orders: state.orders.filter(order => order.id !== payload),
      };
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
