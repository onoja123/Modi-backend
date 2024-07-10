import express from "express";
import { 
    getProfile, 
    updateUserAbout,
    updateUserGoals,
    updateUserPreference,
    updateUserType
} from "../controllers/profile.controller";
import {protect} from "../controllers/auth.controller";

const ProfileRouter = express.Router()

ProfileRouter.use(protect)

ProfileRouter.get('/get-profile', getProfile)

ProfileRouter.put('/add-about', updateUserAbout)

ProfileRouter.put('/add-goals', updateUserGoals)

ProfileRouter.put('/add-preference', updateUserPreference)

ProfileRouter.put('/add-usertype', updateUserType)


export default ProfileRouter;