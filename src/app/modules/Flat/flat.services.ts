import { Flat, Prisma, PrismaClient } from "@prisma/client";

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
const getFlatFromDB = async (params: any) => {
  const { searchTerm, ...filteredField } = params;

  const andCondition: Prisma.FlatWhereInput[] = [];
  const searchField = ["location", "utilitiesDescription", "description"];

  if (params.searchTerm) {
    andCondition.push({
      OR: searchField.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filteredField).length > 0) {
    andCondition.push({
      AND: Object.keys(filteredField).map((key) => ({
        [key]: {
          equals: filteredField[key],
        },
      })),
    });
  }
  const whereConditions: Prisma.FlatWhereInput = { AND: andCondition };

  const result = await prisma.flat.findMany({
    where: whereConditions,
  });
  return result;
};

export const flatServices = {
  addFlatIntoDB,
  getFlatFromDB,
};
