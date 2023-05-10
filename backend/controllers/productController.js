const Product = require('../models/product')
const ErrorHandler = require('../utils/errorHandler')
const CathAsyncErrors = require('../middlewares/cathAsyncError');
const APIFeatures = require('../utils/apiFeatures');

//Creater new product => /api/vi/product/new
exports.newProduct = CathAsyncErrors(
    async(req,res,next)=>{
        const product = await Product.create(req.body);
        res.status(201).json({
            success: true,
            product
        })
    }
)
//edit product => /api/vi/product/edit/:id
exports.editProduct = CathAsyncErrors(async(req,res,next)=>{
    let product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product Not Found", 404))
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true,
        product
    })
})
exports.getProducts = CathAsyncErrors(
    async (req,res,next)=>{
        const apifeatures = new APIFeatures(Product.find(), req.query).search().filter();
        const products = await apifeatures.query;
        res.status(200).json({
            success: true,
            count: products.length,
            products
        })  
    }
)
//find product detail => api/v1/product/:id
exports.getProductDetail = CathAsyncErrors(
    async (req,res,next)=>{
        const product = await Product.findById(req.params.id);
        if(!product){
            return next(new ErrorHandler("Product Not Found", 404))
        }else{
            return res.status(200).json({
                success: true,
                product
            })
        }
    }
)
//delete a product =>api/v1/admin/product/:id
exports.deleteProduct = CathAsyncErrors(
    async (req,res,next)=>{
        const product = await Product.findById(req.params.id);
        if(!product){
            return next(new ErrorHandler("Product Not Found", 404))
        }
        await product.deleteOne();
        res.status(200).json({
            success: true,
            message: "Product is deleted"
        })
    }
)

//find product => api/v1/products?keyword=keyword

