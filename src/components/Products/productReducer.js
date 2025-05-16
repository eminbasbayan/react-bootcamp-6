export function reducerFunction(state, action) {
  switch (action.type) {
    case "SHOW_MODAL":
      return { ...state, isShowModal: true };
    case "HIDE_MODAL":
      return { ...state, isShowModal: false };
    case "ADD_PRODUCT":
      return { ...state, products: [action.payload, ...state.products] };
    case "DELETE_PRODUCT":
      return {
        ...state,
        products: state.products.filter((item) => item.id !== action.payload),
      };
    case "SET_PRODUCT":
      return { ...state, products: action.payload, isLoading: false };
    default:
      return state;
  }
}

export const initialState = {
  products: [],
  isShowModal: false,
  isLoading: true,
};
