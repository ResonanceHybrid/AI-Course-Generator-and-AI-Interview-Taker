import React, { useEffect, useState } from 'react'
import { HiOutlinePencilAlt } from "react-icons/hi";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { DialogClose } from '@radix-ui/react-dialog';
import { Button } from '@/components/ui/button';
import { db } from '@/utils/db';
import { CourseList } from '@/utils/schema';
import { eq } from 'drizzle-orm';
  
function EditCourseBasicInfo({course,refreshData}) {

    const[name,setName]=useState();
    const [descritpion,setDescription]=useState();
    useEffect(()=>{
        setName(course?.courseOutput?.course_name);
        setDescription(course?.courseOutput?.description);
    },[course])
    const onUpdateHandeler=async()=>{
        course.courseOutput.course_name=name;
        course.courseOutput.description=descritpion;
        const result=await db.update(CourseList).set({
            courseOutput: course?.courseOutput
        }).where(eq(CourseList.id,course?.id))
        .returning({id:CourseList.id});
       refreshData(true)
    }

  return (
    <Dialog>
  <DialogTrigger><HiOutlinePencilAlt className='text-red-500 ml-3' />
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit Course Title and Descritpion</DialogTitle>
      <DialogDescription>
        <div className='mt-3'>
            <label>Course Title</label>
            <Input defaultValue={course?.courseOutput?.course_name}
            onChange={(event)=>setName(event?.target.value)}
            />
        </div>
        <div>
            <label>Course Description</label>
            <Textarea className="h-40" defaultValue={course?.courseOutput?.description}
            onChange={(event)=>setDescription(event?.target.value)}
            />
        </div>
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
        <DialogClose>
            <Button onClick={onUpdateHandeler} className="mt-2">Update</Button>
        </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>

  )
}

export default EditCourseBasicInfo