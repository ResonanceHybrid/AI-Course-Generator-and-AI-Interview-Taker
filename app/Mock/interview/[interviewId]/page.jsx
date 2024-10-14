"use client";

import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Lightbulb, WebcamIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";

function Interview({ params }) {
  const [interviewData, setInterviewData] = useState(null); // Initialize with null for better conditional rendering
  const [webcamEnabled, setWebcamEnabled] = useState(false);

  // Fetch interview details once on component mount
  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, params.interviewId));

      if (result?.length > 0) {
        setInterviewData(result[0]); // Set interview data
      }
    } catch (error) {
      console.error("Error fetching interview details:", error);
    }
  };

  return (
    <div className="my-10">
      {/* Title */}
      <h2 className="font-bold text-3xl mb-5 text-gray-800">Let's Get Started</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left side */}
        <div className="space-y-6">
          {/* Job details */}
          <div className="flex flex-col p-6 rounded-lg border border-gray-300 bg-white shadow-sm space-y-4">
            <h2 className="text-lg">
              <strong>Job Role/Position:</strong> {interviewData?.jobPosition}
            </h2>
            <h2 className="text-lg">
              <strong>Job Description/Tech Stack:</strong> {interviewData?.jobDesc}
            </h2>
            <h2 className="text-lg">
              <strong>Years of Experience:</strong> {interviewData?.jobExperience}
            </h2>
          </div>

          {/* Info message */}
          <div className="p-6 rounded-lg border border-yellow-300 bg-yellow-100">
            <h2 className="flex gap-2 items-center text-yellow-600 text-xl">
              <Lightbulb />
              <strong>Information</strong>
            </h2>
            <p className="mt-3 text-gray-800">
              Get ready to ace your AI mock interview! Just enable your webcam and microphone to begin. Don’t worry, we don’t record anything, and you can disable access anytime. You'll go through 5 questions, and our AI will analyze your answers to provide instant, helpful feedback. Time to sharpen those skills and crush your interview like a pro!
            </p>
          </div>
        </div>

        {/* Right side (Webcam section) */}
        <div className="flex flex-col items-center">
          {webcamEnabled ? (
            <Webcam
              onUserMedia={() => setWebcamEnabled(true)}
              onUserMediaError={() => setWebcamEnabled(false)}
              mirrored={true}
              className="h-72 w-full rounded-lg border bg-gray-200"
            />
          ) : (
            <div className="flex flex-col items-center w-full">
              <WebcamIcon className="h-72 w-full my-7 p-20 bg-secondary rounded-lg border" />
              <Button
                variant="ghost"
                className="w-full border border-gray-300 py-4 px-6 rounded-lg hover:bg-gray-100 hover:border-gray-400 transition-all duration-300 ease-in-out text-gray-700 font-semibold"
                onClick={() => setWebcamEnabled(true)}
              >
                Enable Webcam and Microphone
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Start button */}
      <div className="mt-10 flex justify-end">
        <Link href={`/Mock/interview/${params.interviewId}/start`}>
          <Button className="px-8 py-4 text-lg">Start Interview</Button>
        </Link>
      </div>
    </div>
  );
}

export default Interview;
