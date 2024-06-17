'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import '../../app/globals.scss';
import IBanner from '@/type/back-end';
import Link from 'next/link';
interface IProps {
  data: IBanner;
}
const Banner = (props: IProps) => {
  const { data } = props;

  return (
    <div className='container max-h-[500px] absolute'>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {Array.isArray(data)
          ? data.map((item: any, index: any) => (
              <SwiperSlide key={index}>
                <Link className='block' href={`/products/${item.slug}`}>
                  <img
                    src={item.image_product} 
                    alt=''
                    className='w-full h-full object-cover'
                  />
                </Link>
              </SwiperSlide>
            ))
          : null}
      </Swiper>
    </div>
  );
};

export default Banner;
