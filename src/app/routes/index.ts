import { Router } from "express";
import { flatRoutes } from "../modules/Flat/flat.routes";
import { userRoutes } from "../modules/User/user.routes";

const router = Router();

const moduleRoutes = [
  { path: "/", route: userRoutes },
  { path: "/flat", route: flatRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
