const { DataTypes } = require ('sequelize');
const sequelize = require ('../database');

const Usuario = sequelize.define('Usuario', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    email: DataTypes.STRING,
    contrasenia: DataTypes.STRING,
    esPaciente: DataTypes.BOOLEAN,
    especialidad: DataTypes.INTEGER,
    horarioInicioAtencion: DataTypes.TIME,
    horarioFinalAtencion: DataTypes.TIME
}, {
    timestamps: false, // Deshabilitar createdAt y updatedAt
});

module.exports = Usuario;