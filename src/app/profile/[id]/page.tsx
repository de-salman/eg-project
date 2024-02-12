import React from 'react'

export default function page({params}:any) {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <hr/>
        <p className='text-4xl text-center'>Profile ID</p>
        <br/>
        <span className='p-2 ml-2 rounded bg-red-500 text-black text-4xl'>{params.id}</span>
    </div>
  )
}
