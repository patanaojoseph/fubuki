import {
  Star,
  ArrowRight,
  Sparkles,
  Users,
  BookOpen,
  TrendingUp,
} from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HeroProps {
  heading?: string;
  description?: string;
  button?: {
    text: string;
    url: string;
  };
}

const Hero = ({
  heading = "A Collection of Components Built With Shadcn & Tailwind",
  description = "Finely crafted components built with React, Tailwind and Shadcn UI. Developers can copy and paste these blocks directly into their project.",
  button = {
    text: "Discover",
    url: "https://www.shadcnblocks.com",
  },
}: HeroProps) => {
  return (
    <section className='relative min-screen flex items-center justify-center overflow-hidden'>
      {/* Animated Background with Gradient Mesh */}
      <div className='absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background'>
        <div className='absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 animate-pulse' />
        <div
          className='absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl animate-bounce'
          style={{ animationDuration: "6s" }}
        />
        <div
          className='absolute top-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full mix-blend-multiply filter blur-3xl animate-bounce'
          style={{ animationDuration: "8s", animationDelay: "1s" }}
        />
        <div
          className='absolute bottom-0 left-1/3 w-96 h-96 bg-accent/10 rounded-full mix-blend-multiply filter blur-3xl animate-bounce'
          style={{ animationDuration: "10s", animationDelay: "2s" }}
        />
      </div>

      {/* Floating Particles Effect */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className='absolute w-2 h-2 bg-primary/20 rounded-full animate-ping'
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className='relative container px-4 sm:px-6 lg:px-8'>
        <div className='text-center'>
          {/* Main Heading with Advanced Typography */}
          <div className='mx-auto flex max-w-6xl flex-col gap-8'>
            <h1 className='text-4xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black leading-tight tracking-tight'>
              <span className='block'>
                <span className='bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent animate-gradient-x'>
                  {heading.split(" ").slice(0, 3).join(" ")}
                </span>
              </span>
              <span className='block'>
                <span className='bg-gradient-to-r from-secondary via-primary to-foreground bg-clip-text text-transparent animate-gradient-x'>
                  {heading.split(" ").slice(3).join(" ")}
                </span>
              </span>
              {/* Decorative underline */}
              <div className='mt-4 mx-auto w-32 h-1 bg-gradient-to-r from-primary to-secondary rounded-full animate-pulse' />
            </h1>

            {/* Enhanced Description */}
            <p className='text-muted-foreground/90 text-balance text-md sm:text-sm lg:text-1xl font-medium leading-relaxed max-w-4xl mx-auto'>
              {description}
            </p>
          </div>

          {/* Stats Row */}
          <div className='mt-6 mb-6 flex flex-wrap justify-center gap-6 sm:gap-8'>
            {[
              { icon: Users, label: "Active Users", value: "50K+" },
              { icon: BookOpen, label: "Components", value: "100+" },
              { icon: TrendingUp, label: "Growth", value: "200%" },
            ].map((stat, index) => (
              <div
                key={index}
                className='group flex flex-col items-center p-4 rounded-xl bg-background/50 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:scale-105'
              >
                <stat.icon className='w-6 h-6 text-primary mb-1 group-hover:scale-110 transition-transform duration-300' />
                <span className='text-2xl font-bold text-foreground'>
                  {stat.value}
                </span>
                <span className='text-sm text-muted-foreground font-medium'>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* Enhanced CTA Section */}
          <div className='flex flex-col sm:flex-row gap-4 justify-center items-center mt-16'>
            <Button
              asChild
              size='lg'
              className='group relative px-8 py-4 text-lg font-bold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground rounded-xl shadow-2xl hover:shadow-3xl hover:shadow-primary/30 transition-all duration-300 transform hover:scale-105 border-0'
            >
              <a href={button.url} className='flex items-center gap-2'>
                <span>{button.text}</span>
                <ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform duration-300' />
                {/* Shimmer effect */}
                <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 rounded-xl animate-shimmer' />
              </a>
            </Button>

            <Button
              variant='outline'
              size='lg'
              className='group px-8 py-4 text-lg font-semibold border-2 border-primary/30 hover:border-primary hover:bg-primary/10 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/20'
              asChild
            >
              <a href='#learn-more' className='flex items-center gap-2'>
                <BookOpen className='w-5 h-5 group-hover:rotate-12 transition-transform duration-300' />
                <span>Learn More</span>
              </a>
            </Button>
          </div>

          {/* Social Proof Section */}
          <div className='mt-16 flex flex-col items-center gap-6'>
            <p className='text-sm text-muted-foreground font-medium'>
              Trusted by developers worldwide
            </p>

            <div className='flex items-center gap-2'>
              <div className='flex -space-x-2'>
                {[...Array(5)].map((_, i) => (
                  <Avatar
                    key={i}
                    className='w-8 h-8 border-2 border-background hover:scale-110 transition-transform duration-300'
                  >
                    <AvatarImage
                      src={`https://avatar.vercel.sh/user${i + 1}`}
                    />
                  </Avatar>
                ))}
              </div>
              <div className='flex items-center gap-1 ml-4'>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className='w-4 h-4 fill-yellow-400 text-yellow-400'
                  />
                ))}
                <span className='ml-2 text-sm font-semibold text-foreground'>
                  5.0
                </span>
                <span className='text-sm text-muted-foreground'>
                  (2.5k reviews)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Fade Effect */}
      <div className='absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none' />
    </section>
  );
};

export default Hero;
