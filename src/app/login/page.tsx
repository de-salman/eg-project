"use client"
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";


export default function App() {

  const router = useRouter();
  const [user, setUser] = useState({
    email:"",
    password:"",
  })
  const [buttonDisabled,setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false)


  const onLogin = async () => {
    try {
      setLoading(true)
      const response = await axios.post("/api/users/login",user);
      console.log("Login success", response.data);
      toast.success("Login success")
      router.push("/profile")
    }catch (error:any) {
        toast.error(error.response.data.error)
        console.log("Login failed", error.response.data.error);
    }finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0 ) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [user])
  

  return (
    <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
      <div className="w-full sm:w-2/4 h-full relative">
        <div className="hideBox"></div>
        <iframe src='https://my.spline.design/particles-66393dfaecb74344bdf7dff4aa471fad/' frameBorder='0' width='100%' height='100%'></iframe>
      </div>
      <div className="w-2/4 max-w-lg h-1/2">
        <div className="text-center md:text-left">
          <label className="mr-1 text-4xl">{loading ? "Processing" : "Login"}</label>
        </div>
        <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
          
        </div>
        <input id="email" className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4 text-black" type="email" value={user.email} 
        onChange={(e)=> setUser({...user, email:e.target.value})} placeholder="Email Address"  />
        <input id="password" className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4  text-black" type="password" value={user.password} 
        onChange={(e)=> setUser({...user, password:e.target.value})} placeholder="Password"  />
        
        
        <div className="text-center md:text-left">
          <button onClick={onLogin} className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-4 text-white uppercase rounded text-xs tracking-wider">{buttonDisabled ? "Login Disabled" : "Login Here"}</button>
        </div>
        <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
          Don&apos;t have an account? <Link href="/signup" className="text-red-600 hover:underline hover:underline-offset-4">Visit signup page</Link>
        </div>
      </div>
    </section>
  );
}