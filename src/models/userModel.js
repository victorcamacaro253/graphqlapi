// src/models/usuario.js
import {query} from '../config/db.js';

class userModel {
  // Función para obtener todos los usuarios
  /*
  static async getUsers() {
    try {
      const results = await query('SELECT * FROM users');
      return results;
    } catch (error) {
      throw error; // Rethrow the error to be handled by the caller
    }
  }*/
 static async getUsers(filter = {}) {

 let   queryl= ('SELECT * FROM users')
 let conditions= []
 let values=[]
  
  if(Object.keys(filter).length > 0){
    conditions.push('1=1')

    if(filter.fullname){
      conditions.push('fullname LIKE ?')
      values.push('%' + filter.fullname + '%')
    }
    if(filter.email){
      conditions.push('email LIKE ?')
      values.push('%' + filter.email + '%')
      }
      if (filter.role !== undefined) {
        conditions.push('role = ?');
        values.push(filter.role);
      }

      if (filter.personal_ID) {
        conditions.push('personal_ID = ?');
        values.push(filter.personal_ID);
      }
      queryl += ' WHERE ' + conditions.join(' AND ');
 }

 try {
  const rows = await query(queryl,values)
  return rows;
 } catch (error) {
  throw new Error('Error retrieving users from DB ' + error.message)
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

 static async getUserLoginHistory(user_id){
  try {
    const queryStr = `SELECT * FROM login_history lh JOIN users u ON lh.user_id= u.user_id WHERE u.user_id = ? ORDER BY lh.date DESC `;
    const results = await query(queryStr, [user_id])
    return results
    
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

  /*static async updateUser(id,fullname,username,email){
    try {
        const results = await query(
            `UPDATE users set fullname=?,username=?,email=? WHERE user_id=?` ,
            [fullname,username,email,id] )

            return results
    } catch (error) {
        throw new Error('Error updating user with ID ' + id + ': ' + error.message);
        
    }
  }
*/
static async updateUser (user_id,updateFields){
  try {

      if(Object.keys(updateFields).length ===0){
          throw new Error ('No fields provided to update')
      }

          const queryStr = "UPDATE users SET ? WHERE user_id = ?";

          const result = await query(queryStr, [updateFields, user_id]);

          if(result.affectedRows > 0){
              return {user_id,...updateFields}
          }else{
              throw new Error ('No product found or no  change was made ')
          }
      
  } catch (error) {
      throw new Error ('Error updating product' + error.message)
      
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
  static async createMultipleUsers (users) {
    const queryl = `INSERT INTO users (fullname, username, email, password, personal_ID, role, status) VALUES ?`;

    // Transformamos el array de usuarios en un array de arrays con los valores
    const values = users.map(user => [
      user.fullname,
      user.username,
      user.email,
      user.password, // Contraseña ya ha sido hasheada
      user.personal_ID,
      user.role,
      user.status || 'activo'  // Aseguramos que 'status' esté presente (si no, asignamos 'activo')
    ]);

    try {
      // Ejecutamos la consulta con los valores
      const result = await query(queryl, [values]);

      // Retornamos el número de filas insertadas
      return result.affectedRows;
    } catch (error) {
      console.error('Error en la consulta SQL:', error);
      throw new Error('Error creating multiple users: ' + error.message);
    }
  }

static async getPaginatedUsers (limit, offset) {
  console.log(limit,offset)
  const SQL = `SELECT * FROM users LIMIT ? OFFSET ?`;
 
  try {
    const results = await query(SQL, [limit, offset]);

    return results;
  }catch(error){
    console.error('Error en la consulta SQL:', error);
    throw new Error('Error getting paginated users: ' + error.message);

  }

}


static async insertLoginRecord(userId,code){
  const SQL = `INSERT INTO login_history (user_id, date,code) VALUES (?,NOW(),?)`;
  try {
    const result = await query(SQL, [userId, code]);
    return result;
    } catch (error) {
      console.error('Error en la consulta SQL:', error);
      throw new Error('Error creating login record: ' + error.message);
      }
}

}

export default userModel;