import { Flat, Prisma, PrismaClient } from "@prisma/client";
import { paginationHelper } from "../../helpers/paginationHelper";

const prisma = new PrismaClient();

const addFlatIntoDB = async (payload: Flat) => {
  const result = await prisma.flat.create({
    data: { ...payload },
  });

  return result;
};
const getFlatFromDB = async (params: any, options: any) => {
  const { searchTerm, ...filteredField } = params;

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(options);

  // console.log(sortOrder);
  const andCondition: Prisma.FlatWhereInput[] = [];
  const searchField = [
    "location",
    "utilitiesDescription",
    "description",
    "availability",
  ];

  // convert availability string to boolean for help in query
  if (filteredField.availability) {
    filteredField.availability = filteredField.availability === "true";
  }

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
          // mode: "insensitive",
        },
      })),
    });
  }
  const whereConditions: Prisma.FlatWhereInput = { AND: andCondition };

  const result = await prisma.flat.findMany({
    where: whereConditions,
    // where: {
    //   availability: false,
    // },
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "desc",
          },
  });
  const total = await prisma.flat.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const updateFlatIntoDB = async (
  flatId: any,
  updatedFlatData: Partial<Flat>
) => {
  const updatedFlat = await prisma.flat.update({
    where: {
      id: flatId,
    },
    data: updatedFlatData,
  });
  return updatedFlat;
};

export const flatServices = {
  addFlatIntoDB,
  getFlatFromDB,
  updateFlatIntoDB,
};
