const express = require('express');
const router = express.Router();

const { getProducts, newProduct, getProductDetail,editProduct,deleteProduct } = require('../controllers/productController');

const{isAuthenticatedUser, authorrizeRole} = require('../middlewares/auth')
router.route('/products').get(isAuthenticatedUser,authorrizeRole('admin','user'),getProducts);
router.route('/product/:id').get(getProductDetail);
router.route('/admin/product/new').post(isAuthenticatedUser,authorrizeRole('admin'), newProduct);
router.route('/admin/product/:id').put(isAuthenticatedUser,authorrizeRole('admin'), editProduct);
router.route('/admin/product/:id')
                                .put(isAuthenticatedUser,authorrizeRole('admin'), deleteProduct)
                                .delete(isAuthenticatedUser,authorrizeRole('admin'), deleteProduct);
module.exports = router;    