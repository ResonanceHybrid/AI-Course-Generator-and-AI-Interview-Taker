import Link from "next/link";
import Header from "./Mock/_components/Header";

export default function Home() {
  return (
    <div className="h-screen overflow-hidden">
      <Header />

     
      <div className=" text-gray-900 h-full flex flex-col items-center justify-center">
        <div className="container mx-auto text-center">
          <h1 className="text-6xl font-extrabold mb-6">Master Your Skills And Conquer Challenges</h1>
          <p className="text-lg text-gray-800 max-w-2xl mx-auto mb-8">
          Designed and Developed by <Link className="text-red-500 underline" href="https://sohanmehta.com.np">Sohan Mehta</Link>
          </p>
          <Link href="/Mock">
          <button className="px-6 py-3 border border-grey-900 rounded-lg text-gray-900 font-semibold">
              AI Mock Interview
            </button>
          </Link>
          <Link href="/CourseGenerator">
          <button className="ml-3 px-6 py-3 border border-grey-900 rounded-lg text-gray-900 font-semibold">
              AI Course Generator
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
