const initialState = {
  cartItems: [  ]
};

function rootReducer(state = initialState, action) {

  if (action.type === "ADD_PRODUCT") {
    let prod = state.cartItems.find( (item) => item.Id == action.payload.Id && item.IdStock.IdTalle.Id == action.payload.IdStock.IdTalle.Id);
    if(prod) {
      prod.Cantidad = prod.Cantidad + 1;
    } else{
      action.payload.IdCart = Math.random();
      state.cartItems.push(action.payload);
    }
  }
  if (action.type === "LOWER_PRODUCT") {

    let prod = state.cartItems.find( (item) => item.Id == action.payload.Id && item.IdStock.IdTalle.Id == action.payload.IdStock.IdTalle.Id);
    if(prod) {
      if (prod.Cantidad > 1){
        prod.Cantidad = prod.Cantidad - 1;
      } else {
        state.cartItems.splice(state.cartItems.indexOf(prod), 1);
      }
    }
  }
  if (action.type === "DELETE_PRODUCT") {
    let prod = state.cartItems.find( (item) => item.IdCart == action.payload);
    if(prod) {
      state.cartItems.splice(state.cartItems.indexOf(prod), 1);
    }
  }
  if (action.type === "CLEAR_STORE"){
    state.cartItems = [];
  }

  return state;
}

export default rootReducer;
