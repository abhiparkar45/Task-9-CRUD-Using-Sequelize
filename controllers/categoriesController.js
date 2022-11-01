const db = require("../models/index");
const Category = db.categories;
const Product = db.products;
const successResponse = require("../responseBuilder/successResponse");
const failerResponse = require("../responseBuilder/failerResponse");

exports.createCategory = async(req, res) => {
    const category = await req.body;
    const exist = await Category.findOne({where:{categoryName:category.categoryName}});
    if(exist){
        return res.status(400).json(failerResponse("Category Already Exists !"));
    }
    const result = await Category.create(category);
    res.status(201).json(successResponse("Category created successfully !",result));
}

exports.getASingleCategory = async(req, res) => {
    const category = await Category.findOne({where:{id:req.params.id}});
    if(!category){
        return res.status(404).json(failerResponse("Category does not exists !"));
    }
    res.status(200).json(successResponse("Category retrieved successfully",category))
}

exports.getAllCategories = async(req, res) => {
    const categories = await Category.findAll();
    res.status(200).json(successResponse("All categories retrieved successfully !",categories));
}

exports.updateCategory = async(req, res) => {
    const newCategory = await req.body;
    const exist = await Category.findOne({where:{id:req.params.id}});
    if(!exist){
        return res.status(404).json(failerResponse("Category not found !"));
    }
    if(req.body.categoryName === exist.categoryName){
        return res.status(400).json(failerResponse(`category name is already ${req.body.categoryName}`))
    }
    const updatedCategory = await Category.update(newCategory,{where:{id:req.params.id}});
    if(updatedCategory){
        res.status(200).json(successResponse("Category updated Successfully !",newCategory))
    }
}

exports.deleteCategory = async(req, res) => {
    const category = await Category.findOne({where:{id:req.params.id}});
    if(!category){
        return res.status(404).json(failerResponse("Category Not Found !"));
    }
    const deletedCategory = await Category.destroy({where:{id:req.params.id}});
    if(deletedCategory){
        await Product.destroy({where:{categoryId:category.id}})
        res.status(200).json(successResponse("Category deleted successfully !",category))
    }
}