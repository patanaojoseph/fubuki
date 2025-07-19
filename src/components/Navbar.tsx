import Link from "next/link";
import { PiStudentFill } from "react-icons/pi";
import { Button } from "./ui/button";
import { ModeToggle } from "./ModeToggle";
import { DiAndroid } from "react-icons/di";
import { stackServerApp } from "@/stack";
import { getUserDetails } from "@/actions/user.action";
import { FiLogIn, FiMenu, FiX } from "react-icons/fi";
import { UserButton } from "@stackframe/stack";
import { useState, useEffect } from "react";

const Navbar = async () => {
  const user = await stackServerApp.getUser();
  const app = stackServerApp.urls;
  const userProfile = await getUserDetails(user?.id);

  return (
    <>
      {/* Modern Navbar with Glassmorphism Effect */}
      <nav className='fixed top-0 w-full border-b border-white/10 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 z-50 transition-all duration-500 shadow-lg shadow-black/5'>
        {/* Subtle gradient overlay for depth */}
        <div className='absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 pointer-events-none' />

        <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-16 md:h-18'>
            {/* Enhanced Logo Section with Animation */}
            <div className='flex items-center group'>
              <Link
                href='/'
                className='flex items-center text-xl md:text-2xl font-bold text-primary font-mono tracking-wider hover:text-primary/80 transition-all duration-300 transform hover:scale-105'
              >
                <div className='relative'>
                  <DiAndroid className='h-8 w-8 md:h-10 md:w-10 group-hover:rotate-12 transition-all duration-500 drop-shadow-lg' />
                  {/* Subtle glow effect */}
                  <div className='absolute inset-0 h-8 w-8 md:h-10 md:w-10 bg-primary/20 rounded-full blur-md group-hover:bg-primary/30 transition-all duration-500 -z-10' />
                </div>
                <span className='ml-3 hidden sm:inline bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent font-extrabold tracking-wide'>
                  System
                </span>
              </Link>
            </div>

            {/* Enhanced Desktop Navigation */}
            <div className='hidden md:flex items-center space-x-2 lg:space-x-4'>
              {/* Students Button with Modern Styling */}
              <Button
                variant='ghost'
                className='group relative flex items-center gap-2 hover:bg-primary/10 hover:text-primary transition-all duration-300 px-4 lg:px-6 py-2 rounded-xl border border-transparent hover:border-primary/20 hover:shadow-lg hover:shadow-primary/10'
                asChild
              >
                <Link href='/students'>
                  <PiStudentFill className='w-4 h-4 group-hover:scale-110 transition-transform duration-300' />
                  <span className='hidden lg:inline font-semibold'>
                    Students
                  </span>
                  {/* Hover accent line */}
                  {/* <div className='absolute bottom-0 left-1/2 w-0 h-0.5 bg-primary group-hover:w-3/4 group-hover:left-1/8 transition-all duration-300' /> */}
                </Link>
              </Button>

              {/* Mode Toggle with Enhanced Styling */}
              <div className='px-2'>
                <div className='p-1 rounded-xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-md'>
                  <ModeToggle />
                </div>
              </div>

              {/* User Section */}
              {user ? (
                <div className='ml-4 flex items-center gap-3 p-2 rounded-xl bg-background/50 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg'>
                  <div className='hidden lg:flex flex-col items-end text-sm'>
                    <span className='font-bold text-foreground bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text'>
                      {userProfile?.name || user.displayName || "User"}
                    </span>
                    <span className='text-xs italic text-muted-foreground font-medium'>
                      {userProfile?.role || "Member"}
                    </span>
                  </div>
                  <div className='relative'>
                    <UserButton />
                    {/* Status indicator */}
                    <div className='absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background animate-pulse' />
                  </div>
                </div>
              ) : (
                <Button
                  variant='default'
                  className='group relative flex items-center gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground transition-all duration-300 ml-4 px-6 lg:px-8 py-2 rounded-xl shadow-lg hover:shadow-xl hover:shadow-primary/25 transform hover:scale-105'
                  asChild
                >
                  <Link href={app.signIn}>
                    <FiLogIn className='w-4 h-4 group-hover:translate-x-1 transition-transform duration-300' />
                    <span className='hidden lg:inline font-bold'>Sign In</span>
                    {/* Shimmer effect */}
                    <div className='absolute inset-0 -top-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse rounded-xl' />
                  </Link>
                </Button>
              )}
            </div>

            {/* Enhanced Mobile Menu */}
            <div className='md:hidden flex items-center gap-3'>
              <div className='p-1 rounded-lg border border-border/50'>
                <ModeToggle />
              </div>
              {user ? (
                <div className='flex items-center gap-2 p-2 rounded-lg bg-background/50 border border-border/50'>
                  <UserButton />
                  <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse' />
                </div>
              ) : (
                <Button
                  variant='default'
                  size='sm'
                  className='flex items-center gap-2 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:shadow-lg transition-all duration-300 rounded-lg px-4'
                  asChild
                >
                  <Link href={app.signIn}>
                    <FiLogIn className='w-4 h-4' />
                    <span className='text-sm font-semibold'>Login</span>
                  </Link>
                </Button>
              )}
            </div>
          </div>

          {/* Enhanced Mobile Navigation Menu */}
          <div className='md:hidden border-t border-white/10 backdrop-blur-sm'>
            <div className='py-4 px-2'>
              <div className='flex items-center justify-center'>
                <Button
                  variant='ghost'
                  size='sm'
                  className='group flex items-center gap-3 hover:bg-primary/10 hover:text-primary transition-all duration-300 px-6 py-3 rounded-xl border border-transparent hover:border-primary/20 w-full max-w-xs'
                  asChild
                >
                  <Link href='/students'>
                    <PiStudentFill className='w-5 h-5 group-hover:scale-110 transition-transform duration-300' />
                    <span className='text-sm font-semibold'>Students</span>
                    <div className='flex-1' />
                    <div className='w-2 h-2 bg-primary/50 rounded-full group-hover:bg-primary transition-colors duration-300' />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom border with gradient */}
        <div className='absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent' />
      </nav>

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className='h-16 md:h-18' />
    </>
  );
};

export default Navbar;
