'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import '../../app/globals.scss';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
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
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
      >
        {Array.isArray(data)
          ? data.map((item: any, index: any) => (
              <SwiperSlide key={index}>
                <div>
                  <Link className='block' href={`/products/${item.slug}`}>
                    <img
                      src={item.image_product}
                      alt=''
                      className='w-full h-full object-cover'
                    />
                  </Link>
                </div>
              </SwiperSlide>
            ))
          : null}
      </Swiper>
    </div>
  );
};

export default Banner;
