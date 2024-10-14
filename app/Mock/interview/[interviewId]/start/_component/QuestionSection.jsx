import { Lightbulb, Volume2 } from 'lucide-react'
import React from 'react'

function QuestionSection({mockInterviewQuestion, activeQuestionIndex}) {
  
  const textToSpeech=(text)=>{
    if('speechSynthesis' in window){
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech)
    }else{
      console.log('Browser does not support speech synthesis')
    }
  }
  
  return mockInterviewQuestion&&(
    <div className='p-5 border rounded-lg my-10'>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'> 
            {mockInterviewQuestion&&mockInterviewQuestion.map((question,index)=>(
                <h2 className={`p-2 border rounded-full text-xs md:text-sm text-center cursor-pointer ${activeQuestionIndex==index&&'bg-primary text-white'}`}>Question {index+1}</h2>
            ))}
           
        </div>
        <h2 className='my-5 text-md md:text-lg'>
              {mockInterviewQuestion[activeQuestionIndex]?.question}
            </h2>
            <Volume2 className='coursor-pointer' onClick={()=>textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)}/>
            <div className='border rounded-lg p-5 bg-blue-100 mt-20'>
              <h2 className='flex gap-2 items-center text-primary'>
                <Lightbulb/>
                <strong>Note:</strong>
              </h2>
              <h2 className='text-sm text-primary my-2'>
                Click on Record Answer when you want to answer the question. At end of interview we will give you the feedback along with recommended answers and your answer to compare it.
              </h2>
            </div>
    </div>
  )
}

export default QuestionSection