const { DataTypes } = require ('sequelize');
const sequelize = require ('../database');
const Usuario = require('./modelUsuario');

const Turno = sequelize.define('Turno', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false, // Asegúrate de que la fechaHora no sea nula
    },   
    hora: {
        type: DataTypes.TIME,
        allowNull: false, // Asegúrate de que la fechaHora no sea nula
    },   
    id_medico: DataTypes.INTEGER,
    id_paciente: DataTypes.INTEGER,
}, {
    timestamps: false, // Deshabilitar createdAt y updatedAt
});
//asociaciones
Turno.belongsTo(Usuario, { as: 'Medico', foreignKey: 'id_medico' });
Turno.belongsTo(Usuario, { as: 'Paciente', foreignKey: 'id_paciente' });

module.exports = Turno;