"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const courses = [
  {
    value: "",
    label: "None",
  },
  {
    value: "BACHELOR_OF_SCIENCE_IN_COMPUTER_SCIENCE",
    label: "Computer Science",
  },
  {
    value: "BACHELOR_OF_SCIENCE_IN_INFORMATION_TECHNOLOGY",
    label: "Information Technology",
  },
  {
    value: "BACHELOR_OF_SCIENCE_IN_INFORMATION_SYSTEM",
    label: "Information System",
  },
  {
    value: "BACHELOR_OF_SCIENCE_IN_MULTIMEDIA_COMPUTING",
    label: "Multimedia Computing",
  },
];

interface ComboBoxProps {
  value: string;
  onChange: (value: string) => void;
}

export function ComboBox({ value, onChange }: ComboBoxProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-[200px] justify-between'
        >
          {value
            ? courses.find((course) => course.value === value)?.label
            : "Select course..."}
          <ChevronsUpDown className='opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandInput placeholder='Search Course...' className='h-9' />
          <CommandList>
            <CommandEmpty>No course found.</CommandEmpty>
            <CommandGroup>
              {courses.map((course) => (
                <CommandItem
                  key={course.value}
                  value={course.value}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {course.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === course.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
