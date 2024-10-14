"use client"
import { db } from '@/utils/db'
import { CourseList } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import CourseCard from './CourseCard'

function UserCourseList() {
  const [courseList,setCourseList]=useState();
  const {user}=useUser();
  useEffect(()=>{
user&&getUserCourses();  },[user])
  const getUserCourses=async()=>{
    const result=await db.select().from(CourseList).where(eq(CourseList?.createdBy,user?.primaryEmailAddress?.emailAddress))
    setCourseList(result);
  }
  return (
    <div className='mt-10'>
      <h2 className='font-medium text-xl'>My AI Courses</h2>
      <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {courseList?.length>0?courseList?.map((course,index)=>(
          <CourseCard course={course} key={index} refreshData={()=>getUserCourses()}/>
        ))
      :
      
        [1,2,3,4,5].map((item,index)=>(
        <div key={index} className='2-full mt-5 bg-slate-200 animate-pulse rounded-lg h-[270px]'></div>
       ))
      
      }
      </div>
    </div>
  )
}

export default UserCourseList