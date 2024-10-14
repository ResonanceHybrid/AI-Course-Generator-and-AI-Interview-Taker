import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { HiOutlinePencilAlt } from "react-icons/hi";

import { Textarea } from '@/components/ui/textarea';
import { DialogClose } from '@radix-ui/react-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { db } from '@/utils/db';
import { eq } from 'drizzle-orm';
import { CourseList } from '@/utils/schema';

function EditChapters({course,index,refreshData}) {
    const Chapters=course?.courseOutput?.chapters;
    const [name,setName]=useState();
    const [about,setAbout]=useState();


    useEffect(()=>{
        setName(Chapters[index].chapter_name);
        setAbout(Chapters[index].about);
    },[course])

    const onUpdateHandeler=async()=>{
        course.courseOutput.chapters[index].name=name;
        course.courseOutput.chapters[index].about=about;
        const result=await db.update(CourseList).set({
            courseOutput: course?.courseOutput
        }).where(eq(CourseList.id,course?.id))
        .returning({id:CourseList.id});
        console.log(result);
        refreshData(true)
    }
  return (
    <Dialog>
  <DialogTrigger><HiOutlinePencilAlt className='text-red-500 ml-2' />
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit Chapter</DialogTitle>
      <DialogDescription>
      <div className='mt-3'>
            <label>Course Title</label>
            <Input defaultValue={Chapters[index].chapter_name}
            onChange={(event)=>setName(event?.target.value)}
            />
        </div>
        <div>
            <label>Course Description</label>
            <Textarea className="h-40" defaultValue={Chapters[index].about}
            onChange={(event)=>setAbout(event?.target.value)}
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

export default EditChapters