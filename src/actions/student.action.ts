"use server";

import { prisma } from "@/lib/prisma";
import { getUserId } from "./user.action";
import { revalidatePath } from "next/cache";
import { Prisma } from "@/generated/prisma";

export async function getStudents(searchTerm?: string) {
  try {
    const currentUserId = await getUserId();
    console.log("CURRENT USER ID:", currentUserId);

    const userStudents = await prisma.student.findMany({
      where: {
        ...(searchTerm && {
          OR: [
            { firstName: { contains: searchTerm, mode: "insensitive" } },
            { lastName: { contains: searchTerm, mode: "insensitive" } },
            { student_number: { contains: searchTerm, mode: "insensitive" } },
          ],
        }),
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    console.log("STUDENT COUNT:", userStudents.length);
    revalidatePath("/");
    return { success: true, userStudents };
  } catch (error) {
    console.log("Error in getStudents", error);
    throw new Error("Failed to fetch Students");
  }
}

export async function getStudentById(id: string) {
  try {
    if (!id || typeof id !== "string") {
      return null;
    }

    return await prisma.student.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error("Error fetching student by ID:", error);
    return null;
  }
}
// type StudentFormInput = Omit<Prisma.StudentCreateInput, "userId">;
// Store Student Method
export async function storeStudent(data: Prisma.StudentCreateInput) {
  console.log("creating student");
  console.log(data);
  try {
    const currentUserId = await getUserId();
    if (!currentUserId) return;
    const newStudent = await prisma.student.create({
      data: {
        ...data,
        userId: currentUserId,
      },
    });
    revalidatePath("/students");
    return newStudent;
  } catch (error) {
    console.error("Error Storing Student data:", error);
    throw error;
  }
}

// Edit Student Method
export async function editStudent(id: string, data: Prisma.StudentUpdateInput) {
  try {
    const currentUserId = await getUserId();
    const updatedStudent = await prisma.student.update({
      where: { id },
      data: {
        ...data,
        userId: currentUserId,
      },
    });
    revalidatePath("/students");
  } catch (error) {
    console.error("Error Updating Student data:", error);
    throw error;
  }
}
