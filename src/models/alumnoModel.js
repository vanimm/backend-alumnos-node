const pool = require('../config/database');

async function findAllActive() {
  const [rows] = await pool.execute(
    'SELECT id, nombre, apellido, email, dni FROM alumnos WHERE estado = 1 ORDER BY id',
  );
  return rows;
}

async function findActiveById(id) {
  const [rows] = await pool.execute(
    'SELECT id, nombre, apellido, email, dni FROM alumnos WHERE id = ? AND estado = 1',
    [id],
  );
  return rows[0] || null;
}

async function create(alumno) {
  const [result] = await pool.execute(
    'INSERT INTO alumnos (nombre, apellido, email, dni) VALUES (?, ?, ?, ?)',
    [alumno.nombre, alumno.apellido, alumno.email, alumno.dni],
  );
  return result.insertId;
}

async function update(id, alumno) {
  const [result] = await pool.execute(
    `UPDATE alumnos
     SET nombre = ?, apellido = ?, email = ?, dni = ?
     WHERE id = ? AND estado = 1`,
    [alumno.nombre, alumno.apellido, alumno.email, alumno.dni, id],
  );
  return result.affectedRows > 0;
}

async function softDelete(id) {
  const [result] = await pool.execute(
    'UPDATE alumnos SET estado = 0 WHERE id = ? AND estado = 1',
    [id],
  );
  return result.affectedRows > 0;
}

module.exports = {
  findAllActive,
  findActiveById,
  create,
  update,
  softDelete,
};
