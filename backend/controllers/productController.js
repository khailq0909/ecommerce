const Product = require('../models/product')
const ErrorHandler = require('../utils/errorHandler')

//Creater new product => /api/vi/product/new
exports.newProduct = async(req,res,next)=>{
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
}
//edit product => /api/vi/product/edit/:id
exports.editProduct = async(req,res,next)=>{
    let product = await Product.findById(req.params.id);
    if(!product){
        return new ErrorHandler("Product Not Found");
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
} 
exports.getProducts = async (req,res,next)=>{
    const products = await Product.find();
    res.status(200).json({
        success: true,
        count: products.length,
        products
    })
}
//find product detail => api/v1/product/:id
exports.getProductDetail = async (req,res,next)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
        return new ErrorHandler("Product Not Found");
    }else{
        return res.status(200).json({
            success: true,
            product
        })
    }
}
//delete a product =>api/v1/admin/product/:id
exports.deleteProduct = async (req,res,next)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
        return new ErrorHandler("Product Not Found");
    }
    await product.deleteOne();
    res.status(200).json({
        success: true,
        message: "Product is deleted"
    })
}

