import { createContext, useContext, useEffect, useState } from "react";
import newRequest from "../utils/newRequest";
import { useQuery } from "@tanstack/react-query";
import { ProductsContext } from "./productContext";

export const CartContext = createContext({
  data: [],
  cartNumber: 0,
});

export const CartProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const { data: productData } = useContext(ProductsContext);
  const [cartItems, setCartItems] = useState([]);
  const [cartNumber, setCartNumber] = useState(null);

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["cart"],
    queryFn: () => {
      if (currentUser) {
        return newRequest.get(`/carts/${currentUser.id}`).then((res) => {
          return res.data;
        });
      }
      return Promise.resolve([]); // Return an empty array if currentUser is not set
    },
  });

  useEffect(() => {
    if (productData && data) {
      const filteredProducts = productData
        .filter((product) => data.some((item) => item.product === product._id))
        .map((product) => {
          const cartItem = data.find((item) => item.product === product._id);
          return { ...product, quantity: cartItem.quantity };
        });
      setCartItems(filteredProducts);
    }
  }, [productData, data]);

  useEffect(() => {
    const sum = cartItems?.reduce((acc, item) => {
      return acc + 1;
    }, 0);
    setCartNumber(sum);
  }, [cartItems]);

  const value = { data: cartItems, cartNumber: cartNumber };

  return (
    !isLoading && (
      <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
  );
};
