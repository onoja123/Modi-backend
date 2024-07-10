import express from "express";
import {
    addUsersToWaitlist
} from '../controllers/waitlist.controller'
import { updateUserAbout } from "../controllers/profile.controller";
import { protect } from "../controllers/auth.controller";


const waitlistRouter = express.Router()

waitlistRouter.post('/adduser', addUsersToWaitlist)

waitlistRouter.use(protect)

waitlistRouter.put('/add-about', updateUserAbout)

export default waitlistRouter;