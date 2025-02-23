import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import newRequest from "../../utils/newRequest";
import { toast } from "react-toastify";

// Helper function to create payload items from cartItems
const mapCartItemsToPayload = (cartItems) => {
  return cartItems
    .filter((cartItem) => cartItem.id) // Changed from _id to id
    .map((cartItem) => ({
      product: { id: cartItem.id }, // Changed from _id to id
      quantity: cartItem.quantity,
    }));
};


// Thunks for updating local cart then updating database
export const addItemToCartWithDatabaseUpdate = createAsyncThunk(
  "cart/addItemToCartWithDatabaseUpdate",
  async (product, thunkAPI) => {
    console.log("Adding product to cart:", product); // Debug log

    thunkAPI.dispatch(addItemToCart(product));

    const { cartItems } = thunkAPI.getState().cart;
    console.log("Current cart items:", cartItems); // Debug log

    const newArray = mapCartItemsToPayload(cartItems);
    console.log("Mapped payload for database:", newArray); // Debug log

    try {
      const res = await thunkAPI.dispatch(
        pushCartToDatabase({ items: newArray })
      );
      console.log("Database update response:", res); // Debug log
      return res.payload;
    } catch (error) {
      console.error("Error updating cart in database:", error);
      throw error;
    }
  }
);
export const removeItemFromCartWithDatabaseUpdate = createAsyncThunk(
  "cart/removeItemFromCartWithDatabaseUpdate",
  async (product, thunkAPI) => {
    thunkAPI.dispatch(removeItemFromCart(product));

    const { cartItems } = thunkAPI.getState().cart;
    const newArray = mapCartItemsToPayload(cartItems);

    const res = await thunkAPI.dispatch(
      pushCartToDatabase({ items: newArray })
    );
    return res.data;
  }
);

export const clearItemFromCartWithDatabaseUpdate = createAsyncThunk(
  "cart/clearItemFromCartWithDatabaseUpdate",
  async (product, thunkAPI) => {
    thunkAPI.dispatch(clearItemFromCart(product));

    const { cartItems } = thunkAPI.getState().cart;
    const newArray = mapCartItemsToPayload(cartItems);

    const res = await thunkAPI.dispatch(
      pushCartToDatabase({ items: newArray })
    );
    return res.data;
  }
);

// Thunk to update the database cart using the updated local cart
export const pushCartToDatabase = createAsyncThunk(
  "cart/pushCartToDatabase",
  async (cartItemsPayload, thunkAPI) => {
    try {
      console.log("Sending cart update to database:", cartItemsPayload); // Debug log
      const res = await newRequest.post("/carts/set", cartItemsPayload.items);
      console.log("Database response:", res.data); // Debug log
      return res.data;
    } catch (err) {
      console.error("Error in pushCartToDatabase:", err);
      toast.error(err.response?.data || "Error updating cart in database");
      return thunkAPI.rejectWithValue(err.response?.data || "Error");
    }
  }
);

export const fetchCartFromDatabase = createAsyncThunk(
  "cart/fetchCartFromDatabase",
  async (userId, thunkAPI) => {
    if (!userId) {
      const errorMsg = "User id is undefined when fetching cart.";
      console.error(errorMsg);
      toast.error(errorMsg);
      return thunkAPI.rejectWithValue(errorMsg);
    }
    try {
      const res = await newRequest.get(`/carts/${userId}`);
      console.log("Fetched cart data:", res.data); // Debug log
      return res.data;
    } catch (err) {
      console.error("Error fetching cart:", err);
      toast.error(err.response?.data || "Error fetching cart from database");
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Local cart modifications
const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id // Changed from _id to id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id // Changed from _id to id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id // Changed from _id to id
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter(
      (cartItem) => cartItem.id !== cartItemToRemove.id // Changed from _id to id
    );
  }

  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id // Changed from _id to id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (cartItems, cartItemToClear) =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id); // Changed from _id to id

// Initial state
const CART_INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  isPushCartToDatabaseLoading: false,
  isPushCartToDatabaseSuccess: false,
  isFetchCartFromDatabaseLoading: false,
  isFetchCartFromDatabaseSuccess: false,
  error: null,
};

// Create the slice
export const cartSlice = createSlice({
  name: "cart",
  initialState: CART_INITIAL_STATE,
  reducers: {
    addItemToCart: (state, action) => {
      state.cartItems = addCartItem(state.cartItems, action.payload);
    },
    removeItemFromCart: (state, action) => {
      state.cartItems = removeCartItem(state.cartItems, action.payload);
    },
    clearItemFromCart: (state, action) => {
      state.cartItems = clearCartItem(state.cartItems, action.payload);
    },
    setIsCartOpen: (state, action) => {
      state.isCartOpen = action.payload;
    },
    convertCartData: (state, action) => {
      // Here simply update cartItems with the fetched payload.
      state.cartItems = action.payload;
    },
    resetCartAction: (state, action) => {
      return CART_INITIAL_STATE;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(pushCartToDatabase.pending, (state, action) => {
        state.isPushCartToDatabaseLoading = true;
        state.isPushCartToDatabaseSuccess = false;
      })
      .addCase(pushCartToDatabase.fulfilled, (state, action) => {
        state.isPushCartToDatabaseLoading = false;
        state.isPushCartToDatabaseSuccess = true;
      })
      .addCase(pushCartToDatabase.rejected, (state, action) => {
        state.isPushCartToDatabaseLoading = false;
        state.isPushCartToDatabaseSuccess = false;
      })
      .addCase(fetchCartFromDatabase.pending, (state, action) => {
        state.isFetchCartFromDatabaseLoading = true;
        state.isFetchCartFromDatabaseSuccess = false;
      })
      .addCase(fetchCartFromDatabase.fulfilled, (state, action) => {
        state.cartItems = action.payload;
        state.isFetchCartFromDatabaseLoading = false;
        state.isFetchCartFromDatabaseSuccess = true;
      })
      .addCase(fetchCartFromDatabase.rejected, (state, action) => {
        state.isFetchCartFromDatabaseLoading = false;
        state.isFetchCartFromDatabaseSuccess = false;
        state.error = action.error.message;
      });
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
  setIsCartOpen,
  convertCartData,
  resetCartAction,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
export const selectCartItems = (state) => state.cart.cartItems;
