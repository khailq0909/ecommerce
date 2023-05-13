const Product = require('../models/product')
const ErrorHandler = require('../utils/errorHandler')
const CathAsyncErrors = require('../middlewares/cathAsyncError');
const APIFeatures = require('../utils/apiFeatures');

//Creater new product => /api/vi/product/new
exports.newProduct = CathAsyncErrors(
    async(req,res,next)=>{
        const product = await Product.create(req.body);
        req.body.user = req.user.id
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

exports.createProductReview =  CathAsyncErrors(async (req, res, next) => {

    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(
        r => r.user.toString() === req.user._id.toString()
    )

    if (isReviewed) {
        product.reviews.forEach(review => {
            if (review.user.toString() === req.user._id.toString()) {
                review.comment = comment;
                review.rating = rating;
            }
        })

    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length
    }

    product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true
    })

})


// Get Product Reviews   =>   /api/v1/reviews
exports.getProductReviews =  CathAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})

// Delete Product Review   =>   /api/v1/reviews
exports.deleteReview =  CathAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req.query.productId);

    console.log(product);

    const reviews = product.reviews.filter(review => review._id.toString() !== req.query.id.toString());

    const numOfReviews = reviews.length;

    const ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numOfReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })
})

