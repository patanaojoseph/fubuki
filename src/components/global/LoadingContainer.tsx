import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { Users, Filter, GraduationCap, User, Search } from "lucide-react";
import Container from "../global/Container";

const LoadingContainer = () => {
  return (
    <Container>
      <div className='w-full space-y-2'>
        {/* Header Section Skeleton */}
        <div className='space-y-6'>
          <div className='flex items-center gap-4 mt-6'>
            <Skeleton className='w-12 h-12 rounded-xl' />
            <div className='space-y-2'>
              <Skeleton className='h-8 w-64' />
              <Skeleton className='h-5 w-48' />
            </div>
          </div>

          {/* Statistics Cards Skeleton */}
          <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
            <Card className='border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20'>
              <CardContent className='p-4'>
                <div className='flex items-center gap-3'>
                  <div className='w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center'>
                    <Users className='h-5 w-5 text-blue-400' />
                  </div>
                  <div className='space-y-2'>
                    <Skeleton className='h-3 w-20 bg-blue-200/50' />
                    <Skeleton className='h-6 w-8 bg-blue-200/50' />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className='border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20'>
              <CardContent className='p-4'>
                <div className='flex items-center gap-3'>
                  <div className='w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center'>
                    <Filter className='h-5 w-5 text-emerald-400' />
                  </div>
                  <div className='space-y-2'>
                    <Skeleton className='h-3 w-24 bg-emerald-200/50' />
                    <Skeleton className='h-6 w-8 bg-emerald-200/50' />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className='border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20'>
              <CardContent className='p-4'>
                <div className='flex items-center gap-3'>
                  <div className='w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center'>
                    <GraduationCap className='h-5 w-5 text-purple-400' />
                  </div>
                  <div className='space-y-2'>
                    <Skeleton className='h-3 w-16 bg-purple-200/50' />
                    <Skeleton className='h-6 w-6 bg-purple-200/50' />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className='border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20'>
              <CardContent className='p-4'>
                <div className='flex items-center gap-3'>
                  <div className='w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center'>
                    <User className='h-5 w-5 text-orange-400' />
                  </div>
                  <div className='space-y-2'>
                    <Skeleton className='h-3 w-12 bg-orange-200/50' />
                    <Skeleton className='h-6 w-8 bg-orange-200/50' />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Search and Filter Section Skeleton */}
        <Card className='border-0 shadow-xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900'>
          <CardContent className='p-6'>
            <div className='flex flex-col md:flex-row items-center gap-4'>
              <div className='relative flex-1 max-w-md'>
                <div className='relative'>
                  <Skeleton className='h-12 w-full rounded-md' />
                  <Search className='absolute h-5 w-5 left-4 top-1/2 transform -translate-y-1/2 text-slate-300 dark:text-slate-600' />
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <Filter className='h-4 w-4 text-slate-300 dark:text-slate-600' />
                <Skeleton className='h-10 w-32 rounded-md' />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Table Section Skeleton */}
        <Card className='border-0 shadow-xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 overflow-hidden'>
          <CardHeader className='bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 border-b border-slate-200 dark:border-slate-700'>
            <CardTitle className='text-slate-800 dark:text-slate-200 flex items-center gap-2'>
              <Users className='h-5 w-5 text-slate-400' />
              <Skeleton className='h-5 w-32' />
            </CardTitle>
          </CardHeader>
          <CardContent className='p-0'>
            <div className='overflow-x-auto'>
              {/* Table Header Skeleton */}
              <div className='border-b border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50'>
                <div className='grid grid-cols-3 gap-4 px-6 py-4'>
                  <Skeleton className='h-4 w-20' />
                  <Skeleton className='h-4 w-24' />
                  {/* <Skeleton className='h-4 w-28' />
                  <Skeleton className='h-4 w-16' />
                  <Skeleton className='h-4 w-20' /> */}
                  <div className='flex justify-end'>
                    <Skeleton className='h-4 w-16' />
                  </div>
                </div>
              </div>

              {/* Table Rows Skeleton */}
              <div className='divide-y divide-slate-100 dark:divide-slate-800'>
                {Array.from({ length: 3 }).map((_, index) => (
                  <LoadingTableRow key={index} />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
};

function LoadingTableRow() {
  return (
    <div className='grid grid-cols-6 gap-4 px-6 py-4 hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-purple-50/30 dark:hover:from-blue-900/5 dark:hover:to-purple-900/5'>
      {/* Student Number Column */}
      <div className='flex items-center gap-2'>
        <Skeleton className='w-8 h-8 rounded-lg' />
        <Skeleton className='h-4 w-24' />
      </div>

      {/* Full Name Column */}
      <div className='flex items-center gap-3'>
        <Skeleton className='w-10 h-10 rounded-full' />
        <div className='space-y-2'>
          <Skeleton className='h-4 w-32' />
          <Skeleton className='h-3 w-24' />
        </div>
      </div>

      {/* Year/Section Column */}
      <div className='flex items-center gap-2'>
        <Skeleton className='h-6 w-12 rounded-full' />
        <span className='text-slate-300 dark:text-slate-600'>-</span>
        <Skeleton className='h-6 w-8 rounded-full' />
      </div>

      {/* Course Column */}
      <div className='flex items-center'>
        <Skeleton className='h-6 w-32 rounded-full' />
      </div>

      {/* Semester Column */}
      <div className='flex items-center'>
        <Skeleton className='h-4 w-28' />
      </div>

      {/* Actions Column */}
      <div className='flex justify-end items-center gap-2'>
        <Skeleton className='h-8 w-8 rounded' />
        <Skeleton className='h-8 w-8 rounded' />
      </div>
    </div>
  );
}

export default LoadingContainer;
