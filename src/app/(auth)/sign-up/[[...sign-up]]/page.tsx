'use client';

import * as React from 'react';
import { useSignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import '../../style.scss';
import imageAuth from '../../../../../public/sign-in-img.png';
import Link from 'next/link';

export default function Page() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [verifying, setVerifying] = React.useState(false);
  const [code, setCode] = React.useState('');
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);

  // Handle submission of the sign-up form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return;

    // Start the sign-up process using the email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
      });

      // Send the user an email with the verification code
      await signUp.prepareEmailAddressVerification({
        strategy: 'email_code',
      });

      // Set 'verifying' true to display second form
      // and capture the OTP code
      setVerifying(true);
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // Handle the submission of the verification form
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push('/');
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error('Error:', JSON.stringify(err, null, 2));
    }
  };

  // Display the verification form to capture the OTP code
  if (verifying) {
    return (
      <>
        <h1 className='font-medium mb-2'>Xác nhận quan email</h1>
        <form onSubmit={handleVerify}>
          <label id='code' className='block'>Nhập mã xác nhận</label>
          <input
            value={code}
            id='code'
            name='code'
            onChange={(e) => setCode(e.target.value)}
            className='border border-gray-300 rounded-md p-2 outline-none'
          />
          <button type='submit'>Xách nhận</button>
        </form>
      </>
    );
  }


  return (
    <div className='flex rounded-xl bg-white p-3 '>
      <div className='mr-10'>
        <div className='flex items-center gap-x-5 mb-8'>
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
          <strong>Tech shop</strong>
        </div>
        <h1 className='font-bold text-3xl mb-5'>Hello, Welcom Back</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className='mb-3'>
            <label className='block font-semibold mb-2 ' htmlFor='email'>
              Enter email address
            </label>
            <input
              className='h-10 w-72 border-2 border-gray-300 bg-transparent p-2 rounded-lg outline-none'
              id='email'
              type='email'
              name='email'
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
            />
          </div>
          <div className='mb-3'>
            <label className='block font-semibold mb-2 ' htmlFor='password'>
              Enter password
            </label>
            <input
              className='h-10 w-72 border-2 border-gray-300 bg-transparent p-2 rounded-lg outline-none'
              id='password'
              type={showPassword ? 'text' : 'password'}
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type='checkbox'
              className='relative right-5'
              onChange={() => setShowPassword(!showPassword)}
            />
          </div>

         
          <div className='mt-3'>
            Bạn đã có tài khoản{' '}
            <Link href='/sign-in' className='text-blue-500 '>
              Đăng nhập
            </Link>
          </div>

          <button
            type='submit'
            className='px-4 py-2 mt-3 bg-purple-600 font-semibold text-white rounded-lg'
          >
            Sign in
          </button>
        </form>
      </div>
      <div className='w-[460px] h-[560px]'>
        <Image
          src={imageAuth}
          alt=''
          width={460}
          height={660}
          className='image-auth'
        />
      </div>
    </div>
  );
}
