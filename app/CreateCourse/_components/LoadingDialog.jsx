import React from 'react';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Image from 'next/image';

function LoadingDialog({ loading }) {
    return (
        <AlertDialog open={loading}>
            <AlertDialogContent className="bg-white rounded-lg shadow-lg">
                <AlertDialogHeader>
                    <AlertDialogTitle></AlertDialogTitle>
                    <AlertDialogDescription>
                        <div className='flex flex-col items-center justify-center py-10'>
                            <div className="relative w-24 h-24">
                                <Image 
                                    src="/loder.gif" 
                                    alt='Loading...' 
                                    layout="fill" 
                                    objectFit="contain" 
                                    className="rounded-lg"
                                />
                            </div>
                            <h2 className='mt-4 text-center text-lg font-medium text-black'>
                                Please wait, AI is working to build your course!
                            </h2>
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default LoadingDialog;
