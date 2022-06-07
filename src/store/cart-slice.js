import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    itemsList: [],
    totalQuantity: 0,
    showCart: false,
    changed: false,
  },
  reducers: {
    replaceData(state, action) {
      state.totalQuantity = action.payload.totalPrice;
      state.itemsList = action.payload.itemsList;
      state.totalQuantity = 0;
      state.itemsList.map((item) => {
        state.totalQuantity += item.quantity;
      });
    },
    addToCart(state, action) {
      state.changed = true;
      const newItem = action.payload;
      //check if item already exists
      const existingItem = state.itemsList.find(
        (item, index) => item.id === newItem.id
      );

      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
        state.totalQuantity++;
      } else {
        state.itemsList.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.name,
        });
        state.totalQuantity++;
      }
    },
    removeFromCart(state, action) {
      state.changed = true;
      const id = action.payload;
      const existingItem = state.itemsList.find((item) => {
        return item.id === id;
      });

      if (existingItem.quantity === 1) {
        state.itemsList = state.itemsList.filter((item) => {
          return item.id !== id;
        });
        state.totalQuantity--;
      } else {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
        state.totalQuantity--;
      }
    },
    setShowCart(state) {
      state.showCart = !state.showCart;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
