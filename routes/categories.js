const express = require('express');
const router = express.Router();
const {categoryValidaton} = require("../validation/categoryValidation"); 
const catchValidationError = require("../middlewares/catchValidationError");

const { 
    createCategory, 
    getASingleCategory, 
    getAllCategories, 
    updateCategory, 
    deleteCategory 
} = require("../controllers/categoriesController");

router.route("/").get(getAllCategories);
router.route("/new").post(categoryValidaton, catchValidationError, createCategory);
router.route("/:id").get(getASingleCategory)
                    .delete(deleteCategory)
                    .put(categoryValidaton, catchValidationError, updateCategory);

module.exports = router;