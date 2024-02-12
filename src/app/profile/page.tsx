"use client";
import axios from "axios";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import {toast} from "react-hot-toast";
import {useRouter} from "next/navigation";


export default function ProfilePage() {
    const router = useRouter()
    const [data, setData] = useState<any>("")

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('/api/users/userDetails');
                console.log(res.data.data);
                setData(res.data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const logout = async () => {
        try {
            await axios.get('/api/users/logout')
            toast.success('Logout successful')
            router.push('/login')
        } catch (error:any) {
            console.log(error.message);
            toast.error(error.message)
        }
    }

    const getUserDetails = () => {
        if(data.isAdmin){
            router.push(`/admin`)
        }else {
            router.push(`/profile/${data._id}`)
        }
        
    }



    return (
        <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
            <div className="w-2/4 max-w-lg h-1/2 flex justify-center items-center">
                <div className="flex flex-col items-center justify-center py-2 text-center">
                    <h1 className="text-3xl">Welcome to the application.</h1>
                    <hr />
                    <hr />
                    <button onClick={logout} className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Logout
                    </button>

                    <button onClick={getUserDetails} className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        {data.isAdmin ? "Get all user details" : "Get My ID"}
                    </button>
                </div>
            </div>
            <div className="w-full sm:w-2/4 h-full relative">
                <div className="hideBox"></div>
                <iframe src='https://my.spline.design/chips-37a6c78acd4f5b23b2266ef4b3a7f799/' frameBorder='0' width='100%' height='100%'></iframe>
            </div>
        </section>
        
    )
}