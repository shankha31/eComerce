import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addToWishlist,
  deleteItemFromWishlist,
  fetchWishlistItemsByUserId,
} from "./wishlistAPI";

const initialState = {
  status: "idle",
  items: [],
  wishlistLoaded: false,
};

export const addToWishlistAsync = createAsyncThunk(
  "wishlist/addToWishlist",
  async ({ item, alert }) => {
    const response = await addToWishlist(item);
    alert.success("Item Added to Wishlist");

    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchWishlistItemsByUserIdAsync = createAsyncThunk(
  "wishlist/fetchWishlistItemsByUserId",
  async () => {
    const response = await fetchWishlistItemsByUserId();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const deleteItemFromWishlistAsync = createAsyncThunk(
  "wishlist/deleteItemFromWishlist",
  async (itemId) => {
    const response = await deleteItemFromWishlist(itemId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToWishlistAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToWishlistAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items.push(action.payload);
      })
      .addCase(fetchWishlistItemsByUserIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWishlistItemsByUserIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
        state.wishlistLoaded = true;
      })
      .addCase(fetchWishlistItemsByUserIdAsync.rejected, (state, action) => {
        state.status = "idle";
        state.wishlistLoaded = true;
      })
      .addCase(deleteItemFromWishlistAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteItemFromWishlistAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items.splice(index, 1);
      });
  },
});

// export const { increment } = cartSlice.actions;

export const selectWishlistItems = (state) => state.wishlist.items;
export const selectWishlistStatus = (state) => state.wishlist.status;
export const selectWishlistLoaded = (state) => state.wishlist.wishlistLoaded;

export default wishlistSlice.reducer;
