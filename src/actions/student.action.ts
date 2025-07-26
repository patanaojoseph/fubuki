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
// export async function storeStudent(
//   data: Omit<Prisma.StudentCreateInput, "userId">
// ) {
//   console.log("creating student");
//   console.log(data);
//   try {
//     const currentUserId = await getUserId();
//     if (!currentUserId) return;

//     const newStudent = await prisma.student.create({
//       data: {
//         ...data,
//         userId: currentUserId,
//       },
//     });

//     revalidatePath("/students");
//     return newStudent;
//   } catch (error) {
//     console.error("Error Storing Student data:", error);
//     throw error;
//   }
// }

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

// Update student function
export async function updateStudent(
  studentId: string,
  data: Prisma.StudentUpdateInput
) {
  console.log("updating student with ID:", studentId);
  console.log("update data:", data);

  try {
    const currentUserId = await getUserId();
    if (!currentUserId) {
      throw new Error("User not authenticated");
    }

    // First, verify the student belongs to the current user
    const existingStudent = await prisma.student.findFirst({
      where: {
        id: studentId,
        userId: currentUserId,
      },
    });

    if (!existingStudent) {
      throw new Error("Student not found or unauthorized");
    }

    // Update the student
    const updatedStudent = await prisma.student.update({
      where: {
        id: studentId,
      },
      data: {
        ...data,
        // Ensure userId remains the same (security measure)
        userId: currentUserId,
      },
    });

    revalidatePath("/students");
    return updatedStudent;
  } catch (error) {
    console.error("Error updating student data:", error);
    throw error;
  }
}

// Delete student function
export async function deleteStudent(studentId: string) {
  console.log("deleting student with ID:", studentId);

  try {
    const currentUserId = await getUserId();
    if (!currentUserId) {
      throw new Error("User not authenticated");
    }

    // First, verify the student belongs to the current user
    const existingStudent = await prisma.student.findFirst({
      where: {
        id: studentId,
        userId: currentUserId,
      },
    });

    if (!existingStudent) {
      throw new Error("Student not found or unauthorized");
    }

    // Delete the student
    const deletedStudent = await prisma.student.delete({
      where: {
        id: studentId,
      },
    });

    revalidatePath("/students");
    return deletedStudent;
  } catch (error) {
    console.error("Error deleting student:", error);
    throw error;
  }
}
