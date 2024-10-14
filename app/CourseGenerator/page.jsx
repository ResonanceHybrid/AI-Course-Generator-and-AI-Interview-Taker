import Link from "next/link";
import AddCourse from "./_components/AddCourse";
import UserCourseList from "./_components/UserCourseList";

export default function Home() {
  return (
    <div>
      <AddCourse/>
      <UserCourseList/>
    </div>
   
  );
}
