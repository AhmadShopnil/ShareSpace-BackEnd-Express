import { Router } from "express";
import { flatRoutes } from "../modules/Flat/flat.routes";
import { userRoutes } from "../modules/User/user.routes";
import { bookingRoutes } from "../modules/Booking/booking.routes";

const router = Router();

const moduleRoutes = [
  { path: "/flats", route: flatRoutes },
  // { path: "/booking", route: bookingRoutes },
  { path: "/booking-applications", route: bookingRoutes },
  { path: "/booking-requests", route: bookingRoutes },
  { path: "/", route: userRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
