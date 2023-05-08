const mongoose = require('mongoose');

const URI = 'mongodb+srv://khaiql0909:khaiql0909@ecommerce.xykdjtl.mongodb.net/';
const connectDB = () => {
    mongoose.connect(URI,
        {
            useNewUrlParser: true,        
            useUnifiedTopology: true
        }
    );
}
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});
module.exports = connectDB;