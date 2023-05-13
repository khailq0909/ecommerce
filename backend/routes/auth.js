const express = require('express');
const router = express.Router();

const { registerNewUser,loginUser,logoutUser,forgotPassword,resetPassword,getUserProfile,updatePassword,updateProfile,getAllUser,getUserDetail,deleteUser } = require('../controllers/authController');
const{isAuthenticatedUser, authorrizeRole} = require('../middlewares/auth')
router.route('/register').post(registerNewUser);
router.route('/login').post(loginUser);
router.route('/logout').get(isAuthenticatedUser,logoutUser);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/me').get(isAuthenticatedUser,getUserProfile);
router.route('/password/update').put(isAuthenticatedUser,updatePassword);
router.route('/me/update').put(isAuthenticatedUser,updateProfile);

//admin route
router.route('/admin/users').get(isAuthenticatedUser,authorrizeRole('admin'),getAllUser);
router.route('/admin/user/:id').get(isAuthenticatedUser,authorrizeRole('admin'),getUserDetail)
                                .delete(isAuthenticatedUser,authorrizeRole('admin'),deleteUser)

module.exports = router;    