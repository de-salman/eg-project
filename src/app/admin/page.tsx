"use client";
import axios from "axios";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import {toast} from "react-hot-toast";
import {useRouter} from "next/navigation";


export default function ProfilePage() {
    const router = useRouter()
    const [data, setData] = useState<any>("")
    
    const logout = async () => {
        try {
            await axios.get('/api/users/logout')
            toast.success('Logout successful')
            router.push('/login')
        } catch (error:any) {
            // console.log(error.message);
            toast.error(error.message)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('/api/users/allUserDetails');
                // console.log(res.data.data);
                setData(res.data.data);
            } catch (error:any) {
                // console.error('Error fetching data:', error);
                if(error.response.status === 403) {
                    router.push('/profile')
                }
            }
        };

        fetchData();
    }, []);
    


    return (
        <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
            <div className="w-2/4 max-w-lg h-1/2 flex justify-center items-center">
                <div className="flex flex-col items-center justify-center py-2 text-center">
                    <h1 className="text-3xl">{data ? "Welcome to the admin page." : "Loading..."}</h1>
                    <hr />
                    {data && (
                        <table className="table-auto text-left mt-5">
                            <thead>
                                <tr>
                                <th className="pr-5">Username</th>
                                <th className="pr-5">Email</th>
                                <th>Is Admin</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((user:any)=>(
                                    <tr key={user._id}>
                                        <td className="pr-5">{user.username}</td>
                                        <td className="pr-5">{user.email}</td>
                                        <td>{user.isAdmin ? "Yes" : "No"}</td>
                                    </tr>
                                ))}
                                
                                
                            </tbody>
                        </table>
                    )}
                    <button onClick={logout} className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Logout
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