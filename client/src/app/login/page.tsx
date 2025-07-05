"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import Link from 'next/link';
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';



export default function page() {


  const [name, setName] = useState('');
  const [usename, setUsename] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const router = useRouter();

  const handleNavigation = () => {
    router.push('/profile');
  };



  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);

    console.log(`email changed to: ${e.target.value}`);
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);

    console.log(`Password changed to: ${e.target.value}`);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    try {
      const respone = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/api/users/login",
        {
          email: email,
          password: password
        }
      );

      if (respone.status === 200) {
        setError('');
        handleNavigation();
      }

      else {
        console.error('Unexpected response status:', respone.status);
        setError(`Unexpected response status: ${respone.status}`);
      }

    }
    catch (error: any) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        // Handle unauthorized error
        console.error('Unauthorized: Invalid credentials');
        setError('Invalid email or password. Please try again.');
      }

      else if (axios.isAxiosError(error)) {
        // Handle Axios error
        setError(`Error: ${error.response?.data || error.message}`);
      }

      else {
        // Handle other errors
        console.error('Unexpected error:', error);
        setError('An unexpected error occurred. Please try again later.');
      }

    }

  }

  // Add error message to the UI
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-[#f8f8f8f1] flex items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="w-[450px] flex flex-col gap-[40px] items-center p-8 sm:items-start bg-[#FFFFFF] rounded-[25px]">

        <div className="flex flex-col justify-center items-center w-full gap-4">
          <div className="text-4xl font-bold w-auto flex items-center text-black">
            <div className="flex flex-col items-center justify-center tracking-tight">
              <Image
                src="/darkmode.svg"
                alt="WorderLand logo"
                width={110}
                height={20}
                priority
              />
              <h1 className="text-start text-xl font-light text-black relative top-4 right-[134px]">
                welcome to
              </h1>
              <h1 className="font-bold text-5xl tracking-tight text-black">
                <span > W
                  <span className="text-green-700 text-[64px]">o</span>RDER L
                  <span className="text-amber-400 text-[62px]">a</span>ND
                </span>
              </h1>
            </div>
          </div>
        </div>

        <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
          <div className="w-full flex flex-col justify-center gap-8">
            <div className="flex flex-col justify-center gap-4">
              <Input className="w-full h-[50px] text-black"
                placeholder="Email address"
                type="email"
                value={email}
                onChange={handleEmailChange}
                required
              />
              <Input className="w-full h-[50px] text-black"
                placeholder="Password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <Button className="text-lg h-[48px] bg-black cursor-pointer hover:bg-white hover:text-black" type="submit" >
              Login
            </Button>
          </div>

          <div className="w-full flex flex-row justify-between items-center">
            <span className="text-black">Don't have an account ?</span>
            <span className="text-amber-500">
              <Link href="/signup">Sign Up ! </Link>
            </span>
          </div>
        </form>

      </main>
    </div>
  )



}