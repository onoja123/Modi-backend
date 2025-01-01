import express from 'express';
import { 
    signUp,
    verify,
    login,
    resendVerification,
    forgotPassword,
    resetPassword,
    logOut,
    updatePassword,
    getGoogleAuthUrl,
    googleLoginCallback

} from '../controllers/auth.controller';
import { protect } from '../controllers/auth.controller';

const router = express.Router();

router.post('/signup', signUp)

router.post('/verify', verify)

router.post('/login', login)

router.post('/resendverification', resendVerification)

router.post('/forgotpassword', forgotPassword)

router.post('/resetpassword', resetPassword)

router.post('/logout', logOut)

router.get('/google/login', getGoogleAuthUrl);
router.get('/google/callback', googleLoginCallback);


router.use(protect)
router.post('/updatepassword', updatePassword)

export default router;