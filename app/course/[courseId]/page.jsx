"use client"
import ChapterList from '@/app/CreateCourse/[courseId]/_components/ChapterList';
import CourseBasicInfo from '@/app/CreateCourse/[courseId]/_components/CourseBasicInfo';
import CourseDetail from '@/app/CreateCourse/[courseId]/_components/CourseDetail';
import Header from '@/app/Mock/_components/Header';
import { db } from '@/utils/db';
import { CourseList } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'

function Course({params}) {

    const [course,setCourse]=useState();
    useEffect(()=>{
        params&&GetCourse();
},[params])
    const GetCourse= async()=>{
        const result=await db.select().from(CourseList).where(eq(CourseList?.courseId,params?.courseId));
       setCourse(result[0]);
        console.log(result);
      }
  return (
    <div>
        <Header/>
        <div className='px-10 p-1 md:px-20 lg:px-44'>
        <CourseBasicInfo course={course} edit={false}/>
    <CourseDetail course={course}/>
    <ChapterList course={course} edit={false}/>
        </div>
    </div>
  )
}

export default Course