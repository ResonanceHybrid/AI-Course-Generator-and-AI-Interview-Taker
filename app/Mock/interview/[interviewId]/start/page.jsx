"use client"
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import QuestionSection from './_component/QuestionSection';
import RecordAnswerSection from './_component/RecordAnswerSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function StartInterview({params}) {

    const[interviewData,setInterviewData]=useState();
    const[mockInterviewQuestion,setMockInterviewQuestion]=useState();
    const[activeQuestionIndex,setActiveQuestionIndex]=useState(0);


    useEffect(()=>{
        GetInterviewDetails();
    },[])


    const GetInterviewDetails = async () => {
        const result = await db
          .select()
          .from(MockInterview)
          .where(eq(MockInterview.mockId, params.interviewId));
        
          const jsonMockResp=JSON.parse(result[0].jsonMockResp);
          console.log(jsonMockResp);
          setMockInterviewQuestion(jsonMockResp);
          setInterviewData(result[0]);
        
      };

  return (
    <div>
        <div className='grid frid-ols-1 md:grid-cols-2 gap-10 '>
            {}
            <QuestionSection mockInterviewQuestion={mockInterviewQuestion}
            activeQuestionIndex={activeQuestionIndex}
            />
            <RecordAnswerSection
            mockInterviewQuestion={mockInterviewQuestion}
            activeQuestionIndex={activeQuestionIndex}
            interviewData={interviewData}
            />
        </div>
        <div className='flex justify-end gap-6'>
            {activeQuestionIndex>0&&
            <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex-1)}>Prevoius Question</Button>}
           {activeQuestionIndex!=mockInterviewQuestion?.length-1&& 
           <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex+1)}>Next Question</Button>}
           {activeQuestionIndex==mockInterviewQuestion?.length-1&& 
           <Link href={'/Mock/interview/'+interviewData?.mockId+"/feedback"}>
           <Button>End Interview</Button></Link>}
        </div>
    </div>
  )
}

export default StartInterview