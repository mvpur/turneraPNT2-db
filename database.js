const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('turneratest', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  define: {
    freezeTableName: true, // Evita la pluralización automática de nombres de tablas
  },
});

module.exports = sequelize;