import { UserInputContext } from '@/app/_contex/UserInputContext';
import CategoryList from '@/app/_Shared/CategoryList';
import Image from 'next/image';
import React, { useContext } from 'react';

function SelectCategory() {
    const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

    const handleCategoryChange = (category) => {
        setUserCourseInput(prev => ({
            ...prev,
            category: category,
        }));
    };

    return (
        <div className="px-10 md:px-20 py-8">
            <h2 className="my-5 text-2xl font-semibold text-center">Select the Course Category</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {CategoryList.map((item, index) => (
                    <div
                        key={index}
                        className={`flex flex-col p-6 border-2 border-gray-150 items-center rounded-xl transition duration-200 ease-in-out transform hover:border-light-blue-500 hover:bg-blue-100 cursor-pointer
                            ${userCourseInput?.category === item.name ? 'border-light-blue-500 bg-blue-100' : 'border-gray-300'}
                        `}
                        onClick={() => handleCategoryChange(item.name)}
                    >
                        <Image 
                            src={item.icon} 
                            width={50} 
                            height={50} 
                            alt={`Icon for ${item.name}`} 
                            className="mb-2" 
                        />
                        <h2 className="text-lg font-medium">{item.name}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SelectCategory;
