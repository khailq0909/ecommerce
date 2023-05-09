const express = require('express');
const router = express.Router();

const { getProducts, newProduct, getProductDetail,editProduct,deleteProduct } = require('../controllers/productController');

router.route('/products').get(getProducts);
router.route('/product/:id').get(getProductDetail);
router.route('/admin/product/new').post(newProduct);
router.route('/admin/product/:id').put(editProduct);
router.route('/admin/product/:id')
                                .put(deleteProduct)
                                .delete(deleteProduct);
module.exports = router;    