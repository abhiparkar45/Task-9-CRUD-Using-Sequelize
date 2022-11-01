const express = require("express");
const {productValidation} = require("../validation/productValidation");
const catchValidationError = require("../middlewares/catchValidationError");

const router = express.Router();

const { 
    createNewProduct, 
    getAllProducts, 
    getASingleProduct, 
    updateProduct, 
    deleteProduct 
} = require("../controllers/productController");

router.route("/").get(getAllProducts);
// router.post("/new",productValidation,catchValidationError,createNewProduct);
router.route("/new").post(productValidation,catchValidationError,createNewProduct);
router.route("/:id").get(getASingleProduct)
                    .delete(deleteProduct)
                    .put(productValidation,catchValidationError,updateProduct)


module.exports = router