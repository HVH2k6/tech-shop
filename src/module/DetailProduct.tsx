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
import { toast } from 'react-toastify';
import Image from 'next/image';
import "@/app/grid.scss"

interface IData {
  data: Iproduct;
}

interface IComment {
  _id: string;
  comment: string;
  user_id: string;
  product_id: string;
  avatar: string;
  firstName: string;
  lastName: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  rating: number;
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
  const handleDeleteComment = async (_id: string) => {
    try {
      const res = await axios.post(`${apiComment}/delete/${_id}`);
      if (res.status === 200) {
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };
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
          setComments(res.data);
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
    socketClient.on('deleteComment', (commentId: string) => {
      setComments((prevComments) =>
        prevComments.filter((comment) => comment._id !== commentId)
      );
    });
    return () => {
      socketClient.off('newComment');
      socketClient.off('deleteComment');
    };
  }, [apiComment, idProduct]);
  const handleStarClick = (star: number) => {
    setRate(star);
  };
  const handleComment = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!userInfo) return;

    try {
      if(comment.length>0){

        const res = await axios.post(`${apiComment}/create`, {
          comment,
          user_id: userId,
          product_id: idProduct,
          avatar: userInfo.imageUrl,
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          created_at: new Date(),
          rating: rate,
        });
  
        if (res.status == 200) {
          setComment('');
          
          socketClient.emit('newComment', res.data.comment); // Emit the new comment
        }
      }else{
        toast.error("Không được để trống bình luận")
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
      <div className='container'>
          <div className="h-max p-10 bg-white mb-16">

            <div className="row">
              <div className="c-4 ">
                <div className="relative h-[400px]">

                <Image src={dataDetail.image_product}  alt="product" fill className='object-cover'/>
                </div>
                <div className="flex gap-x-6 mt-8 items-center">
                {dataDetail.image_product_sub.map((image, index) => (
                  <div className="relative w-1/3 h-40" key={index}>
                    <Image src={image}  alt="product" fill  className='object-cover'/>
                  </div>
                ))}
                </div>
              </div>
              <div className="c-8 pl-10">
               <h2 className='font-semibold text-xl mb-2'>
                {dataDetail.name_product}
               </h2>
              </div>
            </div>
          </div>
        <div className='bg-white h-max p-8 mt-20'>
          <h3 className='font-semibold text-xl mb-5'>Đánh giá</h3>
          <div>
            <form onSubmit={handleComment} autoComplete='off'>
              <StarRating starValue={0} onStarClick={handleStarClick} />
              <textarea
                className='w-full h-28 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='Write your comment...'
                value={comment}
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
                      {new Date(comment.created_at).toLocaleString('vi-VN')}
                    </span>
                    {comment.user_id === userId && (
                      <div className='flex items-center gap-x-5'>
                        <button
                          className='bg-red-500 p-2 rounded-lg text-sm font-semibold text-white'
                          onClick={() => handleDeleteComment(comment._id)}
                        >
                          Xóa
                        </button>
                      </div>
                    )}
                  </div>
                  <div className='mt-5'>
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
