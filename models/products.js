"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      products.belongsTo(models.categories, {
        foreignKey: "category_Id",
        onDelete: "cascade",
        onUpdate: "cascade",
      });
    }
  }
  products.init(
    {
      product_Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      product_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      product_price: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      product_description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category_Id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "products",
      tableName: "product",
    }
  );
  return products;
};
