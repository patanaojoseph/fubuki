// app/students/[slug]/loading.tsx
import React from "react";
import { ArrowLeft } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className='container mx-auto px-4 py-6'>
      {/* Navigation breadcrumb skeleton */}
      <div className='mb-6'>
        <div className='inline-flex items-center gap-2'>
          <ArrowLeft className='h-4 w-4 text-muted-foreground' />
          <Skeleton className='h-4 w-24' />
        </div>
      </div>

      {/* Student card skeleton */}
      <div className='max-w-4xl mx-auto'>
        <div className='bg-card border border-border rounded-lg shadow-sm p-6'>
          {/* Header section */}
          <div className='flex flex-col md:flex-row gap-6 mb-6'>
            {/* Profile image skeleton */}
            <div className='flex-shrink-0'>
              <Skeleton className='w-32 h-32 rounded-full' />
            </div>

            {/* Basic info skeleton */}
            <div className='flex-1 space-y-3'>
              <Skeleton className='h-8 w-48' /> {/* Name */}
              <Skeleton className='h-5 w-32' /> {/* Student number */}
              <Skeleton className='h-5 w-40' /> {/* Course */}
              <Skeleton className='h-5 w-36' /> {/* Email */}
            </div>
          </div>

          {/* Details sections skeleton */}
          <div className='grid md:grid-cols-2 gap-6'>
            {/* Personal Information */}
            <div className='space-y-4'>
              <Skeleton className='h-6 w-40' /> {/* Section title */}
              <div className='space-y-3'>
                <div className='flex justify-between'>
                  <Skeleton className='h-4 w-20' />
                  <Skeleton className='h-4 w-24' />
                </div>
                <div className='flex justify-between'>
                  <Skeleton className='h-4 w-16' />
                  <Skeleton className='h-4 w-28' />
                </div>
                <div className='flex justify-between'>
                  <Skeleton className='h-4 w-24' />
                  <Skeleton className='h-4 w-32' />
                </div>
              </div>
            </div>

            {/* Academic Information */}
            <div className='space-y-4'>
              <Skeleton className='h-6 w-36' /> {/* Section title */}
              <div className='space-y-3'>
                <div className='flex justify-between'>
                  <Skeleton className='h-4 w-18' />
                  <Skeleton className='h-4 w-20' />
                </div>
                <div className='flex justify-between'>
                  <Skeleton className='h-4 w-22' />
                  <Skeleton className='h-4 w-16' />
                </div>
                <div className='flex justify-between'>
                  <Skeleton className='h-4 w-20' />
                  <Skeleton className='h-4 w-24' />
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons skeleton */}
          <div className='mt-6 pt-6 border-t border-border'>
            <div className='flex gap-3'>
              <Skeleton className='h-10 w-24' />
              <Skeleton className='h-10 w-20' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
