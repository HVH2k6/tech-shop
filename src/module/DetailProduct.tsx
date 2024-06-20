'use client';
import React, { useEffect, useState, FormEvent } from 'react';
import Iproduct from '@/type/back-end';
import IUser from '@/type/back-end';

import { useAuth } from '@clerk/nextjs';
import axios from 'axios';
import { API_URL } from '@/utils/constants';
import socketClient from '@/config/socket';
import Link from 'next/link';
import StarRating from '@/components/rate/Rate';



interface IData {
  data: Iproduct;
}

interface IComment {
  comment: string;
  user_id: string;
  product_id: string;
  avatar: string;
  firstName: string;
  lastName: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  rating:number
}

const DetailProduct: React.FC<IData> = ({ data }) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<IComment[]>([]); // State to hold comments
  const [loading, setLoading] = useState(false);
  const { userId } = useAuth();
  const idProduct = data?._id;
  const apiComment = API_URL.Comment_url;
  const apiUser = API_URL.Clerk_url;
  const [rate, setRate] = useState(0);
  const [userInfo, setUserInfo] = useState<IUser | null>(null);

  useEffect(() => {
    async function fetchDataUserComment() {
      const res = await axios.get(`${apiUser}/${userId}`);
      if (res.status === 200) {
        setUserInfo(res.data);
      }
    }
    fetchDataUserComment();
  }, [apiUser, userId]);

  useEffect(() => {
    const getCommentProduct = async () => {
      try {
        const res = await axios.get(`${apiComment}/get-all/${idProduct}`);
        if (res.status === 200) {
          setComments(res.data); // Assuming the response data is an array of comments
        }
      } catch (error) {
        console.error('Error getting comments:', error);
      }
    };

    getCommentProduct();

    socketClient.on('newComment', (newComment: IComment) => {
      if (newComment.product_id === idProduct) {
        setComments((prevComments) => [...prevComments, newComment]);
      }
    });

    // Cleanup on component unmount
    return () => {
      socketClient.off('newComment');
    };
  }, [apiComment, idProduct]);
  const handleStarClick = (star:number) => {
    setRate(star);
  };
  const handleComment = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!userInfo) return;

    try {
      const res = await axios.post(`${apiComment}/create`, {
        comment,
        user_id: userId,
        product_id: idProduct,
        avatar: userInfo.imageUrl,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        created_at: new Date(),
        rating: rate
      });

      if (res.status === 200) {
        setComment('');
        socketClient.emit('newComment', res.data.comment); // Emit the new comment
      }
    } catch (error) {
      console.error('Error posting comment:', error);
    } finally {
      setLoading(false);
    }
  };

  const dataDetail = data;

  return (
    <div className='min-h-screen bg-[#e5e6e9] pb-20'>
      <div className='container py-10'>
        <div className='bg-white h-max p-8'>
          <div className='mb-5'>
            <h2 className='font-semibold text-2xl'>
              {dataDetail.name_product}
            </h2>
            <div className='flex items-center gap-x-6 mt-5'>
              <Link href='/' className='text-blue-500 font-medium'>
                Danh mục
              </Link>
              <div className='flex items-center gap-x-1'>
                {new Array(4).fill(0).map((_, index) => (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    className='size-6 fill-yellow-500'
                    key={index}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z'
                    />
                  </svg>
                ))}
              </div>
            </div>
            <div className='mt-10 grid grid-cols-[300px_1fr] '>
              <div className='w-full'>
                <img
                  src={dataDetail.image_product}
                  alt={dataDetail.name_product}
                  className=' h-[300px] object-cover'
                />
              </div>
              <div className=' pl-36'>
                <div className='flex items-center font-medium text-xl gap-x-6'>
                  <span className='line-through text-stone-300'>
                    {dataDetail.price_product}
                  </span>
                  <span className='text-red-500 '>
                    {Math.floor(dataDetail.price_product) -
                      (dataDetail.price_product / 100) * dataDetail.sale}
                  </span>
                  <span className='bg-blue-500 text-white px-3 py-2 font-semibold rounded-lg text-sm'>
                    {dataDetail.sale}%
                  </span>
                </div>
                <div className='mt-5 flex items-center '>
                  <div className='flex items-center border-2 shadow-lg p-2 rounded-md'>
                    <div className='mr-5'>
                      <img
                        src='https://images.unsplash.com/photo-1718471472310-77a63c5fad95?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                        alt=''
                        className='w-10 h-12 object-cover'
                      />
                    </div>
                    <div className=''>
                      <span className='text-sm block'>Màu sắc</span>
                      <span className='text-sm block'>Bộ nhớ</span>
                      <span className='text-sm inline-block font-semibold'>
                        100000 usd
                      </span>
                    </div>
                  </div>
                </div>

                <div className='mt-5 flex items-center'>
                  <div className='flex items-center gap-x-4'>
                    <button className='w-10 h-10 flex items-center justify-center bg-[#edeef5] rounded-full'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='size-6'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M5 12h14'
                        />
                      </svg>
                    </button>
                    <input
                      className='font-semibold text-xl border-none outline-none w-10 text-center '
                      value={1}
                      type='text'
                      name='quantity'
                      disabled
                    />
                    <button className='w-10 h-10 flex items-center justify-center bg-[#edeef5] rounded-full'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='size-6'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M12 4.5v15m7.5-7.5h-15'
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className='flex items-center gap-x-6 mt-5'>
                  <button className='px-3 py-2 font-semibold text-white rounded-lg bg-blue-500'>
                    Mua ngay
                  </button>
                  <button className='px-3 py-2 font-semibold text-white rounded-lg bg-green-500'>
                    Thêm vào giỏ hàng
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='bg-white h-max p-8 mt-20'>
          <h3 className='font-semibold text-xl mb-5'>Mô tả</h3>
          <div dangerouslySetInnerHTML={{ __html: dataDetail.description }} />
        </div>
        <div className='bg-white h-max p-8 mt-20'>
          <h3 className='font-semibold text-xl mb-5'>Đánh giá</h3>
          <div>
            <form onSubmit={handleComment} autoComplete='off'>
            <StarRating starValue={0} onStarClick={handleStarClick} />
              <textarea
                name='comment'
                className='w-full border-2 outline-none h-10'
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
              <button
                type='submit'
                disabled={loading}
                className='px-3 py-2 bg-slate-400 rounded-lg text-white font-semibold'
              >
                {loading ? 'Posting...' : 'Comment'}
              </button>
            </form>
          </div>
          <div className='mt-5'>
            <h4 className='font-semibold text-lg mb-10'>Comments</h4>
            <ul>
              {comments.map((comment, index) => (
                <div className='mb-7' key={index}>
                 
                  <div className='flex items-center text-sm'>
                    <img
                      src={comment.avatar}
                      alt='avatar'
                      className='size-10 object-cover rounded-full'
                    />
                    <strong className='ml-2 text-blue-500'>
                      {comment.firstName} {comment.lastName}
                    </strong>
                    <span className='ml-2 inline-block'>
                      {new Date(comment.created_at).toLocaleString("vi-VN")}
                      
                    </span>
                    <div className="flex items-center gap-x-5">
                    <button className='bg-red-500 p-2 rounded-lg text-sm font-semibold text-white'>Xóa</button>
                    </div>

                  </div>
                  <div className="mt-5">
                  <div className='flex items-center gap-x-1'>
                {new Array(comment.rating).fill(0).map((_, index) => (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    className='size-6 fill-yellow-500'
                    key={index}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z'
                    />
                  </svg>
                ))}
              </div>
                  </div>
                  <p className='block mt-5'>{comment.comment}</p>
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
