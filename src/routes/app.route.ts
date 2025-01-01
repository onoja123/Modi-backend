import express from "express";
import { Routes } from "../types/interfaces/app.inter";
import AuthRouter from '../routes/auth.route'
import ProfileRouter from "./profile.route";
import waitlistRouter from "./waitlist.route";
// import moodboardRouter from "./moodboard.route";

const AppRouter = express.Router();

const appRoutes: Routes = [
    {
        path: "/auth",
        router: AuthRouter,
    },
    {
        path: "/profile",
        router: ProfileRouter,
    },
    {
        path: "/waitlist",
        router: waitlistRouter,
    },
    // {
    //     path: "/moodboard",
    //     router: moodboardRouter,
    // },
];

appRoutes.forEach((route) => {
    AppRouter.use(route.path, route.router);
});

export default AppRouter;
