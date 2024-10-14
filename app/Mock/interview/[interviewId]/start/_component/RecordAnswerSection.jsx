"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic, StopCircle } from 'lucide-react'
import { toast } from 'sonner'
import { chatSession } from '@/utils/Gemini_AI_Interview_Model'
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'

function RecordAnswerSection({mockInterviewQuestion,
  activeQuestionIndex,interviewData}) {
    const [userAnswer,setUserAnswer]=useState('');
    const {user}=useUser();
    const [loading,setLoading]=useState(false);
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults
      } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
      });

useEffect(()=>{
    results.map((results)=>(
        setUserAnswer(prevAns=>prevAns+results?.transcript)
    ))
},[results])

useEffect(()=>{
if(!isRecording&&userAnswer.length>10){
  UpdateUserAnswer()
}

},[userAnswer])

const StartStopRecording=async()=>{
  if(isRecording){
  
    stopSpeechToText();
  
    
   
  }else{
    startSpeechToText();
  }
}

  const UpdateUserAnswer=async()=>{
 console.log(userAnswer)
    setLoading(true);
    const feedbackPrompt='Question:'+mockInterviewQuestion[activeQuestionIndex]?.question+', User Answer:'+userAnswer+', Depends on question and user answer for given interview question'+' please give us rating for answer and feedback as area of emprovement if any'+"in just 3 to 5 lines to improve it in JSON format with rating field and feedback field";
    const result=await chatSession.sendMessage(feedbackPrompt);
    const mockJsonResp=(result.response.text()).replace('```json','').replace('```','');
    console.log(mockJsonResp);
    const JsonFeedbackResp=JSON.parse(mockJsonResp);

const resp=await db.insert(UserAnswer)
.values({
  mockIdRef:interviewData?.mockId,
  question:mockInterviewQuestion[activeQuestionIndex]?.question,
  correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
  userAns: userAnswer,
  feedback: JsonFeedbackResp?.feedback,
  rating: JsonFeedbackResp?.rating,
  userEmail: user?.primaryEmailAddress.emailAddress,
  createdAt:moment().format('DD-MM-yyyy')

})
if (resp) {
  toast('Answer saved successfully', {
    position: "top-right",
    style: { marginTop: '55px' } // Adjut the margin value as needed
  });
  setUserAnswer('');
  setResults([]);
}

  setResults([]);
  setLoading(false);
  }

  return (
    <div className='flex item-center justify-center flex-col'>
        <div className='flex flex-col mt-20 justify-center items-center  rounded-lg p-5 bg-slate-200'>
            <Image src={'/webcam.svg'} width={200} height={200} alt='webcam' className='absolute'/>
                <Webcam
                mirrored={true}
                style={{
                    height: 300,
                    width: '100%',
                    zIndex:10,
                }}
                />
        </div>
       <Button disabled={loading} variant = "outline" className="my-10" onClick={StartStopRecording}>
        {isRecording?
        <h2 className='text-red-500 flex gap-2'>
            <StopCircle/>Stop Recording
        </h2>
        
        :
        <h2 className='text-primary flex gap-2 items-center'>
        <Mic/>Record Answer</h2>}</Button>

     
       
      
    </div>
  )
}

export default RecordAnswerSection