import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

function InterviewitemCard({interview}) {
    const router=useRouter();

    const onStart=()=>{
        router.push(`/Mock/interview/`+interview?.mockId)
    }


    const onFeedbackPress=()=>{
        router.push(`/Mock/interview/`+interview?.mockId+"/feedback")
    }

  return (
    <div className=' border shadow-sm rounded-lg p-3'>

        <h2 className='font-bold text-primary uppercase'>
            {interview?.jobPosition}
        </h2>
        <h2 className='text-sm text-grey-600'>{interview?.jobExperience} Years of Experience</h2>
       
        <h2 className='text-xs text-greay-400'>Created at: {interview?.createdAt}</h2>
    <div className='flex justify-between mt-2 gap-5'>
        <Button size="sm" varient="outline" className="w-full" onClick={onFeedbackPress}>Feedback</Button>
        <Button size="sm" className="w-full" onClick={onStart}>Start</Button>
    </div> 
    </div>
  )
}

export default InterviewitemCard