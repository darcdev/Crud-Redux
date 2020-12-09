// Cada Reducer tiene su propio state
const initialState = {
  productos: [],
  error: false,
  loading: false,
};
function productosReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
export default productosReducer;
