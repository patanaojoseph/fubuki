"use client";

import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import {
  User,
  Hash,
  GraduationCap,
  BookOpen,
  Calendar,
  Layout,
  Loader2,
  UserPlus,
  Edit3,
} from "lucide-react";
import {
  COURSE_OPTIONS,
  SECTION_OPTIONS,
  YEAR_OPTIONS,
  SEMESTER_LEVEL,
} from "@/lib/constants"; // adjust if your path is different
import React, { useState, useEffect } from "react";
import { storeStudent, updateStudent } from "@/actions/student.action";
import { toast } from "sonner";
import { Course, Section, Semester, Year } from "@/generated/prisma";
import ImageUpload from "./ImageUpload";

// Define the student type based on your existing structure
type StudentData = {
  id: string;
  firstName: string;
  lastName: string;
  course: string;
  section: string;
  year: string;
  semester: string;
  student_number: string;
  imageUrl: string;
};

interface AddStudentDialogProps {
  mode?: "add" | "edit";
  studentData?: StudentData | null;
  onSubmit?: (data: StudentData) => Promise<void> | void;
  onClose?: () => void;
}

export default function AddStudentDialog({
  mode = "add",
  studentData = null,
  onSubmit,
  onClose,
}: AddStudentDialogProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [fileInputKey, setFileInputKey] = useState(Date.now()); // forces <input> remount
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    course: "",
    section: "",
    year: "",
    semester: "",
    student_number: "",
    imageUrl: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<StudentData>>({});

  // Populate form data when in edit mode
  useEffect(() => {
    if (mode === "edit" && studentData) {
      setFormData({
        id: studentData.id || "",
        firstName: studentData.firstName || "",
        lastName: studentData.lastName || "",
        course: studentData.course || "",
        section: studentData.section || "",
        year: studentData.year || "",
        semester: studentData.semester || "",
        student_number: studentData.student_number || "",
        imageUrl: studentData.imageUrl || "",
      });
    } else {
      // Reset form for add mode
      setFormData({
        id: "",
        firstName: "",
        lastName: "",
        course: "",
        section: "",
        year: "",
        semester: "",
        student_number: "",
        imageUrl: "",
      });
    }
  }, [mode, studentData]);

  const handleChange = (field: string, value: string | number) => {
    console.log(`Field changed: ${field}, New Value: ${value}`);
    setFormData({ ...formData, [field]: value });
  };
  // const handleAddStudent = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   try {
  //     const newStudent = await storeStudent(formData);
  //   } catch (error) {
  //     console.error("Error storing student data", error);
  //   }
  // };
  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   setIsLoading(true);

  //   setIsLoading(true);

  //   try {
  //     if (mode === "add") {
  //       const newStudent = await storeStudent({
  //         firstName: formData.firstName,
  //         lastName: formData.lastName,
  //         student_number: formData.student_number,
  //         course: formData.course as Course,
  //         section: formData.section as Section,
  //         year: formData.year as Year,
  //         semester: formData.semester as Semester,
  //         imageUrl: formData.imageUrl || null,
  //         gwa: null,
  //         userId: "your-user-id", // replace this with actual logic
  //         subjects: {
  //           create: [],
  //         },
  //       });

  //       console.log("Student created:", newStudent);
  //       toast.success("Student added successfully!");
  //     } else {
  //       // If onSubmit is passed, delegate edit logic to parent
  //       if (onSubmit) {
  //         await onSubmit(formData);
  //         toast.success("Student updated successfully!");
  //       }
  //     }

  //     // Reset form only when adding
  //     if (mode === "add") {
  //       setFormData({
  //         firstName: "",
  //         lastName: "",
  //         student_number: "",
  //         course: "",
  //         section: "",
  //         year: "",
  //         semester: "",
  //         imageUrl: "",
  //       });
  //       setSelectedFile(null);
  //       setImagePreview(null);
  //       setFileInputKey(Date.now()); // reset file input key
  //     }

  //     if (onClose) {
  //       onClose();
  //     }
  //   } catch (error) {
  //     console.error(
  //       `Error ${mode === "add" ? "adding" : "submitting"} student:`,
  //       error
  //     );
  //     toast.error(`Failed to ${mode === "add" ? "add" : "update"} student.`);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const resetForm = () => {
    setFormData({
      id: "",
      firstName: "",
      lastName: "",
      student_number: "",
      course: "",
      section: "",
      year: "",
      semester: "",
      imageUrl: "",
    });
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      if (mode === "add") {
        // The storeStudent function handles userId internally, so we don't need to include it
        const newStudent = await storeStudent({
          firstName: formData.firstName,
          lastName: formData.lastName,
          student_number: formData.student_number,
          course: formData.course as Course,
          section: formData.section as Section,
          year: formData.year as Year,
          semester: formData.semester as Semester,
          imageUrl: formData.imageUrl || null,
          gwa: null,
          userId: "your-user-id",
        });

        console.log("Student created:", newStudent);
        toast.success("Student added successfully!");

        // Reset form after adding
        resetForm();
        setSelectedFile(null);
        setImagePreview(null);
        setFileInputKey(Date.now());
      } else if (mode === "edit" && studentData?.id) {
        // Use the update method
        const updatedStudent = await updateStudent(studentData.id, {
          firstName: formData.firstName,
          lastName: formData.lastName,
          student_number: formData.student_number,
          course: formData.course as Course,
          section: formData.section as Section,
          year: formData.year as Year,
          semester: formData.semester as Semester,
          imageUrl: formData.imageUrl || null,
        });

        console.log("Student updated:", updatedStudent);
        toast.success("Student updated successfully!");

        // If onSubmit callback is provided, call it with the updated data
        if (onSubmit) {
          await onSubmit(formData);
        }
      }

      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error(
        `Error ${mode === "add" ? "adding" : "updating"} student:`,
        error
      );
      toast.error(`Failed to ${mode === "add" ? "add" : "update"} student.`);
    } finally {
      setIsLoading(false);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setImagePreview(null);
    setFileInputKey(Date.now());
    handleChange("imageUrl", "");
    setFormData((prev) => ({
      ...prev,
      imageUrl: "",
    }));
  };

  return (
    <DialogContent className='sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl border-0 shadow-2xl bg-gradient-to-br from-white via-slate-50 to-slate-100 dark:from-slate-800 dark:via-slate-850 dark:to-slate-900 backdrop-blur-sm'>
      <div className='absolute inset-0 bg-gradient-to-br from-emerald-50/30 via-transparent to-blue-50/20 dark:from-emerald-900/20 dark:via-transparent dark:to-blue-900/10 rounded-lg pointer-events-none'></div>

      <DialogHeader className='relative z-10 pb-3 border-b border-slate-200/50 dark:border-slate-700/50'>
        <div className='flex items-center gap-3'>
          <div className='p-2 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg'>
            <User className='h-6 w-6 text-white' />
          </div>
          <div>
            <DialogTitle className='text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent'>
              {mode === "add" ? <>Add New Student</> : <>Edit Student</>}
            </DialogTitle>
            <DialogDescription className='text-slate-600 dark:text-slate-400 mt-1'>
              {mode === "add"
                ? "Create a new student profile with their academic information"
                : "Update a student's information below."}
            </DialogDescription>
          </div>
        </div>
      </DialogHeader>

      <form onSubmit={handleSubmit}>
        <div className='relative z-10 space-y-3 py-3'>
          {/* Personal Information Section */}
          <div className='space-y-4'>
            <div className='flex items-center gap-2 mb-4'>
              <div className='w-1 h-6 bg-gradient-to-b from-emerald-400 to-emerald-600 rounded-full'></div>
              <h3 className='font-semibold text-slate-800 dark:text-slate-200'>
                Personal Information
              </h3>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <label className='text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2'>
                  <User className='h-4 w-4 text-emerald-500' />
                  First Name
                </label>
                <Input
                  id='firstName'
                  name='firstName'
                  type='text'
                  placeholder='Enter first name'
                  value={formData.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  className='h-11 border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all duration-200 hover:bg-white dark:hover:bg-slate-800'
                  required
                />
              </div>
              <div className='space-y-2'>
                <label className='text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2'>
                  <User className='h-4 w-4 text-emerald-500' />
                  Last Name
                </label>
                <Input
                  id='lastName'
                  name='lastName'
                  type='text'
                  placeholder='Enter last name'
                  value={formData.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  className='h-11 border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all duration-200 hover:bg-white dark:hover:bg-slate-800'
                />
              </div>
            </div>
          </div>

          {/* Academic Information Section */}
          <div className='space-y-4'>
            <div className='flex items-center gap-2 mb-4'>
              <div className='w-1 h-6 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full'></div>
              <h3 className='font-semibold text-slate-800 dark:text-slate-200'>
                Academic Information
              </h3>
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2'>
                <Hash className='h-4 w-4 text-blue-500' />
                Student no.
              </label>
              <Input
                id='student_number'
                name='student_number'
                type='text'
                placeholder='Enter student no.'
                value={formData.student_number}
                onChange={(e) => handleChange("student_number", e.target.value)}
                className='h-11 border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-200 hover:bg-white dark:hover:bg-slate-800'
              />
            </div>

            {/* Courses */}
            <div className='space-y-2'>
              <label className='text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2'>
                <GraduationCap className='h-4 w-4 text-purple-500' />
                Course
              </label>
              <div className='relative'>
                <select
                  id='course'
                  name='course'
                  value={formData.course}
                  onChange={(e) => handleChange("course", e.target.value)}
                  className='h-11 w-full border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all duration-200 hover:bg-white dark:hover:bg-slate-800 rounded-md px-3 text-sm appearance-none cursor-pointer'
                  required
                >
                  <option value=''>Select course</option>
                  {COURSE_OPTIONS.map((course) => (
                    <option key={course.value} value={course.value}>
                      {course.label}
                    </option>
                  ))}
                </select>
                {/* Custom dropdown arrow */}
                <div className='absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none'>
                  <svg
                    className='w-4 h-4 text-slate-400'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M19 9l-7 7-7-7'
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {/* Sections */}
              <div className='space-y-2'>
                <label className='text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2'>
                  <Layout className='h-4 w-4 text-indigo-500' />
                  Section
                </label>
                <div className='relative'>
                  <select
                    id='section'
                    name='section'
                    value={formData.section}
                    onChange={(e) => handleChange("section", e.target.value)}
                    className='h-11 w-full border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all duration-200 hover:bg-white dark:hover:bg-slate-800 rounded-md px-3 text-sm appearance-none cursor-pointer'
                    required
                  >
                    <option value=''>Select section</option>
                    {SECTION_OPTIONS.map((section) => (
                      <option key={section.value} value={section.value}>
                        {section.label}
                      </option>
                    ))}
                  </select>
                  {/* Custom dropdown arrow */}
                  <div className='absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none'>
                    <svg
                      className='w-4 h-4 text-slate-400'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M19 9l-7 7-7-7'
                      />
                    </svg>
                  </div>
                </div>
              </div>
              {/* Year level */}
              <div className='space-y-2'>
                <label className='text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2'>
                  <Calendar className='h-4 w-4 text-orange-500' />
                  Year Level
                </label>
                <div className='relative'>
                  <select
                    id='year'
                    name='year'
                    value={formData.year}
                    onChange={(e) => handleChange("year", e.target.value)}
                    className='h-11 w-full border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all duration-200 hover:bg-white dark:hover:bg-slate-800 rounded-md px-3 text-sm appearance-none cursor-pointer'
                    required
                  >
                    <option value=''>Select year level</option>
                    {YEAR_OPTIONS.map((year) => (
                      <option key={year.value} value={year.value}>
                        {year.label}
                      </option>
                    ))}
                  </select>
                  {/* Custom dropdown arrow */}
                  <div className='absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none'>
                    <svg
                      className='w-4 h-4 text-slate-400'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M19 9l-7 7-7-7'
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {/* Enhanced Semester */}
              <div className='space-y-2'>
                <label className='text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2'>
                  <BookOpen className='h-4 w-4 text-indigo-500' />
                  Semester
                </label>
                <div className='relative'>
                  <select
                    id='semester'
                    name='semester'
                    value={formData.semester}
                    onChange={(e) => handleChange("semester", e.target.value)}
                    className='h-11 w-full border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all duration-200 hover:bg-white dark:hover:bg-slate-800 rounded-md px-3 text-sm appearance-none cursor-pointer'
                    required
                  >
                    <option value=''>Select semester</option>
                    {SEMESTER_LEVEL.map((semester) => (
                      <option key={semester.value} value={semester.value}>
                        {semester.label}
                      </option>
                    ))}
                  </select>
                  {/* Custom dropdown arrow */}
                  <div className='absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none'>
                    <svg
                      className='w-4 h-4 text-slate-400'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M19 9l-7 7-7-7'
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Enhanced Image Upload */}
              <ImageUpload
                endpoint='postImage'
                value={formData.imageUrl}
                onChange={(url) => {
                  handleChange("imageUrl", url);
                }}
                onRemove={removeFile}
              />
            </div>
          </div>

          <DialogFooter className='relative z-10 gap-3 pt-6 border-t border-slate-200/50 dark:border-slate-700/50'>
            <DialogClose asChild>
              <Button
                variant='outline'
                className='flex-1 sm:flex-none h-10 border-slate-300 dark:border-slate-600 bg-white/80 dark:bg-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium transition-all duration-200 backdrop-blur-sm'
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type='submit'
              disabled={isLoading || isSubmitting}
              className={`group flex-1 sm:flex-none h-10 text-white font-bold shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 ${
                mode === "add"
                  ? "bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 hover:from-emerald-600 hover:via-emerald-700 hover:to-emerald-800 hover:shadow-emerald-500/25"
                  : "bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 hover:shadow-blue-500/25"
              }`}
            >
              <div
                className={`absolute inset-0 rounded-md opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${
                  mode === "add"
                    ? "bg-gradient-to-r from-emerald-400 to-emerald-600"
                    : "bg-gradient-to-r from-blue-400 to-blue-600"
                }`}
              ></div>

              {isLoading || isSubmitting ? (
                <div className='relative z-10 flex items-center gap-2'>
                  <Loader2 className='h-4 w-4 animate-spin' />
                  <span>{mode === "add" ? "Adding..." : "Updating..."}</span>
                </div>
              ) : (
                <>
                  {mode === "add" ? (
                    <>
                      <UserPlus className='h-4 w-4 mr-2 group-hover:rotate-12 transition-transform duration-300' />
                      <span className='relative z-10'>Add Student</span>
                    </>
                  ) : (
                    <>
                      <Edit3 className='h-4 w-4 mr-2 group-hover:rotate-12 transition-transform duration-300' />
                      <span className='relative z-10'>Update Student</span>
                    </>
                  )}
                </>
              )}
            </Button>
          </DialogFooter>
        </div>
      </form>
    </DialogContent>
  );
}
