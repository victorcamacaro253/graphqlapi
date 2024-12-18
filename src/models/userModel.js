// src/models/usuario.js
import {query} from '../config/db.js';

class userModel {
  // Función para obtener todos los usuarios
  static async getUsers() {
    try {
      const results = await query('SELECT * FROM users');
      return results;
    } catch (error) {
      throw error; // Rethrow the error to be handled by the caller
    }
  }

  // Función para obtener un usuario por ID
  static async getUserById(id) {
    try {
      const results = await query('SELECT * FROM users WHERE user_id = ?', [id]);
      return results; // Return the first user found
    } catch (error) {
      throw error; // Rethrow the error to be handled by the caller
    }
  }

  // Función para crear un nuevo usuario
  static async crearUsuario(nombre, email) {
    try {
      const [results] = await query(
        'INSERT INTO usuarios (nombre, email) VALUES (?, ?)',
        [nombre, email]
      );
      return {
        id: results.insertId,
        nombre,
        email,
      };
    } catch (err) {
      throw err; // Rethrow the error to be handled by the caller
    }
  }
}

export default userModel;