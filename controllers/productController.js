const db = require("../models/index");
const Product = db.products;
const Category = db.categories;
const getSuccessResponse = require("../responseBuilder/successResponse");
const failerResponse = require("../responseBuilder/failerResponse");
const Exists = require("../customFunctions/Exists");

exports.createNewProduct = async(req, res) => {
    const product = await req.body;
    const doesExist = await Exists(req.body.product_name);
    const isCategoryValid = await Category.findOne({where:{id:req.body.categoryId}});

    if(doesExist){
        return res.status(400).json(failerResponse("Product Already Exists !"))
    } 
    if(!isCategoryValid){
        return res.status(400).json(failerResponse("Invalid Category Id !"));
    }

    const result = await Product.create(product);

    res.status(201).json(getSuccessResponse("product created successfully !",result));
}

exports.getAllProducts = async(req, res) => {
    const allproducts = await Product.findAll();

    res.status(200).json(getSuccessResponse("All Products Retrieved successfully !",allproducts));
}

exports.getASingleProduct = async(req, res) =>{
    // console.log(req.params.id);
    const product = await Product.findOne({where: {product_Id:req.params.id}});
    // console.log(product);
    return (!product)?(
        res.status(404).json(failerResponse("Product Not Found !"))
    ):(
    res.status(200).json(getSuccessResponse("Product retrieved successfully !",product))
    )

}

exports.updateProduct = async(req, res) => {
    const newProduct = await req.body;
    const doesExist = await Product.findOne({where:{product_Id:req.params.id}});
    if(!doesExist){
        return res.status(404).json(failerResponse("Product Not Found !"));
    }
    const isCategoryValid = await Category.findOne({where:{id:req.body.categoryId}});
    if(!isCategoryValid){
        return res.status(400).json(failerResponse("Invalid Category Id !"));
    }
    const updatedProduct = await Product.update(newProduct,{where: {product_Id:req.params.id}});
   if(updatedProduct){ 
    const response = getSuccessResponse("Product updated successfully !",newProduct);
    res.status(200).json(response);   
 }
}

exports.deleteProduct = async(req, res) => {
    const product = await Product.findOne({ where: { product_Id: req.params.id }});
    if(!product){
        return res.status(404).json(failerResponse("Product Not Found !"));
    }
    const deletedProduct = await Product.destroy({where:{product_Id:req.params.id}});
    if(deletedProduct){
        return res.status(200).json(getSuccessResponse("Product deleted successfully !",product))
    }

}