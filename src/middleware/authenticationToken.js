import pkg from 'jsonwebtoken';
const { verify } = pkg;
import dotenv from 'dotenv';

dotenv.config()

// Función async para autenticar el token usando async/await
const authenticateToken = async (token) => {
  try {
    // Verificamos el token utilizando la clave secreta desde el entorno
    const decoded = await new Promise((resolve, reject) => {
      verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
          reject(new Error('Token no válido'));
        } else {
          resolve(user); // Retornamos los datos del usuario si el token es válido
        }
      });
    });
    
    return decoded;  // El token es válido, devolvemos los datos del usuario
  } catch (err) {
    throw new Error('Token no válido'); // En caso de que haya algún error, rechazamos la promesa
  }
};

export default authenticateToken;
