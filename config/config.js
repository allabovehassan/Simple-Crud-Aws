const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("sys", "hassan", "12345678", {
  host: "database-1.cpiit9t4nw63.us-east-1.rds.amazonaws.com",
  dialect: "mysql",
});

module.exports = { sequelize };
