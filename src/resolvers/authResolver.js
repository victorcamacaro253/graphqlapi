import userModel from "../models/userModel.js";
import { hash,compare } from "bcrypt";
import tokenService from "../services/tokenService.js";
import tokenModel from "../models/tokenModel.js";
import { randomBytes } from "crypto";

const authResolver = {
    Mutation:{
        login :async (_,{email,password},{res})=>{

            const user = await userModel.getUserByEmail(email)
            console.log(user)
            if(!user){
                throw new Error('User not found')
            }
            
    
            const isMatch = await compare(password,user.password)
            
            if(!isMatch){
                throw new Error('Invalid password')
            }
    
            
           const token= tokenService.generateToken(user.user_id,user.email,user.role,'1h')
           
          const refreshToken = tokenService.generateToken(user.user_id,user.email,user.role,'7d')
    
    
           const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);  // Expira en 7 días
    
           const saveRefreshToken = await tokenModel.saveRefreshToken( user.user_id,refreshToken, expiresAt);
    
            // Configurar el refresh token como una cookie
          /*  res.cookie('refreshToken', refreshToken, {
                httpOnly: true, // No accesible por JavaScript en el navegador
                secure: process.env.NODE_ENV === 'production', // Solo en producción
                sameSite: 'Strict', // Protección contra CSRF
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 días en milisegundos
            });*/
    
    
             // Generar un código aleatorio
             const randomCode = randomBytes(8).toString('hex'); // Genera un código aleatorio de 8 caracteres
    
             // Insertar registro de inicio de sesión en la base de datos
             userModel.insertLoginRecord(user.user_id, randomCode)
    
           return {
            token,
           refreshToken,
            user
           }
    
        },

        logout: async (_, __, { req, res }) => {
            // Get the refresh token from the cookies
            const refreshToken = req.cookies.refreshToken;
      
            if (!refreshToken) {
              throw new Error('No refresh token provided');
            }
      
            try {
              // Verify the refresh token
              const decoded = tokenService.verifyToken(refreshToken);
              if (!decoded) {
                throw new Error('Invalid or expired refresh token');
              }
      
              // Revoke the refresh token in the database
              const result = await tokenModel.revocateToken(refreshToken);
      
              if (result.length === 0) {
                throw new Error('Refresh token not found');
              }
      
              // Clear the refresh token from cookies
              res.clearCookie('refreshToken', {
                httpOnly: true, // Ensures the cookie is not accessible by JavaScript
                secure: process.env.NODE_ENV === 'production', // Only in production when using HTTPS
                sameSite: 'Strict', // Protect against CSRF
              });
      
              // Return a success message
              return { message: 'Logout exitoso' };
            } catch (error) {
              console.error('Error during logout:', error);
              throw new Error('Error interno del servidor. Intenta de nuevo más tarde.');
            }
          }
    }
}

export default authResolver
