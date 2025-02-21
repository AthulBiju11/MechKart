import React, { useContext } from 'react'
import Styles from '../../styles/style';
import Card from '../Card/card'
import { ProductsContext } from '../../context/productContext';

const Categories2 = () => {

  const {data} = useContext(ProductsContext);

  

  return (
    <div>
        {/* Heading */}
        <div className={`${Styles.section}`}>
            <div className={`${Styles.heading} mt-[50px] flex justify-center`}>
                <h1>
                    Power and Generating Sets
                </h1>
            </div>
        </div>
        {/* Heading */}


        {/* product card */}
<div className='flex float-left w-[100%] justify-center'>
{data && 
  data.filter((product) => product.cat  === 'pg' || product.cat  === 'PG').map((product,i) => {
    
    return <Card product={product} key={i}/>
  })
}


</div>



    </div>



  )
}

export default Categories2