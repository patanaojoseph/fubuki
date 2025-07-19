"use server";

import { prisma } from "@/lib/prisma";
import { getUserId } from "./user.action";
import { revalidatePath } from "next/cache";

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

// export async function getStudentById(id: string) {
//   return await prisma.student.findUnique({
//     where: { id },
//   });
// }
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
