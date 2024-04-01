import { PrismaClient, UserProfile } from "@prisma/client";
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

const createUserIntoDB = async (payload: any) => {
  const hashedPassword = await bcrypt.hash(payload.password, 12);
  const userInfo = {
    name: payload.name,
    password: hashedPassword,
    email: payload.email,
  };
  const profileInfo: any = {
    bio: payload.bio,
    profession: payload.profession,
    address: payload.address,
  };

  // create user using transaction and rollback
  const result = await prisma.$transaction(async (userProfileTransaction) => {
    await userProfileTransaction.user.create({
      data: userInfo,
    });

    // then create user profile using transaction and rollback
    const createdProfile = await userProfileTransaction.userProfile.create({
      data: profileInfo,
    });

    return createdProfile;
  });

  return result;
};

export const userServices = {
  createUserIntoDB,
};
