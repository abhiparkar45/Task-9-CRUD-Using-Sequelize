const {body} = require('express-validator');

exports.productValidation = [
    body('product_name')
        .notEmpty()
        .withMessage("Product Name is Required !")
        .isLength({min:5,max:35})
        .withMessage("Product Name should be at least 5 characters and at most 35 characters !"),
    body('product_price')
        .notEmpty()
        .withMessage("Product Price is Required !")
        .custom((val) => !isNaN(val))
        .withMessage("Invalid Price !"),
    body('product_description')
        .notEmpty()
        .withMessage("Product Description is required !")
        .isLength({min:15,max:100})
        .withMessage("Product Discription must contain atleast 15 characters or atmost 100 characters"),
    body('categoryId')
        .notEmpty()
        .withMessage("Category Id is required !")
        .custom((val) => !isNaN(val))
        .withMessage("Invalid Category Id !")
]