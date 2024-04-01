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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.flatController = void 0;
const flat_services_1 = require("./flat.services");
const pick_1 = __importDefault(require("../../shared/pick"));
const addFlat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield flat_services_1.flatServices.addFlatIntoDB(req.body);
        res.send({
            success: true,
            statusCode: 201,
            message: "Flat added successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Faild to add flat",
            error: error,
        });
    }
});
const getFlat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //   console.log(req.query);
    const filters = (0, pick_1.default)(req.query, [
        "location",
        "utilitiesDescription",
        "description",
        "availability",
    ]);
    const options = (0, pick_1.default)(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    try {
        const result = yield flat_services_1.flatServices.getFlatFromDB(filters, options);
        res.send({
            status: "success",
            message: "Flats retrieved successfully",
            result,
        });
    }
    catch (error) { }
});
const updateFlat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { flatId } = req.params;
    const updatedFlatData = req.body;
    // console.log(flatId);
    try {
        const updatedFlat = yield flat_services_1.flatServices.updateFlatIntoDB(flatId, updatedFlatData);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Flat information updated successfully",
            data: updatedFlat,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.flatController = {
    addFlat,
    getFlat,
    updateFlat,
};
