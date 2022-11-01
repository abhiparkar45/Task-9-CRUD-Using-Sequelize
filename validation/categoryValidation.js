const {body} = require('express-validator');

exports.categoryValidaton = [
    body('categoryName')
        .notEmpty()
        .withMessage("Category Name is Required")
        .isLength({min:5,max:20})
        .withMessage("Category Name should at least be 5 characters long or at most 20 characters long !")
        .custom((val)=>{
            const trimmedVal = val.trim();
            const regex = /^[a-zA-Z]{5,20}$/g;
            const res = regex.test(trimmedVal);
            return (res)?(true):(false);
        })
        .withMessage("Invalid Category Name !")
]