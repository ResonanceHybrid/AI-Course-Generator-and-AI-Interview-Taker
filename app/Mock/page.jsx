"use client"
import { useUser } from '@clerk/nextjs'
import React from 'react'
import AddNewInterview from './_components/AddNewInterview'
import InterviewList from './_components/InterviewList'

function Mock() {
  const {user}=useUser();
  return (
    <div className='p-10'>
       <h2 className='text-2xl'>Hello, <span className='font-bold'>{user?.firstName}</span></h2>
<h2 className='text-gray-500'>Create and Start your AI Mock Interview. Make Sure To Disable Ad Blockers!</h2>
<div className='grid grid-cols-1 md:grid-cols-3 my-5'> 
  <AddNewInterview/>
</div>
   <InterviewList/>
    </div>
    
  )
}

export default Mock