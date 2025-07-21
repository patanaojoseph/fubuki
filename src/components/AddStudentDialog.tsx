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
  Upload,
  X,
  Check,
  Layout,
  Loader2,
} from "lucide-react";
import {
  COURSE_OPTIONS,
  SECTION_OPTIONS,
  YEAR_OPTIONS,
  SEMESTER_LEVEL,
} from "@/lib/constants"; // adjust if your path is different
import React, { useState } from "react";
import { storeStudent } from "@/actions/student.action";
import { toast } from "sonner";
import { Course, Section, Semester, Year } from "@/generated/prisma";
import ImageUpload from "./ImageUpload";

export default function AddStudentDialog() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [fileInputKey, setFileInputKey] = useState(Date.now()); // forces <input> remount
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file");
        return;
      }
      // Validate file size (limit: 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }
      // Store file object in state
      setSelectedFile(file);
      // Set image preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      // Store filename in form data
      handleChange("imageUrl", file.name); // or URL if uploading later
    }
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    course: "",
    section: "",
    year: "",
    semester: "",
    student_number: "",
    imageUrl: "",
  });
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
  const handleAddStudent = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const newStudent = await storeStudent({
        firstName: formData.firstName,
        lastName: formData.lastName,
        student_number: formData.student_number,
        course: formData.course as Course, // cast to enum
        section: formData.section as Section,
        year: formData.year as Year,
        semester: formData.semester as Semester,
        imageUrl: formData.imageUrl || null,
        gwa: null, // optional
        userId: "your-user-id",
        subjects: {
          create: [], // start with no subjects
        },
      });

      console.log("Student created:", newStudent);

      // Reset form or show success feedback
      setFormData({
        firstName: "",
        lastName: "",
        course: "",
        section: "",
        year: "",
        semester: "",
        student_number: "",
        imageUrl: "",
      });
      setSelectedFile(null);
      setImagePreview(null);
      setFileInputKey(Date.now()); // Reset file input

      toast.success("Student added successfully!");

      // Optional: Reset form, show toast, etc.
    } catch (error) {
      console.error("Error storing student data", error);
      toast.error("Failed to add student. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setImagePreview(null);
    setFileInputKey(Date.now());
    handleChange("imageUrl", "");
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
              Add New Student
            </DialogTitle>
            <DialogDescription className='text-slate-600 dark:text-slate-400 mt-1'>
              Create a new student profile with their academic information
            </DialogDescription>
          </div>
        </div>
      </DialogHeader>

      <form onSubmit={handleAddStudent}>
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
              />
            </div>
          </div>

          <DialogFooter className='relative z-10 gap-3 pt-6 border-t border-slate-200/50 dark:border-slate-700/50'>
            <DialogClose asChild>
              <Button
                variant='outline'
                className='flex-1 sm:flex-none h-10 border-slate-300 dark:border-slate-600 bg-white/80 dark:bg-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium transition-all duration-200 backdrop-blur-sm'
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type='submit'
              disabled={isLoading}
              className='group flex-1 sm:flex-none h-10 bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 hover:from-emerald-600 hover:via-emerald-700 hover:to-emerald-800 text-white font-bold shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 transform hover:-translate-y-0.5'
            >
              <div className='absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-md opacity-0 group-hover:opacity-20 transition-opacity duration-300'></div>
              {isLoading ? (
                <div className='relative z-10 flex items-center gap-2'>
                  <Loader2 className='h-4 w-4 animate-spin' />
                  <span>Adding...</span>
                </div>
              ) : (
                <>
                  <GraduationCap className='h-4 w-4 mr-2 group-hover:rotate-12 transition-transform duration-300' />
                  <span className='relative z-10'>Add Student</span>
                </>
              )}
            </Button>
          </DialogFooter>
        </div>
      </form>
    </DialogContent>
  );
}
