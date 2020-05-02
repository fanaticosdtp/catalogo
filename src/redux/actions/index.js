export function addProduct(payload) {

  return { type: "ADD_PRODUCT", payload }
};

export function deleteProduct(payload) {
  return { type: "DELETE_PRODUCT", payload }
};

export function lowerProduct(payload) {
  return { type: "LOWER_PRODUCT", payload }
};

export function clearStore() {
  return { type: "CLEAR_STORE" }
};
