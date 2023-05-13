const express = require('express')
const router = express.Router();

const {
    newOrder,
    getSingleOrder,
    myOrders,
    allOrders,
    updateOrder,
    deleteOrder

} = require('../controllers/orderController')

const { isAuthenticatedUser, authorrizeRole } = require('../middlewares/auth')

router.route('/order/new').post(isAuthenticatedUser, newOrder);

router.route('/order/:id').get(isAuthenticatedUser, getSingleOrder);
router.route('/orders/me').get(isAuthenticatedUser, myOrders);

//admin role
router.route('/admin/orders/').get(isAuthenticatedUser, authorrizeRole('admin'), allOrders);
router.route('/admin/order/:id')
    .put(isAuthenticatedUser, authorrizeRole('admin'), updateOrder)
    .delete(isAuthenticatedUser, authorrizeRole('admin'), deleteOrder);

module.exports = router;