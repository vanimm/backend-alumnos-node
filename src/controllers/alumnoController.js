const alumnoModel = require('../models/alumnoModel');

function sendError(res, error) {
  if (error.code === 'ER_DUP_ENTRY') {
    return res.status(400).json({ error: 'El email o DNI ya está registrado.' });
  }
  console.error(error);
  return res.status(500).json({ error: 'Error interno del servidor.' });
}

function validateBody(body) {
  const fields = ['nombre', 'apellido', 'email', 'dni'];
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return { error: 'El cuerpo debe ser un objeto JSON válido.' };
  }

  const alumno = {};
  for (const field of fields) {
    if (typeof body[field] !== 'string' || body[field].trim() === '') {
      return { error: `El campo ${field} es obligatorio y debe ser texto.` };
    }
    alumno[field] = body[field].trim();
  }

  if (alumno.nombre.length > 100 || alumno.apellido.length > 100
      || alumno.email.length > 150 || alumno.dni.length > 20) {
    return { error: 'Uno o más campos exceden la longitud permitida.' };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(alumno.email)) {
    return { error: 'El email no tiene un formato válido.' };
  }

  return { alumno };
}

async function index(req, res) {
  try {
    const alumnos = await alumnoModel.findAllActive();
    return res.status(200).json(alumnos);
  } catch (error) {
    return sendError(res, error);
  }
}

async function show(req, res) {
  try {
    const alumno = await alumnoModel.findActiveById(Number(req.params.id));
    if (!alumno) {
      return res.status(404).json({ error: 'Alumno no encontrado.' });
    }
    return res.status(200).json(alumno);
  } catch (error) {
    return sendError(res, error);
  }
}

async function store(req, res) {
  try {
    const validation = validateBody(req.body);
    if (validation.error) {
      return res.status(400).json({ error: validation.error });
    }
    const id = await alumnoModel.create(validation.alumno);
    const alumno = await alumnoModel.findActiveById(id);
    return res.status(201).json(alumno);
  } catch (error) {
    return sendError(res, error);
  }
}

async function update(req, res) {
  try {
    const validation = validateBody(req.body);
    if (validation.error) {
      return res.status(400).json({ error: validation.error });
    }
    const id = Number(req.params.id);
    if (!await alumnoModel.findActiveById(id)) {
      return res.status(404).json({ error: 'Alumno no encontrado.' });
    }
    await alumnoModel.update(id, validation.alumno);
    const alumno = await alumnoModel.findActiveById(id);
    return res.status(200).json(alumno);
  } catch (error) {
    return sendError(res, error);
  }
}

async function destroy(req, res) {
  try {
    const deleted = await alumnoModel.softDelete(Number(req.params.id));
    if (!deleted) {
      return res.status(404).json({ error: 'Alumno no encontrado.' });
    }
    return res.status(200).json({ message: 'Alumno eliminado correctamente.' });
  } catch (error) {
    return sendError(res, error);
  }
}

module.exports = { index, show, store, update, destroy };
