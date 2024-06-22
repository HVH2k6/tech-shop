import * as React from 'react';
import IProduct from '@/type/back-end';
import Image from 'next/image';
import Link from 'next/link';
interface IListNew {
  dataCard: IProduct;
}
const CardProduct = (dataCard: IListNew) => {
  return (
    <div className='w-full shadow-md'>
      <div className='w-full h-56 relative'>
        <Image
          src={dataCard.dataCard.image_product}
          alt={dataCard.dataCard.name_product}
          fill
          className='object-cover'
        />
        <span className='absolute top-2 left-2 text-xs font-semibold bg-blue-500 text-white p-1 rounded-lg'>
          {dataCard.dataCard.sale}%
        </span>
      </div>
      <div className='p-3'>
        <h2 className='font-semibold text-xl'>
          {dataCard.dataCard.name_product}
        </h2>
        <Link href='/' className='text-sm mt-2 text-green-400 block'>
          {dataCard.dataCard.name_category}
        </Link>
        <div className='mt-2 text-sm'>4.5 ⭐</div>
        <div className='flex items-center gap-x-6 font-semibold mt-3'>
          <span className='line-through text-gray-400 text-base'>
            {dataCard.dataCard.price_product} VNĐ
          </span>
          <span className='text-red-500'>
            {Math.floor(
              dataCard.dataCard.price_product -
                (dataCard.dataCard.price_product * dataCard.dataCard.sale) / 100
            )}{' '}
            VNĐ
          </span>
        </div>
        <Link
          href={`/product/${dataCard.dataCard.slug}`}
          className='flex items-center justify-center mt-3 w-full py-1.5 rounded-2xl border border-blue-500 text-blue-500 font-medium hover:bg-blue-500 hover:text-white'
        >
          Xem chi tiết
        </Link>
      </div>
    </div>
  );
};

export default CardProduct;
