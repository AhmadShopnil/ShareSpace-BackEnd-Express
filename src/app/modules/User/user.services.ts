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

const createUserIntoDB = async (payload: CreateUserInput) => {
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
    await transaction.userProfile.create({
      data: {
        ...profileInfo,
        user: { connect: { id: createdUser.id } }, // Connect the profile to the created user
      },
    });

    return createdUser;
  });

  const { password, ...userWithoutPassword } = result;

  return userWithoutPassword;
};

const getUserProfileFromDB = async (userId: any) => {
  console.log(userId);

  const userProfile = await prisma.userProfile.findUnique({
    where: {
      userId: userId,
    },
  });
  return userProfile;
};

const updateProfileIntoDB = async (
  userId: any,
  updatedProfileData: Partial<UserProfile>
) => {
  const updatedProfile = await prisma.userProfile.update({
    where: {
      userId: userId,
    },
    data: updatedProfileData,
  });
  return updatedProfile;
};

export const userServices = {
  createUserIntoDB,
  getUserProfileFromDB,
  updateProfileIntoDB,
};
