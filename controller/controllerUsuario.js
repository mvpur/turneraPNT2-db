const Usuario = require("../modelos/modelUsuario");
const Turno = require("../modelos/modelTurno");

// Define funciones

crearUsuario = async (req, res) => {
  try {
    const {
      nombre,
      apellido,
      email,
      contrasenia,
      esPaciente,
      especialidad,
      horarioInicioAtencion,
      horarioFinalAtencion,
    } = req.body;

    //Buscar si ya existe
    const usuarioExiste = await Usuario.findOne({ where: { email } });

    if (usuarioExiste) {
      return res.status(404).send("Usuario existente");
    }

    // crear usuario
    const usuario = await Usuario.create({
      nombre,
      apellido,
      email,
      contrasenia,
      esPaciente,
      especialidad: esPaciente ? null : especialidad, // asigna null si es paciente, sino asignar el valor de especialidad
      horarioInicioAtencion: esPaciente ? null : horarioInicioAtencion,
      horarioFinalAtencion: esPaciente ? null : horarioFinalAtencion,
    });
    console.log("Usuario creado correctamente");
    res.status(200).send("Usuario agregado correctamente");
  } catch (error) {
    res.status(500).send("Error en el servidor - Usuario no creado" + error);
  }
};

login = async (req, res) => {
  try {
    const { email, contrasenia } = req.body;
    const usuario = await Usuario.findOne({ where: { email, contrasenia } });

    if (usuario) {
      // Utiliza las asociaciones para obtener información relacionada con el usuario
      const turnos = await Turno.findAll({
        where: {
          [usuario.esPaciente ? "id_paciente" : "id_medico"]: usuario.id,
        },
      });

      const id = usuario.id;
      const nombre = usuario.nombre;
      const email = usuario.email;
      const apellido = usuario.apellido;
      const esPaciente = usuario.esPaciente;
      const especialidad = usuario.especialidad;
      const horarioInicioAtencion = usuario.horarioInicioAtencion;
      const horarioFinalAtencion = usuario.horarioFinalAtencion;

      console.log(usuario);

      res
        .status(200)
        .send({
          usuario,
          turnos,
          id,
          nombre,
          email,
          apellido,
          esPaciente,
          especialidad,
          horarioFinalAtencion,
          horarioInicioAtencion,
        });
    } else {
      res.status(404).send("Usuario invalido");
    }
  } catch (error) {
    res.status(500).send("Error en el servidor" + error);
  }
};

editarUsuario = async (req, res) => {
  try {
    const idUsuario = req.params.id;
    const {
      nombre,
      apellido,
      email,
      contrasenia,
      esPaciente,
      especialidad,
      horarioInicioAtencion,
      horarioFinalAtencion,
    } = req.body;

    //busca el usuario
    const usuario = await Usuario.findByPk(idUsuario);

    if (!usuario) {
      return res.status(404).send("Usuario no encontrado");
    }

    // si no es paciente, permite actualizar la especialidad
    if (!usuario.esPaciente) {
      usuario.especialidad = especialidad;
      usuario.horarioInicioAtencion = horarioInicioAtencion;
      usuario.horarioFinalAtencion = horarioFinalAtencion;
    }

    // actualizar los campos del usuario
    usuario.nombre = nombre;
    usuario.apellido = apellido;
    usuario.email = email;
    usuario.contrasenia = contrasenia;

    // guardar los cambios
    await usuario.save();
    res.status(200).send("Usuario actualizado");
  } catch (error) {
    res
      .status(500)
      .send("Error en el servidor - Usuario no actualizado " + error);
  }
};

obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.status(200).send(usuarios);
  } catch (error) {
    res.status(500).send("Error en el servidor " + error);
  }
};

obtenerUsuario = async (req, res) => {
  try {
    const id = req.params.id;

    // bsucar usuario
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      res.status(404).send("Usuario no encontrado");
    }

    res.status(200).send(usuario);
  } catch (error) {
    res.status(500).send("Error en el servidor " + error);
  }
};

obtenerMedicos = async (req, res) => {
  try {
    const medicos = await Usuario.findAll({ where: { esPaciente: false } });
    res.status(200).send(medicos);
  } catch (error) {
    res.status(500).send("Error en el servidor " + error);
  }
};

obtenerMedicosEspecialidad = async (req, res) => {
  try {
    // obtener el número de especialidad
    const especialidadID = req.params.especialidad;

    // buscar medicos con misma especialidad
    const medicos = await Usuario.findAll({
      where: {
        esPaciente: false,
        especialidad: especialidadID,
      },
    });
    res.status(200).send(medicos);
  } catch (error) {
    res.status(500).send("Error en el servidor " + error);
  }
};

obtenerPacientes = async (req, res) => {
  try {
    const pacientes = await Usuario.findAll({ where: { esPaciente: true } });
    res.status(200).send(pacientes);
  } catch (error) {
    res.status(500).send("Error en el servidor " + error);
  }
};

module.exports = {
  crearUsuario,
  login,
  editarUsuario,
  obtenerUsuario,
  obtenerUsuarios,
  obtenerMedicos,
  obtenerPacientes,
  obtenerMedicosEspecialidad
};
