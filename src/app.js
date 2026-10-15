require('dotenv').config();

// Configura Express, monta las rutas de alumnos y pone la API en escucha.
const express = require('express');
const cors = require('cors');
const alumnoRoutes = require('./routes/alumnoRoutes');

const app = express();
const port = Number(process.env.PORT || 3000);

app.use(cors());
app.use(express.json());
app.use('/api/alumnos', alumnoRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada.' });
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    return res.status(400).json({ error: 'El cuerpo debe ser un objeto JSON válido.' });
  }
  console.error(error);
  return res.status(500).json({ error: 'Error interno del servidor.' });
});

app.listen(port, () => {
  console.log(`API de alumnos escuchando en http://localhost:${port}`);
});
