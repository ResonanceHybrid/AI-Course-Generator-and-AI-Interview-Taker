"use client";
import { Button } from '@/components/ui/button';
import React, { useContext, useEffect, useState } from 'react';
import { HiOutlineCircleStack, HiOutlineLightBulb, HiOutlineClipboard } from "react-icons/hi2";
import SelectCategory from './_components/SelectCategory';
import TopicDescription from './_components/TopicDescription';
import SelectOption from './_components/SelectOption';
import { UserInputContext } from '../_contex/UserInputContext';
import { CourseGeneratorModel } from '@/utils/Gemini_AI_CG_Model';
import LoadingDialog from './_components/LoadingDialog';
import { CourseList } from '@/utils/schema';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs';
import { db } from '@/utils/db';
import { useRouter } from 'next/navigation';

function CreateCourse() {
    const StepperOptions = [
        {
            id: 1,
            name: "Category",
            icon: <HiOutlineCircleStack />
        },
        {
            id: 2, // Changed id to be unique
            name: "Topic and Description",
            icon: <HiOutlineLightBulb />
        },
        {
            id: 3, // Changed id to be unique
            name: "Options",
            icon: <HiOutlineClipboard />
        },
    ];

    const { user } = useUser();
    const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);
    const [loading, setLoading] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const router = useRouter();

    useEffect(() => {
        console.log(userCourseInput);
    }, [userCourseInput]);

    const checkStatus = () => {
        if (userCourseInput.length === 0) {
            return true;
        }
        if (activeIndex === 0 && (!userCourseInput?.category || userCourseInput.category.length === 0)) {
            return true;
        }
        if (activeIndex === 1 && (!userCourseInput?.topic || userCourseInput.topic.length === 0)) {
            return true;
        }
        else if (activeIndex === 2 && (!userCourseInput?.level || !userCourseInput?.duration || userCourseInput?.displayVideo === undefined || userCourseInput?.NoOfChapters === undefined)) {
            return true;
        }
        return false;
    };

    const GenerateCourseLayout = async () => {
        setLoading(true);
        const BASIC_PROMPT = "Generate a course tutorial in JSON format with the following structure: { \"courseName\": \"\", \"description\": \"\", \"chapters\": [{ \"chapterName\": \"\", \"about\": \"\", \"duration\": \"\" }] }. Ensure the output strictly adheres to this format.";

const USER_INPUT_PROMPT = 'Category: ' + userCourseInput?.category + 
                          ', Topic: ' + userCourseInput?.topic + 
                          ', Level: ' + userCourseInput?.level + 
                          ', Duration: ' + userCourseInput?.duration + 
                          ', No. of Chapters: ' + userCourseInput?.NoOfChapters;

const FINAL_PROMPT = BASIC_PROMPT + " " + USER_INPUT_PROMPT;


        console.log(FINAL_PROMPT);
        const result = await CourseGeneratorModel.sendMessage(FINAL_PROMPT);
        console.log(result.response?.text());
        console.log(JSON.parse(result.response?.text()));
        setLoading(false);
        saveCourseLayoutInDB(JSON.parse(result.response?.text()));
    };

    const saveCourseLayoutInDB = async (courseLayout) => {
        const id = uuidv4();
        setLoading(true);
        const result = await db.insert(CourseList).values({
            courseId: id,
            courseName: userCourseInput?.topic,
            level: userCourseInput?.level,
            includeVideo: userCourseInput?.includeVideo,
            duration: userCourseInput?.duration,
            NoOfChapters: userCourseInput?.NoOfChapters,
            category: userCourseInput?.category,
            courseOutput: courseLayout,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            userName: user?.fullName,
            userProfileImage: user?.imageUrl
        });
        console.log("Finish");
        setLoading(false);
        router.replace('/CreateCourse/' + id);
    };

    return (
        <div>
            <div className='flex flex-col justify-center items-center mt-10'>
                <h2 className='text-4xl text-primary font-medium'>Create Course</h2>
                <div className='flex mt-10'>
                    {StepperOptions.map((item, index) => (
                        <div key={item.id} className='flex items-center'>
                            <div className='flex flex-col items-center w-[100px] md:w-[100px]'>
                                <div className={`bg-gray-200 p-3 rounded-full text-white flex items-center justify-center ${activeIndex >= index ? 'bg-primary' : ''}`}>
                                    {item.icon}
                                </div>
                                <h2 className='text-center mt-2 md:text-sm'>{item.name}</h2>
                            </div>
                            {index !== StepperOptions.length - 1 && (
                                <div className={`h-1 w-[50px] md:w-[100px] rounded-full lg:w-[170px] bg-gray-300 ${activeIndex > index ? 'bg-black' : ''}`}></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className='px-10 md:px-20 lg:px-44 mt-10'>
                {activeIndex === 0 ? <SelectCategory /> : activeIndex === 1 ? <TopicDescription /> : <SelectOption />}

                <div className='flex justify-between mt-10'>
                    <Button disabled={activeIndex === 0} variant='outline' onClick={() => setActiveIndex(activeIndex - 1)}>Previous</Button>
                    {activeIndex < 2 && <Button disabled={checkStatus()} onClick={() => setActiveIndex(activeIndex + 1)}>Next</Button>}
                    {activeIndex === 2 && <Button disabled={checkStatus()} onClick={() => GenerateCourseLayout()}>Generate Course Layout</Button>}
                </div>
            </div>
            <LoadingDialog loading={loading} />
        </div>
    );
}

export default CreateCourse;
