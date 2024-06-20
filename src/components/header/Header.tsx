"use client"
import { UserButton, useAuth, } from '@clerk/nextjs';
import Link from 'next/link';
import React from 'react';

const Header = () => {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const HeaderMenu = [
    {
      title: 'Trang chủ',
      path: '/',
    },
    {
      title: 'Danh sách sản phẩm',
      path: '/product',
    },
    {
      title: 'Phân loại',
      path: '/category',
    },
    {
      title: 'Giới thiệu',
      path: '/about',
    },
    {
      title: 'Liên hệ',
      path: '/contact',
    },
  ];
  return (
    <header className='shadow-md py-3'>
      <div className='container flex item justify-between'>
        <div className=''>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='34'
            height='41'
            viewBox='0 0 34 41'
            fill='none'
          >
            <path
              d='M17.0331 0.945374L0.296875 10.8637V23.0708L17.0331 32.9891L30.4588 25.3596V28.9836L17.0331 36.9946L0.296875 26.8855V31.2725L17.0331 41L33.7693 31.2725V19.0653L20.3435 26.8855V23.0708L33.7693 15.0599V10.8637L17.0331 0.945374Z'
              fill='#0156FF'
            />
          </svg>
        </div>
        <ul className='flex items-center gap-x-6'>
          {HeaderMenu.map((item, index) => (
            <li key={index}>
              <Link href={item.path} className='font-semibold text-sm'>
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-x-6">
          {isSignedIn ?(
            <>
              <UserButton showName={true} />
            </>
          ):(
            <>
            <a href="/sign-in">Đăng nhập</a>
            </>
          )}           
        </div>
      </div>
    </header>
  );
};

export default Header;
