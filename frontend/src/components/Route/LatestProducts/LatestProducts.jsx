import React, { useContext } from "react";
import Styles from "../../../styles/style";
import LatestProdCard from "../../LatestProductsCard/LatestProdCard";

import { ProductsContext } from "../../../context/productContext";

const LatestProducts = () => {
  const { data } = useContext(ProductsContext);

  return (
    <div>
      {/* Heading */}
      <div className={`${Styles.section} flex justify-center`}>
        <div className={`${Styles.heading} mt-[60px]`}>
          <h1>Latest Products</h1>
        </div>
      </div>
      {/* Heading */}

      {/* items have to be linked similar to NAvbar */}

      {/* product card */}
      <div className="flex justify-center">
        <div className="grid grid-cols-3 gap-[37px]">
          {data &&
            data
              .filter((product) => product.attribute.latest === true)
              .map((product, i) => {
                return <LatestProdCard product={product} key={i} />;
              })}
        </div>
      </div>
      {/* product card */}
    </div>
  );
};

export default LatestProducts;
