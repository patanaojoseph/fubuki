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
  Mail,
  Hash,
  GraduationCap,
  BookOpen,
  Calendar,
  Upload,
  X,
  Check,
  Layout,
} from "lucide-react";
import {
  COURSE_OPTIONS,
  SECTION_OPTIONS,
  YEAR_OPTIONS,
  SEMESTER_LEVEL,
} from "@/lib/constants"; // adjust if your path is different
import { useState } from "react";

export default function AddStudentDialog() {
  const [course, setCourse] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file");
        return;
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }

      setSelectedFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setImagePreview(null);
    // Reset the file input
    const fileInput = document.getElementById(
      "image-upload"
    ) as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  return (
    <DialogContent className='sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl border-0 shadow-2xl bg-gradient-to-br from-white via-slate-50 to-slate-100 dark:from-slate-800 dark:via-slate-850 dark:to-slate-900 backdrop-blur-sm'>
      <div className='absolute inset-0 bg-gradient-to-br from-emerald-50/30 via-transparent to-blue-50/20 dark:from-emerald-900/20 dark:via-transparent dark:to-blue-900/10 rounded-lg pointer-events-none'></div>

      <DialogHeader className='relative z-10 pb-6 border-b border-slate-200/50 dark:border-slate-700/50'>
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

      <div className='relative z-10 space-y-6 py-6'>
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
                placeholder='Enter first name'
                className='h-11 border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all duration-200 hover:bg-white dark:hover:bg-slate-800'
              />
            </div>
            <div className='space-y-2'>
              <label className='text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2'>
                <User className='h-4 w-4 text-emerald-500' />
                Last Name
              </label>
              <Input
                placeholder='Enter last name'
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
              Student ID
            </label>
            <Input
              placeholder='Enter student ID'
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
                name='course'
                onChange={(e) => setSelectedCourse(e.target.value)}
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
              {/* Success indicator */}
              {selectedCourse && (
                <div className='absolute inset-y-0 right-8 flex items-center px-2 pointer-events-none'>
                  <Check className='w-4 h-4 text-green-500' />
                </div>
              )}
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
                  name='section'
                  value={selectedSection}
                  onChange={(e) => setSelectedSection(e.target.value)}
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
                {/* Success indicator */}
                {selectedSection && (
                  <div className='absolute inset-y-0 right-8 flex items-center px-2 pointer-events-none'>
                    <Check className='w-4 h-4 text-green-500' />
                  </div>
                )}
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
                  name='year'
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
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
                {/* Success indicator */}
                {selectedYear && (
                  <div className='absolute inset-y-0 right-8 flex items-center px-2 pointer-events-none'>
                    <Check className='w-4 h-4 text-green-500' />
                  </div>
                )}
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
                  name='semester'
                  value={selectedSemester}
                  onChange={(e) => setSelectedSemester(e.target.value)}
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
                {/* Success indicator */}
                {selectedSemester && (
                  <div className='absolute inset-y-0 right-8 flex items-center px-2 pointer-events-none'>
                    <Check className='w-4 h-4 text-green-500' />
                  </div>
                )}
              </div>
            </div>

            {/* Enhanced Image Upload */}
            <div className='space-y-2'>
              <label className='text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2'>
                <Upload className='h-4 w-4 text-orange-500' />
                Profile Image
                <span className='text-slate-400 text-xs'>(Optional)</span>
              </label>

              <div className='space-y-2'>
                {/* File Input */}
                <div className='relative'>
                  {/* Hidden file input */}
                  <input
                    type='file'
                    id='image-upload'
                    name='image'
                    accept='image/*'
                    onChange={handleFileChange}
                    className='sr-only'
                  />

                  {/* Clickable label that triggers the file input */}
                  <label
                    htmlFor='image-upload'
                    className='block h-11 w-full border-2 border-dashed border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:border-purple-400 hover:bg-purple-50/50 dark:hover:bg-purple-900/20 transition-all duration-200 rounded-md cursor-pointer group'
                  >
                    <div className='flex items-center justify-center h-full'>
                      <div className='flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 group-hover:text-purple-600 dark:group-hover:text-purple-400'>
                        <Upload className='h-4 w-4' />
                        <span>
                          {selectedFile
                            ? selectedFile.name
                            : "Choose image or drag here"}
                        </span>
                      </div>
                    </div>
                  </label>
                </div>

                {/* File Info & Preview */}
                {selectedFile && (
                  <div className='flex items-center gap-3 p-2 bg-slate-50 dark:bg-slate-800/50 rounded-md border border-slate-200 dark:border-slate-700'>
                    {/* Image Preview */}
                    {imagePreview && (
                      <div className='flex-shrink-0'>
                        <img
                          src={imagePreview}
                          alt='Preview'
                          className='w-12 h-12 object-cover rounded-md border border-slate-200 dark:border-slate-600'
                        />
                      </div>
                    )}

                    {/* File Details */}
                    <div className='flex-1 min-w-0'>
                      <p className='text-sm font-medium text-slate-700 dark:text-slate-300 truncate'>
                        {selectedFile.name}
                      </p>
                      <p className='text-xs text-slate-500 dark:text-slate-400'>
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>

                    {/* Remove Button */}
                    <button
                      type='button'
                      onClick={removeFile}
                      className='flex-shrink-0 p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors'
                    >
                      <X className='h-4 w-4' />
                    </button>
                  </div>
                )}

                {/* Upload Guidelines */}
                <div className='text-[9px] text-slate-500 dark:text-slate-400 space-y-1'>
                  <p>• Supported formats: JPG, PNG, GIF, WebP</p>
                  <p>• Maximum file size: 5MB</p>
                  <p>• Recommended: Square images (1:1 ratio)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DialogFooter className='relative z-10 gap-3 pt-6 border-t border-slate-200/50 dark:border-slate-700/50'>
        <DialogClose asChild>
          <Button
            variant='outline'
            className='flex-1 sm:flex-none h-11 border-slate-300 dark:border-slate-600 bg-white/80 dark:bg-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium transition-all duration-200 backdrop-blur-sm'
          >
            Cancel
          </Button>
        </DialogClose>
        <Button className='group flex-1 sm:flex-none h-11 bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 hover:from-emerald-600 hover:via-emerald-700 hover:to-emerald-800 text-white font-bold shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 transform hover:-translate-y-0.5'>
          <div className='absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-md opacity-0 group-hover:opacity-20 transition-opacity duration-300'></div>
          <GraduationCap className='h-4 w-4 mr-2 group-hover:rotate-12 transition-transform duration-300' />
          <span className='relative z-10'>Add Student</span>
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
