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
      const [results] = await query('SELECT * FROM users WHERE user_id = ?', [id]);
     
      return results; // Return the first user found
    } catch (error) {
      throw error; // Rethrow the error to be handled by the caller
    }
  }

  static async getUserByPersonalID(ID){
    try {
        const [results] = await query('SELECT * FROM users WHERE personal_id = ?', [ID]);
            return results; // Return the first user found
            } catch (error) {
                throw error; // Rethrow the error to be handled by the caller
                }
  }

  static async getUserByEmail(email) {
  try {
    const [result]= await query('SELECT * FROM users WHERE email = ?', [email]);
    return result
  } catch (error) {
    throw error
  }  
}

  // Función para crear un nuevo usuario
  static async createUser(fullname,username,email,password,personal_ID,role) {
    try {
      const results = await query(
        'INSERT INTO users (fullname,username, email,password,personal_ID,role) VALUES (?,?,?,?,?,?)',
        [fullname,username,email,password,personal_ID,role]
      );
      return {
        id: results.insertId,
        fullname,
        email,
      };
    } catch (error) {
      throw error; // Rethrow the error to be handled by the caller
    }
  }

  static async updateUser(id,fullname,username,email){
    try {
        const results = await query(
            `UPDATE users set fullname=?,username=?,email=? WHERE user_id=?` ,
            [fullname,username,email,id] )

            return results
    } catch (error) {
        throw new Error('Error updating user with ID ' + id + ': ' + error.message);
        
    }
  }


  static async deleteUser(id){
   try {
    const results = await query('DELETE FROM users WHERE user_id = ?', [id]);
    if (results.affectedRows === 0) {
        return false;  // Return false if no rows were deleted (user not found)
      }

      return true;
   } catch (error) {
    throw new Error('Error deleting user with ID ' + id + ': ' + error.message);
   }
  }

}

export default userModel;