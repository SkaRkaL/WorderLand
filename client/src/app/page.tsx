"use client";
import { useEffect, useState } from "react";
import Link from 'next/link';
import Image from "next/image";
import { useTheme } from "next-themes";

export default function Home() {

  const [error, setError] = useState('');

  // useEffect(() => {
  //   fetch(process.env.NEXT_PUBLIC_API_URL + "/")
  //     .then((res) => {
  //       if (!res.ok) {
  //         throw new Error(`HTTP error! status: ${res.status}`);
  //       }
  //       return res.text();
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching data:', error);
  //       setError('Failed to connect to the server. Please make sure the server is running.');
  //     });
  // }, []);


  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <div className="w-[500px] flex flex-col gap-[40px] items-center sm:items-start">
          <h1 className="text-red-500 text-xl">{error}</h1>
        </div>
      </div>
    );
  }

  function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    return (
      <button className=" text-white w-[360px] h-[96px] bg-black flex justify-center items-center hover:border-2 hover:border-white cursor-pointer rounded-[200px]" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        Toggle Theme
      </button>
    );
  }

  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="bg-[#f8f8f8f1] flex items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* <ThemeToggle/> */}
      <div className=" flex flex-col gap-[40px] items-center sm:items-start">
        <div className="flex flex-col justify-center items-center w-full gap-4 ">
          {theme === "light" ?
            <Image
              src="/darkmode.vg"
              alt="WorderLand logo"
              width={110}
              height={20}
              priority
            /> : <Image
              src="/darkmode.svg"
              alt="WorderLand logo"
              width={110}
              height={20}
              priority
            />
          }
          <h1 className="text-[38px] font-bold tracking-tight">
            <span className="text-black"> W
              <span className="text-green-700 font-medium text-[50px]">o</span>RDER L
              <span className="text-amber-400 font-medium text-[50px]">a</span>ND
            </span>
          </h1>

          <h2 className="w-[400px] text-center text-[34px] font-semibold">
            <span className="visually-hidden">Get 6 chances to guess a 5-letter word.</span>
           
          </h2>

        </div>


        <div className="w-[400px] h-[80px] flex justify-evenly items-center mb-[28px]">

          <Link href="/signup" className="w-[180px] border-1 border-black  h-[3rem] text-black bg-[#f8f8f8f1] flex justify-center items-center hover:border-1 cursor-pointer rounded-[200px]">
            <span className="tracking-tigh text-[16px]">
              Sign in !
            </span>
          </Link>

          <Link href="/login" className="w-[180px] h-[3rem] bg-black flex justify-center items-center cursor-pointer rounded-[200px]">
            <span className="text-white tracking-tigh text-[16px]">
              Log in !
            </span>
          </Link>
        </div>

      </div>
    </div>
  );
}
