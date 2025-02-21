import { createContext,} from "react";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../utils/newRequest";


export const ProductsContext = createContext({
    products : [],
})

export const ProductsProvider = ({children}) => {
 
    const { isLoading, error, data, refetch } = useQuery({
        queryKey: ["products"],
        queryFn: () =>
          newRequest.get(`/products`).then((res) => {
            return res.data;
          }),
      });

    const value = {data};
    

    return (
        <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
    )
}