const express = require("express");
const router = express.Router();
const turnoController = require("../controller/controllerTurno");

// Definir rutas http://localhost:3000/turnos/...

router.post("/", turnoController.agregarTurno);
router.delete("/:id", turnoController.eliminarTurno);
router.get("/", turnoController.obtenerTurnos);
router.get("/:id", turnoController.obtenerTurno);

module.exports = router;
