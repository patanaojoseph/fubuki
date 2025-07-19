import React from "react";
import StudentCard from "./StudentCard";
import { stackServerApp } from "@/stack";
import { getStudentById } from "@/actions/student.action";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export async function generateMetaData({
  params,
}: {
  params: { slug: string };
}) {
  const [id] = params.slug.split("--");
  const student = await getStudentById(id);

  return {
    title: student ? student.student_number : "Student Details",
    course: student ? student.course : "Student details page",
  };
}

async function Page({ params }: { params: { slug: string } }) {
  try {
    const user = await stackServerApp.getUser();
    const [id] = params.slug.split("--");

    // Add validation for the ID format
    if (!id || id.length < 1) {
      throw new Error("Invalid student ID format");
    }

    const student = await getStudentById(id);

    if (!student) {
      // Instead of throwing an error, redirect or show a not found component
      return (
        <div className='mt-7 max-w-7xl mx-auto px-4 flex flex-col items-center justify-center min-h-[400px]'>
          <div className='text-center space-y-4'>
            <div className='w-16 h-16 bg-red-100 rounded-full flex items-center justify-center'>
              <Users className='h-8 w-8 text-red-500' />
            </div>
            <h2 className='text-2xl font-bold text-foreground'>
              Student Not Found
            </h2>
            <p className='text-muted-foreground'>
              The student you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link href='/students'>Back to Students</Link>
            </Button>
          </div>
        </div>
      );
    }

    // Convert null fields to undefined to match type requirements
    const selectedStudent = {
      ...student,
      imageUrl: student.imageUrl ?? undefined,
    };

    return (
      <div className='mt-7 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-10 gap-6'>
        <div className='lg:col-span-full'>
          <StudentCard student={selectedStudent} />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading student:", error);
    return (
      <div className='mt-7 max-w-7xl mx-auto px-4 flex flex-col items-center justify-center min-h-[400px]'>
        <div className='text-center space-y-4'>
          <div className='w-16 h-16 bg-red-100 rounded-full flex items-center justify-center'>
            <Users className='h-8 w-8 text-red-500' />
          </div>
          <h2 className='text-2xl font-bold text-foreground'>
            Error Loading Student
          </h2>
          <p className='text-muted-foreground'>
            There was an error loading the student information.
          </p>
          <Button asChild>
            <Link href='/students'>Back to Students</Link>
          </Button>
        </div>
      </div>
    );
  }
}

export default Page;
