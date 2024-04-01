"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.flatServices = void 0;
const client_1 = require("@prisma/client");
const paginationHelper_1 = require("../../helpers/paginationHelper");
const prisma = new client_1.PrismaClient();
const addFlatIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.flat.create({
        data: Object.assign({}, payload),
    });
    return result;
});
const getFlatFromDB = (params, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = params, filteredField = __rest(params, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelper.calculatePagination(options);
    // console.log(sortOrder);
    const andCondition = [];
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
                    mode: "insensitive",
                },
            })),
        });
    }
    const whereConditions = { AND: andCondition };
    const result = yield prisma.flat.findMany({
        where: whereConditions,
        // where: {
        //   availability: false,
        // },
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? {
                [options.sortBy]: options.sortOrder,
            }
            : {
                createdAt: "desc",
            },
    });
    const total = yield prisma.flat.count({
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
});
const updateFlatIntoDB = (flatId, updatedFlatData) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedFlat = yield prisma.flat.update({
        where: {
            id: flatId,
        },
        data: updatedFlatData,
    });
    return updatedFlat;
});
exports.flatServices = {
    addFlatIntoDB,
    getFlatFromDB,
    updateFlatIntoDB,
};
