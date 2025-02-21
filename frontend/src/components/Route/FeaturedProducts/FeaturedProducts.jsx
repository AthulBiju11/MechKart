import React, { useContext } from 'react'
import Styles from '../../../styles/style';
import Card from '../../Card/card';
import { ProductsContext } from '../../../context/productContext';

const FeaturedProducts = () => {

  const {data} = useContext(ProductsContext);

  

  return (
    <div>
        {/* Heading */}
        <div className={`${Styles.section}`}>
            <div className={`${Styles.heading} mt-[50px] flex justify-center`}>
                <h1>
                    Featured Products
                </h1>
            </div>
        </div>
        {/* Heading */}


        {/* product card */}
        <div className="flex justify-center">
        <div className="grid grid-cols-4 gap-[10px]">
{data && 
  data.filter((product) => product.attribute.featured || product.attribute.trending  === true).map((product,i) => {
    
    return <Card product={product} key={i}/>
  })
}
</div>



</div>

    </div>
  )
}

export default FeaturedProducts