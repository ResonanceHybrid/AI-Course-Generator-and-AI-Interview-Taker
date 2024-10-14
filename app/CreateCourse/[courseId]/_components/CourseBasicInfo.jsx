import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { HiOutlinePuzzle } from "react-icons/hi";
import EditCourseBasicInfo from "./EditCourseBasicInfo";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/utils/firebaseconfig";
import { db } from "@/utils/db";
import { CourseList } from "@/utils/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";

function CourseBasicInfo({ course, refreshData, edit=true }) {
    const[selectedFile,setSelectedFile]=useState();
    useEffect(()=>{
        if(course){
            setSelectedFile(course?.courseBanner)
        }
    },[course])
    const onFileSelected=async(event)=>{
        const file=event.target.files[0];
        setSelectedFile(URL.createObjectURL(file));
        const fileName=Date.now()+'.jpg';
        const storageRef=ref(storage,'AI_Course/'+fileName)
        await uploadBytes(storageRef,file).then((snapshot)=>{
            console.log('File uploaded');
        }).then(resp=>{
            getDownloadURL(storageRef).then(async(downloadURL)=>{
                console.log(downloadURL);
                await db.update(CourseList).set({
                    courseBanner:downloadURL
                }).where(eq(CourseList.id,course?.id))

            })
        })
    }   
  return (
    <div className="p-10 border rounded-xl shadow-sm mt-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <h2 className="font-bold text-3xl ">
            {course?.courseOutput?.course_name}
           {edit&& <EditCourseBasicInfo
              course={course}
              refreshData={() => refreshData(true)}
            />}
          </h2>
          <p className="text-sm mt-3">{course?.courseOutput?.description}</p>
          <h2 className="font-medium mt-2 flex gap-2 items-center text-primary">
            <HiOutlinePuzzle />

            {course?.category}
          </h2>
          
          {!edit&&<Link href={'/course/'+course?.courseId+'/CourseStart'}>
          <Button className="w-full mt-5">View Course</Button></Link>}
        </div>
        <div>
            <label htmlFor="upload-image">
          <Image
            src={selectedFile?selectedFile:"/placeholder.svg"}
            width={300}
            height={300}
            className="w-full rounded-xl h-[250px] object-cover cursor-pointer"

          />
          </label>
          {edit &&<input type="file" id="upload-image" className="opacity-0" onChange={onFileSelected}/>}
        </div>
      </div>
    </div>
  );
}

export default CourseBasicInfo;
