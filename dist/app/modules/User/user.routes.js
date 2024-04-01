"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const router = express_1.default.Router();
// router.get("/", userController.createUser);
router.get("/profile", (0, auth_1.default)(), user_controller_1.userController.getSingleUserProfileByID);
router.put("/profile", (0, auth_1.default)(), user_controller_1.userController.updateUserProfile);
router.post("/register", user_controller_1.userController.createUser);
exports.userRoutes = router;
