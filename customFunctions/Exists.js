const db = require("../models/index");
const Product = db.products;

const Exists = async(product_name) => {
    // console.log(product_name);
    const productExist =  await Product.findOne({ where: { product_name: product_name }});
    // console.log(productExist);
    return productExist ? (true):(false);
    
}

module.exports = Exists;