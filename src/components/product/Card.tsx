import * as React from 'react';
import IProduct from "@/type/back-end"
import Image from 'next/image';
interface IListNew {
  dataCard:IProduct
}
const CardProduct = (dataCard:IListNew) => {
    console.log("CardProduct ~ dataCard:", dataCard)
    return (
      <div className="w-full shadow-md">
        <div className="w-full h-52 relative">
          <Image src={dataCard.dataCard.image_product} alt="thumb"  fill className='object-cover'/>
        </div>
        <div className="p-2">
          <h2 className='font-medium text-2xl mb-2'>
            {dataCard.dataCard.name_product}
          </h2>
          <span>
            {dataCard.dataCard.price_product}
          </span>
        </div>
      </div>
    );
};

export default CardProduct;