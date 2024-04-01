"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const flat_routes_1 = require("../modules/Flat/flat.routes");
const user_routes_1 = require("../modules/User/user.routes");
const booking_routes_1 = require("../modules/Booking/booking.routes");
const auth_routes_1 = require("../modules/Auth/auth.routes");
const router = (0, express_1.Router)();
const moduleRoutes = [
    { path: "/flats", route: flat_routes_1.flatRoutes },
    // { path: "/booking", route: bookingRoutes },
    { path: "/booking-applications", route: booking_routes_1.bookingRoutes },
    { path: "/booking-requests", route: booking_routes_1.bookingRoutes },
    { path: "/login", route: auth_routes_1.authRoutes },
    { path: "/", route: user_routes_1.userRoutes },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
