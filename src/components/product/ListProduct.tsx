import React from 'react';
import IProduct from '@/type/back-end';


import CardProduct from './Card';
interface IListNew {
    dataCard:IProduct
}
const ListProduct = async (props: IListNew) => {

  const { dataCard } = props;
  

  return( <div className='grid grid-cols-5 gap-6'>
    {Array.isArray(dataCard) && dataCard.map((item: any, index: any) => (
      <CardProduct key={index} dataCard={item}></CardProduct>
    ))}
  </div>)
  ;
};

export default ListProduct;
