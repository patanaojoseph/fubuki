import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FaCloudDownloadAlt,
  FaUser,
  FaGraduationCap,
  FaIdBadge,
} from "react-icons/fa";

export type Course =
  | "BACHELOR_OF_SCIENCE_IN_COMPUTER_SCIENCE"
  | "BACHELOR_OF_SCIENCE_IN_INFORMATION_TECHNOLOGY"
  | "BACHELOR_OF_SCIENCE_IN_INFORMATION_SYSTEM"
  | "BACHELOR_OF_SCIENCE_IN_MULTIMEDIA_COMPUTING";

export type Section = "A" | "B" | "C";

export type Year = "FIRST" | "SECOND" | "THIRD" | "FOURTH";

export type Semester = "FIRST" | "SECOND";

export type Student = {
  id: string;
  firstName: string;
  lastName: string;
  course: Course;
  section: Section;
  year: Year;
  semester: Semester;
  student_number: string;
  imageUrl?: string;
  gwa?: number;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

interface StudentCardProps {
  student: Student | null;
}

// Helper Functions
const courseLabels: Record<string, string> = {
  BACHELOR_OF_SCIENCE_IN_COMPUTER_SCIENCE: "BS Computer Science",
  BACHELOR_OF_SCIENCE_IN_INFORMATION_TECHNOLOGY: "BS Information Technology",
  BACHELOR_OF_SCIENCE_IN_INFORMATION_SYSTEM: "BS Information System",
  BACHELOR_OF_SCIENCE_IN_MULTIMEDIA_COMPUTING: "BS Multimedia Computing",
};
const yearLabels: Record<string, string> = {
  FIRST: "1st Year",
  SECOND: "2nd Year",
  THIRD: "3rd Year",
  FOURTH: "4th Year",
};

const semesterLabels: Record<string, string> = {
  FIRST: "First",
  SECOND: "Second",
};

export default function StudentCard({ student }: StudentCardProps) {
  if (!student) {
    return (
      <div className='flex items-center justify-center min-h-[500px] bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-2xl'>
        <div className='text-center space-y-4'>
          <div className='w-16 h-16 mx-auto bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center'>
            <FaUser className='h-8 w-8 text-slate-400 dark:text-slate-300' />
          </div>
          <p className='text-slate-500 dark:text-slate-400 text-lg font-medium'>
            Student data is not available.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='max-w-7xl mx-auto p-8'>
      {/* Header Section */}
      <div className='mb-2'>
        <div className='flex items-center gap-3 mb-4'>
          <div className='w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center'>
            <FaGraduationCap className='h-6 w-6 text-white' />
          </div>
          <div>
            <h2 className='text-2xl font-bold text-slate-800 dark:text-slate-200'>
              Student Profile
            </h2>
            <p className='text-slate-600 dark:text-slate-400'>
              Academic Information Overview
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='grid grid-cols-1 xl:grid-cols-3 gap-8'>
        {/* Student Image & Basic Info */}
        <div className='xl:col-span-1 space-y-6'>
          <Card className='overflow-hidden border-0 shadow-xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900'>
            <CardHeader className='p-0'>
              {student.imageUrl ? (
                <div className='aspect-[4/5] overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 relative'>
                  <img
                    src={student.imageUrl}
                    alt={`${student.firstName} ${student.lastName}`}
                    className='w-full h-full object-cover transition-all duration-500 hover:scale-110'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent' />
                </div>
              ) : (
                <div className='aspect-[4/5] bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 dark:from-slate-700 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center relative overflow-hidden'>
                  <div className='absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/30 dark:to-purple-900/30' />
                  <div className='relative z-10 text-center space-y-4'>
                    <div className='w-24 h-24 mx-auto bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg'>
                      <FaUser className='h-12 w-12 text-slate-400 dark:text-slate-300' />
                    </div>
                    <p className='text-slate-500 dark:text-slate-400 font-medium'>
                      No Image Available
                    </p>
                  </div>
                </div>
              )}
            </CardHeader>
            <CardContent className='p-6 text-center'>
              <Badge
                variant='secondary'
                className='mb-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 shadow-md'
              >
                <FaIdBadge className='mr-2 h-3 w-3' />
                {student.student_number}
              </Badge>
              <h1 className='text-1xl font-bold text-slate-800 dark:text-slate-200 mb-1'>
                {student.firstName} {student.lastName}
              </h1>
              <p className='text-slate-600 text-xs dark:text-slate-400 font-medium'>
                {courseLabels[student.course]}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Academic Details */}
        <div className='xl:col-span-2 space-y-6'>
          <Card className='border-0 shadow-xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900'>
            <CardHeader className='pb-2'>
              <CardTitle className='text-xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-3'>
                <div className='w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center'>
                  <FaGraduationCap className='h-4 w-4 text-white' />
                </div>
                Academic Information
              </CardTitle>
              <CardDescription className='text-slate-600 dark:text-slate-400'>
                Complete academic profile and enrollment details
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-2'>
              {/* Personal Information */}
              <div className='bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-100 dark:border-blue-800'>
                <h3 className='font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2'>
                  <FaUser className='h-4 w-4 text-blue-600 dark:text-blue-400' />
                  Personal Information
                </h3>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div className='space-y-1'>
                    <span className='text-sm font-medium text-slate-600 dark:text-slate-400'>
                      Full Name
                    </span>
                    <p className='text-slate-800 dark:text-slate-200 font-semibold text-lg'>
                      {student.firstName} {student.lastName}
                    </p>
                  </div>
                  <div className='space-y-1'>
                    <span className='text-sm font-medium text-slate-600 dark:text-slate-400'>
                      Student Number
                    </span>
                    <p className='text-slate-800 dark:text-slate-200 font-semibold text-lg font-mono'>
                      {student.student_number}
                    </p>
                  </div>
                </div>
              </div>

              {/* Academic Details */}
              <div className='bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl p-6 border border-emerald-100 dark:border-emerald-800'>
                <h3 className='font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2'>
                  <FaGraduationCap className='h-4 w-4 text-emerald-600 dark:text-emerald-400' />
                  Academic Details
                </h3>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                  <div className='space-y-3'>
                    <div className='space-y-1'>
                      <span className='text-sm font-medium text-slate-600 dark:text-slate-400'>
                        Course
                      </span>
                      <p className='text-slate-800 dark:text-slate-200 font-semibold'>
                        {courseLabels[student.course]}
                      </p>
                    </div>
                    <div className='space-y-1'>
                      <span className='text-sm font-medium text-slate-600 dark:text-slate-400'>
                        Year Level
                      </span>
                      <Badge
                        variant='outline'
                        className='bg-white dark:bg-slate-800 border-emerald-200 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300'
                      >
                        {yearLabels[student.year]}
                      </Badge>
                    </div>
                  </div>
                  <div className='space-y-3'>
                    <div className='space-y-1'>
                      <span className='text-sm font-medium text-slate-600 dark:text-slate-400'>
                        Section
                      </span>
                      <div className='flex items-center gap-2'>
                        <Badge
                          variant='outline'
                          className='bg-white dark:bg-slate-800 border-emerald-200 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300 text-lg px-3 py-1'
                        >
                          {student.section}
                        </Badge>
                      </div>
                    </div>
                    <div className='space-y-1'>
                      <span className='text-sm font-medium text-slate-600 dark:text-slate-400'>
                        Semester
                      </span>
                      <p className='text-slate-800 dark:text-slate-200 font-semibold'>
                        {semesterLabels[student.semester]} Semester
                      </p>
                    </div>
                  </div>
                  {student.gwa && (
                    <div className='space-y-1'>
                      <span className='text-sm font-medium text-slate-600 dark:text-slate-400'>
                        GWA
                      </span>
                      <div className='flex items-center gap-2'>
                        <Badge
                          variant='outline'
                          className='bg-gradient-to-r from-yellow-400 to-orange-500 dark:from-yellow-500 dark:to-orange-600 text-white border-0 text-lg px-3 py-1'
                        >
                          {student.gwa.toFixed(2)}
                        </Badge>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
