import { Flat, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const addFlatIntoDB = async (payload: Flat) => {
  //   console.log(payload);

  try {
    const result = await prisma.flat.create({
      data: { ...payload },
    });

    return result;
  } catch (error) {
    console.log(error);
  }
};
const getFlatFromDB = async () => {
  const result = await prisma.flat.findMany();
  return result;
};

export const flatServices = {
  addFlatIntoDB,
  getFlatFromDB,
};
