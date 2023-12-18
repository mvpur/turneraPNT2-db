const Turno = require("../modelos/modelTurno");

// Define funciones

agregarTurno = async (req, res) => {
  try {
    const { fecha, hora, id_medico, id_paciente } = req.body;

    console.log("Fecha y Hora:", fecha, hora);

    // buscar si el turno esta tomado por fecha y médico
    const turnoTomado = await Turno.findOne({ where: { fecha, hora } });

    if (turnoTomado) {
      return res.status(404).send("El turno ya fue tomado");
    }

    // crear turno
    const turno = await Turno.create({ fecha, hora, id_medico, id_paciente });

    res.status(200).send("Turno agregado correctamente");
  } catch (error) {
    res.status(500).send("Error en el servidor - Turno no creado " + error);
  }
};

eliminarTurno = async (req, res) => {
  try {
    const turnoId = req.params.id;

    //busca el turno por id
    const turno = await Turno.findByPk(turnoId);

    //verificar si el turno existe
    if (!turno) {
      return res.status(404).send("Turno no encontrado");
    }

    //eliminarTurno
    await turno.destroy();
    res.status(200).send("Turno eliminado");
  } catch (error) {
    res.status(500).send("Error en el servidor - Turno no eliminado " + error);
  }
};

obtenerTurnos = async (req, res) => {
  try {
    const turnos = await Turno.findAll();
    res.status(200).send(turnos);
  } catch (error) {
    res.status(500).send("Error en el servidor " + error);
  }
};

obtenerTurno = async (req, res) => {
  try {
    const id = req.params.id;

    // bsucar turno
    const turno = await Turno.findByPk(id);

    if (!turno) {
      res.status(404).send("Turno no encontrado");
    }

    res.status(200).send(turno);
  } catch (error) {
    res.status(500).send("Error en el servidor " + error);
  }
};

module.exports = { agregarTurno, eliminarTurno, obtenerTurnos, obtenerTurno };
