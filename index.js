const express = require ('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//conectar rutas
const rutaUsuario = require('./rutas/rutaUsuario');
const rutaTurno = require('./rutas/rutaTurno');

app.use('/usuarios', rutaUsuario);
app.use('/turnos' , rutaTurno);

// Inicia el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});