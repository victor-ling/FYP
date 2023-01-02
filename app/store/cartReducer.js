import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, { payload }) {
      console.log("payload:");
      console.log(payload);
      //uid is the unique id of the item
      const { menuId, quantity } = payload;
      console.log("id:");
      console.log(menuId);

      const find = state.find((item) => item.menuId === menuId);
      if (find) {
        return state.map((item) =>
          item.menuId === menuId
            ? {
                ...item,
                quantity: item.quantity + quantity,
              }
            : item
        );
      } else {
        state.push({
          ...payload,
          quantity: quantity,
        });
      }
    },
    // increment(state, { payload }) {
    //   return state.map((item) =>
    //     item.id === payload
    //       ? {
    //           ...item,
    //           quantity: item.quantity + 1,
    //         }
    //       : item
    //   );
    // },
    // decrement(state, { payload }) {
    //   return state.map((item) =>
    //     item.id === payload
    //       ? {
    //           ...item,
    //           quantity: item.quantity - 1,
    //         }
    //       : item
    //   );
    // },
    // removeItem: (state, action) => {
    //   //   console.log(state);
    //   //   console.log(state);
    //   //   console.log(action);
    //   const itemId = action.payload;
    //   return state.filter((item) => item.id !== itemId);
    // },
    clear(state) {
      return [];
    },
  },
});

export const {
  addToCart,
  increment,
  decrement,
  removeItem,
  clear,
} = cartSlice.actions;
const cartReducer = cartSlice.reducer;

export default cartReducer;
