"use client";
import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState, useCallback } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsDownUpIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

function Feedback({ params }) {
  const [feedbackList, setFeedbackList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    GetFeedback();
  }, []);

  const GetFeedback = useCallback(async () => {
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, params.interviewId))
      .orderBy(UserAnswer.id);
    console.log(result);
    setFeedbackList(result);
  }, [params.interviewId]);

  return (
    <div className="min-h-screen bg-gray-100 py-16 px-6 mt-9 border rounded-sm mb-9">
      {feedbackList?.length > 0 ? (
        <>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-black">Congratulations!</h2>
            <h3 className="text-xl font-semibold mt-2 text-gray-800">Your Interview Feedback</h3>
            {/* <p className="text-lg text-gray-600 mt-2">
              Overall Interview Rating: <strong className="text-green-600">4.5/5</strong>
            </p> */}
            <p className="text-sm text-gray-500 mt-1">
              Below are your answers with feedback, along with the correct answers.
            </p>
          </div>

          <div className="mx-auto max-w-6xl space-y-8">
            {feedbackList.map((item, index) => (
              <Collapsible
                key={index}
                className="bg-white shadow-md rounded-lg border border-gray-200 transition-all transform hover:scale-100"
              >
                <CollapsibleTrigger className="p-5 bg-white rounded-t-lg flex justify-between items-center cursor-pointer">
                  <span className="font-semibold text-lg text-left text-gray-700 w-full">
                    {item.question}
                  </span>
                  <ChevronsDownUpIcon className="h-5 w-5 text-gray-500" />
                </CollapsibleTrigger>
                <CollapsibleContent className="p-6 bg-gray-50 rounded-b-lg">
                  <div className="space-y-4">
                    <div className="p-4 border-l-4 border-red-500 bg-red-50 rounded-lg">
                      <span className="font-semibold text-red-600">Rating: </span>{item.rating}
                    </div>
                    <div className="p-4 border-l-4 border-red-500 bg-red-50 rounded-lg">
                      <span className="font-semibold text-red-600">Your Answer: </span>{item.userAns}
                    </div>
                    <div className="p-4 border-l-4 border-green-500 bg-green-50 rounded-lg">
                      <span className="font-semibold text-green-600">Correct Answer: </span>{item.correctAns}
                    </div>
                    <div className="p-4 border-l-4 border-blue-500 bg-blue-50 rounded-lg">
                      <span className="font-semibold text-blue-600">Feedback: </span>{item.feedback}
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center">
          <h2 className="font-bold text-xl text-gray-500">No Interview Feedback Found</h2>
        </div>
      )}

      <div className="mt-20 text-center">
        <Button
          className="px-8 py-3 bg-primary  text-white rounded-lg shadow-lg transition-transform transform hover:scale-100"
          onClick={() => router.replace('/Mock')}
        >
          Go Home
        </Button>
      </div>
    </div>
  );
}

export default Feedback;
