"use client"
import { db } from '@/utils/db';
import { Chapters, CourseList } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { and, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import CourseBasicInfo from './_components/CourseBasicInfo';
import CourseDetail from './_components/CourseDetail';
import ChapterList from './_components/ChapterList';
import { Button } from '@/components/ui/button';
import { CourseGeneratorModel_Chapters } from '@/utils/Gemini_AI_CG_Model';
import LoadingDialog from '../_components/LoadingDialog';
import service from '@/utils/service';
import { useRouter } from 'next/navigation';

function CourseLayout({params}) {
  const{user}=useUser();
  const[course,setCourse]=useState([]);
  const[loading,setLoading]=useState(false);
  const router=useRouter();
  useEffect(()=>{
    
    params && GetCourse();
    
  },[params, user])

  const GetCourse= async()=>{
    const result=await db.select().from(CourseList).where(and(eq(CourseList.courseId,params?.courseId),eq(CourseList?.createdBy,user?.primaryEmailAddress?.emailAddress)));
    setCourse(result[0]);
    console.log(result);
  }
  const GenerateChapterContent=()=>{
    setLoading(true)
    const chapters=course?.courseOutput?.chapters;
    chapters.forEach(async(chapters,index)=>{
      const PROMPT="Explain the concept in detail on Topic: "+course?.courseName+", Chapters: "+chapters?.chapter_name+", in JSON Format with list of array with field as title, explanation on given chapter in detail in detail, Code Example(code field in <precode> format) if applicable";      
      console.log(PROMPT);
      // if(index<3){
        try{
          let videoId='';
           service.getVideos(course?.courseName+':'+chapters?.chapter_name).then(resp=>{
            console.log(resp);
            videoId=resp[0]?.id?.videoId
          })
          const result=await CourseGeneratorModel_Chapters.sendMessage(PROMPT);
          
          console.log(result.response?.text());
          const content= JSON.parse(result.response?.text());
         
          await db.insert(Chapters).values({
            chapterId: index,  
            courseId: course?.courseId,  
            content: content,  
            videoId: videoId  
        });
        
          setLoading(false);
        }catch(e)
        {
          setLoading(false);
          console.log(e);
        }
        await db.update(CourseList).set({
          publish:true
        })
        router.replace('/CreateCourse/'+course?.courseId+'/GenerationSuccess')
      // }

    })

  }
  return (
    <div className='mt-10 px-7 md:px-20 lg:px-44'>
      <h2 className='font-bold text-center text-2xl'>Course Layout</h2>
      <LoadingDialog loading={loading}/>
      <CourseBasicInfo course={course} refreshData={()=>GetCourse()}/>
      <CourseDetail course={course}/>
      <ChapterList course={course} refreshData={()=>GetCourse}/>
        <Button onClick={GenerateChapterContent} className="my-10">Generate Course Content</Button>
    </div>
  )
}

export default CourseLayout