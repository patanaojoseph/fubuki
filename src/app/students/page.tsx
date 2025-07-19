// import { getStudents } from "@/actions/student.action";
// import StudentsTable from "@/components/StudentsTable";
// import { stackServerApp } from "@/stack";
// import { SignUp } from "@stackframe/stack";

// const StudentPage = async () => {
//   const user = await stackServerApp.getUser();
//   const students = await getStudents();

//   return (
//     <>
//       {user ? (
//         <StudentsTable students={students} currentUserId={user.id} />
//       ) : (
//         <div className='flex justify-center py-12 sm:px-6 lg:px-8'>
//           <SignUp />
//         </div>
//       )}
//     </>
//   );
// };

// export default StudentPage;

import { getStudents } from "@/actions/student.action";
import LoadingContainer from "@/components/global/LoadingContainer";
import StudentsTable from "@/components/StudentsTable";
import { stackServerApp } from "@/stack";
import { SignUp } from "@stackframe/stack";
import { Suspense } from "react";

const StudentPage = async () => {
  const user = await stackServerApp.getUser();

  if (!user) {
    return (
      <div className='flex justify-center py-12 sm:px-6 lg:px-8'>
        <SignUp />
      </div>
    );
  }

  return (
    <Suspense fallback={<LoadingContainer />}>
      <StudentPageContent currentUserId={user.id} />
    </Suspense>
  );
};

// Separate component to handle the async data fetching
async function StudentPageContent({
  currentUserId,
}: {
  currentUserId: string;
}) {
  try {
    const students = await getStudents();
    return <StudentsTable students={students} currentUserId={currentUserId} />;
  } catch (error) {
    console.error("Error fetching students:", error);
    return (
      <div className='flex flex-col items-center justify-center py-12 space-y-4'>
        <div className='text-center'>
          <h2 className='text-2xl font-bold text-slate-800 dark:text-slate-200'>
            Something went wrong
          </h2>
          <p className='text-slate-600 dark:text-slate-400 mt-2'>
            Unable to load student data. Please try refreshing the page.
          </p>
        </div>
      </div>
    );
  }
}

export default StudentPage;
