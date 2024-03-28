import { PrismaClient, User, UserProfile } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

interface CreateUserInput {
  name: string;
  email: string;
  password: string;
  bio: string;
  profession: string;
  address: string;
}

const createUserIntoDB = async (
  payload: CreateUserInput
): Promise<User | null> => {
  try {
    const hashedPassword = await bcrypt.hash(payload.password, 12);
    const userInfo = {
      name: payload.name,
      password: hashedPassword,
      email: payload.email,
    };
    const profileInfo = {
      bio: payload.bio,
      profession: payload.profession,
      address: payload.address,
    };

    const result = await prisma.$transaction(async (transaction) => {
      // Create user
      const createdUser = await transaction.user.create({
        data: userInfo,
      });

      // Create user profile associated with the created user
      const createdProfile = await transaction.userProfile.create({
        data: {
          ...profileInfo,
          user: { connect: { id: createdUser.id } }, // Connect the profile to the created user
        },
      });

      return createdUser;
    });

    return result;
  } catch (error) {
    // Handle error
    console.error("Error creating user and profile:", error);
    // Rollback logic if needed
    // For Prisma, you don't need explicit rollback as Prisma handles transactions automatically
    return null;
  } finally {
    await prisma.$disconnect(); // Disconnect Prisma Client
  }
};

export const userServices = {
  createUserIntoDB,
};
