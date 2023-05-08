const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter product name"],
        trim: true,
        maxLength: [100, "Please enter less than 100 characters"]
    },
    price: {
        type: Number,
        required: [true, "Please enter product name"],
        trim: true,
        maxLength: [5, "Please enter less than 5 characters"]
    },
    description: {
        type: String,
        required: [true, "Please enter product name"],
        trim: true,
        maxLength: [200, "Please enter less than 200 characters"]
    },
    rating: {
        type: Number,
        default: 0,
    },
    img: [
        {
            public_id: {
                type: String,
                required: true,
            },
            url:{
                type: String,
                required: true
            }
        }
    ],
    category:{
        type: String,
        required: [true, "Please select category for this product"],
        enum:{
            values:[
                'Electronics',
                'Cameras',
                'Laptop',
                'Headphones',
                'PC',
                
            ],
            message:"Please select correct category for product"
        }
    },
    seller:{
        type: String,
        required: [true, "Please enter product seller"]
    },
    stock: {
        type: Number,
        required: [true, "Please enter product stock"],
        maxLength: [5, "Product name cannot exceed 5 characters"],
        default: 0
    },
    numOfReviews:{
        type: Number,
        default: 0
    },
    reviews:[
        {
            name:{
                type: String,
                required: true
            },
            rating:{
                type: Number,
                required: true
            },
            comment:{
                type:String,
                required: true,
                maxLength: [200,"Please comment less than 200 characters"]
            }
        }
    ],
    createAt:{

        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', productSchema)