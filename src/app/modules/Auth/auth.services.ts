import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

import { Secret } from "jsonwebtoken";
import { jwtHelpers } from "../../helpers/jwtHelpers";
import config from "../../config";
const prisma = new PrismaClient();

const loginUser = async (payload: { email: string; password: string }) => {
  // check if user exist
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
    },
  });

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.password,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new Error("Password incorrect!");
  }
  const accessToken = jwtHelpers.generateJwtToken(
    {
      email: userData.email,
      userId: userData.id,
    },
    config.jwt_secret as Secret,
    config.jwt_access_expires_in as string
  );

  return {
    id: userData?.id,
    name: userData?.name,
    email: userData?.email,
    token: accessToken,
  };
};

export const authServices = {
  loginUser,
};
