const db = require("../models/index");
const Category = db.categories;
const successResponse = require("../responseBuilder/successResponse");
const failerResponse = require("../responseBuilder/failerResponse");

exports.createCategory = async (req, res, next) => {
  try {
    const category = await req.body;
    const exist = await Category.findOne({
      where: { categoryName: category.categoryName },
    });
    if (exist) {
      return res.status(400).json(failerResponse("Category Already Exists !"));
    }
    const result = await Category.create(category);
    if (result) {
      return res
        .status(201)
        .json(successResponse("Category created successfully !", result));
    }
  } catch (err) {
    next(err);
  }
};

exports.getASingleCategory = async (req, res, next) => {
  try {
    const category = await Category.findOne({
      where: { category_Id: req.params.id },
    });
    if (!category) {
      return res.status(404).json(failerResponse("Category does not exists !"));
    }
    res
      .status(200)
      .json(successResponse("Category retrieved successfully", category));
  } catch (err) {
    next(err);
  }
};

exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.findAll();
    return res
      .status(200)
      .json(
        successResponse("All categories retrieved successfully !", categories)
      );
  } catch (err) {
    next(err);
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    const newCategory = await req.body;
    const exist = await Category.findOne({
      where: { category_Id: req.params.id },
    });
    if (!exist) {
      return res.status(404).json(failerResponse("Category not found !"));
    }
    if (req.body.categoryName === exist.categoryName) {
      return res
        .status(400)
        .json(
          failerResponse(`category name is already ${req.body.categoryName}`)
        );
    }
    const updatedCategory = await Category.update(newCategory, {
      where: { category_Id: req.params.id },
    });
    if (updatedCategory) {
      return res
        .status(200)
        .json(successResponse("Category updated Successfully !", newCategory));
    }
  } catch (err) {
    next(err);
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findOne({
      where: { category_Id: req.params.id },
    });
    if (!category) {
      return res.status(404).json(failerResponse("Category Not Found !"));
    }
    const deletedCategory = await Category.destroy({
      where: { category_Id: req.params.id },
    });
    if (deletedCategory) {
      res
        .status(200)
        .json(successResponse("Category deleted successfully !", category));
    }
  } catch (err) {
    next(err);
  }
};
