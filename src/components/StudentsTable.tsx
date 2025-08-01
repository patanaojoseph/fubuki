"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "./ui/input";
import {
  Search,
  Users,
  Filter,
  Edit3,
  Trash2,
  GraduationCap,
  User,
  MoreHorizontal,
} from "lucide-react";
import Container from "./global/Container";
import { ComboBox } from "./ui/combo-box";
import { useState } from "react";
import {
  deleteStudent,
  getStudents,
  storeStudent,
} from "@/actions/student.action";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "./ui/skeleton";
import { Dialog, DialogFooter, DialogHeader } from "./ui/dialog";
import { toast } from "sonner";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import AddStudentDialog from "./AddStudentDialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type Student = Awaited<ReturnType<typeof getStudents>>;

interface StudentsTableProps {
  students: Student;
  currentUserId: string;
  isLoading?: boolean; // Add optional loading prop
}

// Loading skeleton for statistics cards
function StatCardSkeleton() {
  return (
    <Card className='border-0 shadow-lg'>
      <CardContent className='p-4'>
        <div className='flex items-center gap-3'>
          <Skeleton className='w-10 h-10 rounded-lg' />
          <div className='space-y-2'>
            <Skeleton className='h-3 w-20' />
            <Skeleton className='h-6 w-8' />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Loading skeleton for table rows
function TableRowSkeleton() {
  return (
    <TableRow className='border-b border-slate-100 dark:border-slate-800'>
      <TableCell className='py-4'>
        <div className='flex items-center gap-2'>
          <Skeleton className='w-8 h-8 rounded-lg' />
          <Skeleton className='h-4 w-24' />
        </div>
      </TableCell>
      <TableCell className='py-4'>
        <div className='flex items-center gap-3'>
          <Skeleton className='w-10 h-10 rounded-full' />
          <div className='space-y-2'>
            <Skeleton className='h-4 w-32' />
            <Skeleton className='h-3 w-24' />
          </div>
        </div>
      </TableCell>
      <TableCell className='py-4'>
        <div className='flex items-center gap-2'>
          <Skeleton className='h-6 w-12 rounded-full' />
          <span className='text-slate-600 dark:text-slate-400'>-</span>
          <Skeleton className='h-6 w-8 rounded-full' />
        </div>
      </TableCell>
      <TableCell className='py-4'>
        <Skeleton className='h-6 w-32 rounded-full' />
      </TableCell>
      <TableCell className='py-4'>
        <Skeleton className='h-4 w-28' />
      </TableCell>
      <TableCell className='py-4 text-right'>
        <div className='flex justify-end items-center gap-2'>
          <Skeleton className='h-8 w-8 rounded' />
          <Skeleton className='h-8 w-8 rounded' />
        </div>
      </TableCell>
    </TableRow>
  );
}

export default function StudentsTable({
  students,
  currentUserId,
  isLoading = false,
}: StudentsTableProps) {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isFiltering, setIsFiltering] = useState(false); // Local loading state for filtering
  const router = useRouter();

  // Dialog states
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  // Delete dialog state
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    studentId: "",
    studentName: "",
  });

  const filteredStudents = students?.userStudents?.filter((student) => {
    const search = searchTerm.toLowerCase();

    const fullNameMatch =
      student.firstName.toLowerCase().includes(search) ||
      student.lastName.toLowerCase().includes(search);

    const studentNumberMatch = student.student_number
      .toLowerCase()
      .includes(search);

    const matchesCourse =
      selectedCourse === "" || student.course === selectedCourse;

    return (fullNameMatch || studentNumberMatch) && matchesCourse;
  });

  const handleStudentClick = (student: any) => {
    console.log("Navigating with student:", student);
    const slugifiedName = student.student_number
      .toLowerCase()
      .replace(/\s+/g, "-");
    const slug = `${student.id}--${slugifiedName}`;
    const studentUrl = `/students/${slug}`;
    router.push(studentUrl);
  };

  // Simulate filtering delay for demonstration
  const handleSearch = (value: string) => {
    setIsFiltering(true);
    setSearchTerm(value);
    // Remove this timeout in production - it's just for demo
    setTimeout(() => setIsFiltering(false), 300);
  };

  // Handle dialog actions
  const handleEditStudent = async (studentData: any) => {
    try {
      // Call the update student API/action here
      console.log("Updating student:", studentData);
      // await updateStudent(studentData.id, studentData);

      setIsEditDialogOpen(false);
      setSelectedStudent(null);
    } catch (error) {
      console.error("Error updating student:", error);
      throw error; // Re-throw to show error in dialog
    }
  };
  const openEditDialog = (student: any) => {
    setSelectedStudent(student);
    setIsEditDialogOpen(true);
  };

  // Helper Utility Functions
  const courseLabels: Record<string, string> = {
    BACHELOR_OF_SCIENCE_IN_COMPUTER_SCIENCE: "BS Computer Science",
    BACHELOR_OF_SCIENCE_IN_INFORMATION_TECHNOLOGY: "BS Information Technology",
    BACHELOR_OF_SCIENCE_IN_INFORMATION_SYSTEM: "BS Information System",
    BACHELOR_OF_SCIENCE_IN_MULTIMEDIA_COMPUTING: "BS Multimedia Computing",
  };

  const yearLabels: Record<string, string> = {
    FIRST: "1st",
    SECOND: "2nd",
    THIRD: "3rd",
    FOURTH: "4th",
  };

  const semesterLabels: Record<string, string> = {
    FIRST: "First",
    SECOND: "Second",
  };

  const getCourseColor = (course: string) => {
    const colors: Record<string, string> = {
      BACHELOR_OF_SCIENCE_IN_COMPUTER_SCIENCE:
        "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 hover:text-gray-100",
      BACHELOR_OF_SCIENCE_IN_INFORMATION_TECHNOLOGY:
        "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 hover:text-gray-100",
      BACHELOR_OF_SCIENCE_IN_INFORMATION_SYSTEM:
        "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 hover:text-gray-100",
      BACHELOR_OF_SCIENCE_IN_MULTIMEDIA_COMPUTING:
        "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 hover:text-gray-100",
    };
    return (
      colors[course] ||
      "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    );
  };

  const getYearColor = (year: string) => {
    const colors: Record<string, string> = {
      FIRST:
        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 hover:text-gray-100",
      SECOND:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 hover:text-gray-100",
      THIRD:
        "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 hover:text-gray-100",
      FOURTH:
        "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 hover:text-gray-100",
    };
    return (
      colors[year] ||
      "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    );
  };

  type IconProps = {
    className?: string;
  };

  const Plus = ({ className }: IconProps) => (
    <svg
      className={className}
      fill='none'
      stroke='currentColor'
      viewBox='0 0 24 24'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M12 4v16m8-8H4'
      />
    </svg>
  );

  // Delete confirmation and execution functions
  // const handleDeleteStudent = (studentId: string, studentName: string) => {
  //   toast.custom(
  //     (t) => (
  //       <div className='bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg p-4 max-w-md mt-24'>
  //         <div className='flex items-start gap-3'>
  //           <div className='flex-shrink-0 w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center'>
  //             <Trash2 className='h-5 w-5 text-red-600 dark:text-red-400' />
  //           </div>
  //           <div className='flex-1 min-w-0'>
  //             <h3 className='text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1'>
  //               Delete Student
  //             </h3>
  //             <p className='text-sm text-slate-600 dark:text-slate-400 mb-3'>
  //               Are you sure you want to delete{" "}
  //               <span className='font-medium'>{studentName}</span>? This action
  //               cannot be undone.
  //             </p>
  //             <div className='flex gap-2'>
  //               <Button
  //                 size='sm'
  //                 variant='outline'
  //                 onClick={() => toast.dismiss(t)}
  //                 className='h-8 px-3 text-xs border-slate-300 dark:border-slate-600'
  //               >
  //                 Cancel
  //               </Button>
  //               <Button
  //                 size='sm'
  //                 onClick={async () => {
  //                   toast.dismiss(t);
  //                   await executeDelete(studentId, studentName);
  //                 }}
  //                 className='h-8 px-3 text-xs bg-red-600 hover:bg-red-700 text-white'
  //               >
  //                 Delete
  //               </Button>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     ),
  //     {
  //       duration: Infinity, // Keep open until user interacts
  //       position: "top-center",
  //     }
  //   );
  // };

  // // Function to execute the actual deletion
  // const executeDelete = async (studentId: string, studentName: string) => {
  //   try {
  //     // Show loading toast
  //     const loadingToast = toast.loading(`Deleting ${studentName}...`, {
  //       position: "bottom-right",
  //     });

  //     await deleteStudent(studentId);

  //     // Dismiss loading toast and show success
  //     toast.dismiss(loadingToast);
  //     toast.success(`${studentName} has been deleted successfully!`, {
  //       position: "bottom-right",
  //       duration: 3000,
  //     });

  //     // Refresh the page or update local state
  //     router.refresh();
  //   } catch (error) {
  //     console.error("Error deleting student:", error);
  //     toast.error(`Failed to delete ${studentName}. Please try again.`, {
  //       position: "bottom-right",
  //       duration: 4000,
  //     });
  //   }
  // };
  // Updated delete handler function
  const handleDeleteStudent = (studentId: string, studentName: string) => {
    setDeleteDialog({
      open: true,
      studentId,
      studentName,
    });
  };

  // Function to execute the actual deletion
  const executeDelete = async (studentId: string, studentName: string) => {
    try {
      // Close the dialog first
      setDeleteDialog({ open: false, studentId: "", studentName: "" });

      // Show loading toast
      const loadingToast = toast.loading(`Deleting ${studentName}...`, {
        position: "bottom-right",
      });

      await deleteStudent(studentId);

      // Dismiss loading toast and show success
      toast.dismiss(loadingToast);
      toast.success(`${studentName} has been deleted successfully!`, {
        position: "bottom-right",
        duration: 3000,
      });

      // Refresh the page or update local state
      router.refresh();
    } catch (error) {
      console.error("Error deleting student:", error);
      toast.error(`Failed to delete ${studentName}. Please try again.`, {
        position: "bottom-right",
        duration: 4000,
      });
    }
  };

  return (
    <Container>
      <div className='w-full space-y-2'>
        {/* Header Section */}
        <div className='space-y-6'>
          <div className='flex items-center gap-4 mt-6'>
            <div className='w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center'>
              <Users className='h-6 w-6 text-white' />
            </div>
            <div>
              <h1 className='text-3xl font-bold text-slate-800 dark:text-slate-200'>
                Students Directory
              </h1>
              <p className='text-slate-600 dark:text-slate-400'>
                Manage and view all student records
              </p>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
            {isLoading ? (
              // Show skeleton loading for statistics cards
              <>
                <StatCardSkeleton />
                <StatCardSkeleton />
                <StatCardSkeleton />
                <StatCardSkeleton />
              </>
            ) : (
              <>
                <Card className='border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20'>
                  <CardContent className='p-4'>
                    <div className='flex items-center gap-3'>
                      <div className='w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center'>
                        <Users className='h-5 w-5 text-white' />
                      </div>
                      <div>
                        <p className='text-sm text-slate-600 dark:text-slate-400'>
                          Total Students
                        </p>
                        <p className='text-xl font-bold text-slate-800 dark:text-slate-200'>
                          {students?.userStudents?.length || 0}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className='border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20'>
                  <CardContent className='p-4'>
                    <div className='flex items-center gap-3'>
                      <div className='w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center'>
                        <Filter className='h-5 w-5 text-white' />
                      </div>
                      <div>
                        <p className='text-sm text-slate-600 dark:text-slate-400'>
                          Filtered Results
                        </p>
                        <p className='text-xl font-bold text-slate-800 dark:text-slate-200'>
                          {filteredStudents?.length || 0}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className='border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20'>
                  <CardContent className='p-4'>
                    <div className='flex items-center gap-3'>
                      <div className='w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center'>
                        <GraduationCap className='h-5 w-5 text-white' />
                      </div>
                      <div>
                        <p className='text-sm text-slate-600 dark:text-slate-400'>
                          Courses
                        </p>
                        <p className='text-xl font-bold text-slate-800 dark:text-slate-200'>
                          4
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className='border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20'>
                  <CardContent className='p-4'>
                    <div className='flex items-center gap-3'>
                      <div className='w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center'>
                        <User className='h-5 w-5 text-white' />
                      </div>
                      <div>
                        <p className='text-sm text-slate-600 dark:text-slate-400'>
                          Active
                        </p>
                        <p className='text-xl font-bold text-slate-800 dark:text-slate-200'>
                          {students?.userStudents?.length || 0}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>
        {/* Search and Filter Section */}
        <Card className='border-0 shadow-xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900'>
          <CardContent className='p-6'>
            <div className='flex flex-col md:flex-row items-center gap-4'>
              {/* Search Name */}
              <div className='relative flex-1 max-w-md'>
                <Input
                  placeholder='Search students by name...'
                  className='pl-12 h-12 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400'
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                />
                <Search className='absolute h-5 w-5 left-4 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500' />
              </div>
              {/* Filter Course */}
              <div className='flex items-center gap-2'>
                <Filter className='h-4 w-4 text-slate-600 dark:text-slate-400' />
                <ComboBox value={selectedCourse} onChange={setSelectedCourse} />
              </div>
              {/* Add Student Button */}
              <div className='md:ml-auto'>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className='group relative h-12 px-6 bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-600 hover:from-emerald-500 hover:via-emerald-600 hover:to-emerald-700 text-white border-0 shadow-2xl hover:shadow-emerald-500/25 transition-all duration-500 transform hover:-translate-y-1 font-bold text-base rounded-2xl'>
                      <div className='absolute -top-1 -left-1 -right-1 -bottom-1 bg-gradient-to-br from-emerald-300 to-emerald-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm'></div>
                      <Plus className='h-6 w-6 mr-3 group-hover:rotate-90 transition-transform duration-300' />
                      <span className='relative z-10'>Add New Student</span>
                    </Button>
                  </DialogTrigger>
                  <AddStudentDialog />
                </Dialog>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Table Section */}
        <Card className='border-0 shadow-xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 overflow-hidden'>
          <CardHeader className='bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 border-b border-slate-200 dark:border-slate-700'>
            <CardTitle className='text-slate-800 dark:text-slate-200 flex items-center gap-2'>
              <Users className='h-5 w-5' />
              Student Records
              {(isLoading || isFiltering) && (
                <Skeleton className='h-4 w-16 rounded ml-2' />
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className='p-0'>
            <div className='overflow-x-auto'>
              <Table>
                <TableHeader>
                  <TableRow className='border-b border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50'>
                    <TableHead className='text-slate-700 dark:text-slate-300 font-semibold py-4'>
                      Student No.
                    </TableHead>
                    <TableHead className='text-slate-700 dark:text-slate-300 font-semibold py-4'>
                      Full Name
                    </TableHead>
                    <TableHead className='text-slate-700 dark:text-slate-300 font-semibold py-4'>
                      Year / Section
                    </TableHead>
                    <TableHead className='text-slate-700 dark:text-slate-300 font-semibold py-4'>
                      Course
                    </TableHead>
                    <TableHead className='text-slate-700 dark:text-slate-300 font-semibold py-4'>
                      Semester
                    </TableHead>
                    <TableHead className='text-slate-700 dark:text-slate-300 font-semibold py-4 text-right'>
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading || isFiltering ? (
                    <>
                      <TableRowSkeleton />
                      <TableRowSkeleton />
                    </>
                  ) : filteredStudents && filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => {
                      const {
                        id,
                        firstName,
                        lastName,
                        course,
                        section,
                        year,
                        semester,
                        student_number,
                        imageUrl,
                      } = student;

                      return (
                        <TableRow
                          key={id}
                          onClick={() => handleStudentClick(student)}
                          className='cursor-pointer border-b border-slate-100 dark:border-slate-800 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 dark:hover:from-blue-900/10 dark:hover:to-purple-900/10 transition-all duration-200'
                        >
                          <TableCell className='py-4'>
                            <div className='flex items-center gap-2'>
                              <div className='w-8 h-8 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-600 dark:to-slate-700 rounded-lg flex items-center justify-center'>
                                <span className='text-xs font-semibold text-slate-600 dark:text-slate-300'>
                                  {student_number.slice(-2)}
                                </span>
                              </div>
                              <span className='font-mono text-sm text-slate-800 dark:text-slate-200'>
                                {student_number}
                              </span>
                            </div>
                          </TableCell>

                          <TableCell className='py-4'>
                            <div className='flex items-center gap-3'>
                              <div className='w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center'>
                                <span className='text-white font-semibold text-sm'>
                                  {firstName[0]}
                                  {lastName[0]}
                                </span>
                              </div>
                              <div>
                                <p className='font-semibold text-slate-800 dark:text-slate-200'>
                                  {lastName}, {firstName}
                                </p>
                                <p className='text-sm text-slate-500 dark:text-slate-400'>
                                  Student ID: {id.slice(0, 8)}...
                                </p>
                              </div>
                            </div>
                          </TableCell>

                          <TableCell className='py-4'>
                            <div className='flex items-center gap-2'>
                              <Badge
                                className={`${getYearColor(
                                  year
                                )} border-0 font-medium`}
                              >
                                {yearLabels[year]}
                              </Badge>
                              <span className='text-slate-600 dark:text-slate-400'>
                                -
                              </span>
                              <Badge
                                variant='outline'
                                className='bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600'
                              >
                                {section}
                              </Badge>
                            </div>
                          </TableCell>

                          <TableCell className='py-4'>
                            <Badge
                              className={`${getCourseColor(
                                course
                              )} border-0 font-medium`}
                            >
                              {courseLabels[course]}
                            </Badge>
                          </TableCell>

                          <TableCell className='py-4'>
                            <span className='text-slate-700 dark:text-slate-300 font-medium'>
                              {semesterLabels[semester]} Semester
                            </span>
                          </TableCell>

                          <TableCell className='py-4 text-right'>
                            <div
                              className='flex justify-end items-center gap-1'
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Button
                                variant='ghost'
                                size='sm'
                                className='p-2 h-8 w-8 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-md transition-colors duration-200'
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openEditDialog(student);
                                  console.log("Edit student:", id);
                                }}
                                title='Edit student'
                                aria-label='Edit student'
                              >
                                <Edit3 className='h-4 w-4' />
                              </Button>

                              <Button
                                variant='ghost'
                                size='sm'
                                className='p-2 h-8 w-8 hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 rounded-md transition-colors duration-200'
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteStudent(
                                    id,
                                    `${firstName} ${lastName}`
                                  );
                                  console.log("Delete student:", id);
                                }}
                                title='Delete student'
                                aria-label='Delete student'
                              >
                                <Trash2 className='h-4 w-4' />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className='text-center py-12'>
                        <div className='flex flex-col items-center space-y-4'>
                          <div className='w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center'>
                            <Users className='h-8 w-8 text-slate-400 dark:text-slate-500' />
                          </div>
                          <div className='space-y-2'>
                            <p className='text-slate-500 dark:text-slate-400 font-medium'>
                              No students found
                            </p>
                            <p className='text-sm text-slate-400 dark:text-slate-500'>
                              Try adjusting your search or filter criteria
                            </p>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Edit Student Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <AddStudentDialog
          mode='edit'
          studentData={selectedStudent}
          onSubmit={handleEditStudent}
          onClose={() => {
            setIsEditDialogOpen(false);
            setSelectedStudent(null);
          }}
        />
      </Dialog>
      {/* Delete Student Dialog */}
      <AlertDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog((prev) => ({ ...prev, open }))}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className='flex items-center gap-3'>
              <div className='flex-shrink-0 w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center'>
                <Trash2 className='h-5 w-5 text-red-600 dark:text-red-400' />
              </div>
              <AlertDialogTitle className='text-sm font-semibold'>
                Delete Student
              </AlertDialogTitle>
            </div>
            <AlertDialogDescription className='text-sm text-slate-600 dark:text-slate-400 ml-13'>
              Are you sure you want to delete{" "}
              <span className='font-medium'>{deleteDialog.studentName}</span>?
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className='h-8 px-3 text-xs'>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                executeDelete(deleteDialog.studentId, deleteDialog.studentName)
              }
              className='h-8 px-3 text-xs bg-red-600 hover:bg-red-700 text-white'
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Container>
  );
}
