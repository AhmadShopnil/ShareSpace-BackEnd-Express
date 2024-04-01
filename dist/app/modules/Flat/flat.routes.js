"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.flatRoutes = void 0;
const express_1 = __importDefault(require("express"));
const flat_controller_1 = require("./flat.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const router = express_1.default.Router();
// router.get("/", userController.createUser);
router.post("/", (0, auth_1.default)(), flat_controller_1.flatController.addFlat);
router.get("/", flat_controller_1.flatController.getFlat);
router.put("/:flatId", (0, auth_1.default)(), flat_controller_1.flatController.updateFlat);
exports.flatRoutes = router;
