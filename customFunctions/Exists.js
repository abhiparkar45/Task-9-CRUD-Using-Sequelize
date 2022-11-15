const db = require("../models/index");
const Product = db.products;
const Category = db.categories;

const Exists = async ({ name, value }) => {
  switch (name) {
    case "ProductID":
      const productExistByID = await Product.findOne({
        where: { product_Id: value },
      });
      return productExistByID ? productExistByID : false;
    case "ProductName":
      const productExistByName = await Product.findOne({
        where: { product_name: value },
      });
      return productExistByName ? productExistByName : false;
    case "CategoryID":
      const categoryExistByID = await Category.findOne({
        where: { category_Id: value },
      });
      return categoryExistByID ? categoryExistByID : false;
    case "CategoryName":
      const categoryExistByName = await Category.findOne({
        where: { categoryName: value },
      });
      return categoryExistByName ? categoryExistByName : false;
  }
};
//   if (name === "Product") {
//     const productExist = await Product.findOne({
//       where: { product_name: value },
//     });
// console.log(productExist);
// return productExist ? true : false;
//   }
//   const categoryExist = await Category.findOne({
//     where: { categoryName: value },
//   });
//   return categoryExist ? true : false;
// };

module.exports = Exists;
