"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class categories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      categories.hasMany(models.products, {
        foreignKey: "category_Id",
        onDelete: "cascade",
        onUpdate: "cascade",
      });
    }
  }
  categories.init(
    {
      category_Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      categoryName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "categories",
      tableName: "category",
    }
  );
  return categories;
};
