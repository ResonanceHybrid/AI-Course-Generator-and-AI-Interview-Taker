import React, { useContext } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { UserInputContext } from "@/app/_contex/UserInputContext";

function SelectOption() {
    const {userCourseInput,setUserCourseInput}=useContext(UserInputContext);


    const handelInputChange=(fieldName,value)=>{
        setUserCourseInput((prev)=>({...prev,[fieldName]:value}))
    }
  return (
    <div className="px-10 md:px-20 lg:px-44">
      <div className="grid grid-cols-2 gap-10">
        <div>
          <label className="text-sm">Difficulty Label</label>
          <Select onValueChange={(value)=>handelInputChange('level',value)}
            defaultValue={userCourseInput?.level}
            >
            
            <SelectTrigger className="h-14 text-lg">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm">Course Duration</label>
          <Select
          defaultValue={userCourseInput?.duration}
          onValueChange={(value)=>handelInputChange('duration',value)}>
            <SelectTrigger className="">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1 Hour">1 Hour</SelectItem>
              <SelectItem value="2 Hours">2 Hours</SelectItem>
              <SelectItem value="More than 3 Hours">More than 3 Hours</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm">Include Video?</label>
          <Select 
          defaultValue={userCourseInput?.displayVideo}
          onValueChange={(value)=>handelInputChange('displayVideo',value)}>
            <SelectTrigger className="">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Yes">Yes</SelectItem>
              <SelectItem value="No">No</SelectItem>
              
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm">No of chapters</label>
          <Input type="number" className='h-14 text-lg'
          defaultValue={userCourseInput?.NoOfChapters}
          onChange={(event)=>handelInputChange('NoOfChapters',event.target.value)}
          />
        </div>
        
      </div>
    </div>
  );
}

export default SelectOption;