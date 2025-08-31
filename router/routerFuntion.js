const { getConnection } = require('../sql/connection.js');

const seleccionarTodos = async (req, res) => {
  try {
    const client = await getConnection();
    const result = await client.query('SELECT * FROM formulario1');
    client.release();
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener registros');
  }
};

const actualizar = async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, cedula } = req.body;

  try {
    const client = await getConnection();
    await client.query(
      'UPDATE formulario1 SET nombre = $1, apellido = $2, cedula = $3 WHERE id = $4',
      [nombre, apellido, cedula, id]
    );
    client.release();
    res.send('Registro actualizado');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al actualizar');
  }
};

const nuevoRegistro = async (req, res) => {
  const { nombre, apellido, cedula } = req.body;

  try {
    const client = await getConnection();
    await client.query(
      'INSERT INTO formulario1 (nombre, apellido, cedula) VALUES ($1, $2, $3)',
      [nombre, apellido, cedula]
    );
    client.release();
    res.send('REGISTRO COMPLETADO EXITOSAMENTE');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al insertar');
  }
};

const eliminar = async (req, res) => {
  const { id } = req.params;

  try {
    const client = await getConnection();
    await client.query('DELETE FROM formulario1 WHERE id = $1', [id]);
    client.release();
    res.send('Registro eliminado');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al eliminar');
  }
};

const buscarCedula = async (req, res) => {
  const { cedula } = req.query;

  try {
    const client = await getConnection();
    const result = await client.query(
      'SELECT * FROM formulario1 WHERE cedula = $1',
      [cedula]
    );
    client.release();
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al buscar');
  }
};

module.exports = {
  seleccionarTodos,
  actualizar,
  nuevoRegistro,
  eliminar,
  buscarCedula
};
