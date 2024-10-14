import React from "react";
import { HiOutlineChartBar } from "react-icons/hi";
import { HiOutlineClock } from "react-icons/hi";
import { HiOutlineBookOpen } from "react-icons/hi";
import { HiOutlineVideoCamera } from "react-icons/hi";

function CourseDetail({ course }) {
  return (
    <div className="border p-6 rounded-xl shadow-sm mt-3">
      <div className="grid frid cols-2 md:grid-cols-4 gap-5">
        <div className="flex gap-2">
          <HiOutlineChartBar className="text-4xl text-primary" />
          <div>
            <h2 className="text-xs">Skill Level</h2>
            <h2 className="font-medium text-lg">{course?.level}</h2>
          </div>
        </div>
        <div className="flex gap-2">
          <HiOutlineClock className="text-4xl text-primary" />
          <div>
            <h2 className="text-xs">Duration</h2>
            <h2 className="font-medium text-lg">{course?.duration}</h2>
          </div>
        </div>
        <div className="flex gap-2">
          <HiOutlineBookOpen className="text-4xl text-primary" />
          <div>
            <h2 className="text-xs">No Of Chapters</h2>
            <h2 className="font-medium text-lg">{course?.NoOfChapters}</h2>
          </div>
        </div>
        <div className="flex gap-2">
          <HiOutlineVideoCamera className="text-4xl text-primary" />
          <div>
            <h2 className="text-xs">Video Include?</h2>
            <h2 className="font-medium text-lg">{course?.includeVideo}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;
