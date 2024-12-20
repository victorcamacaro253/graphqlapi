import userModel from '../models/userModel.js'
import {hash,compare} from 'bcrypt'
import tokenService from '../services/tokenService.js';
import { randomBytes } from 'crypto';

const userResolvers = {
    Query: {
        users: async (_,__,{user}) => {
            if(!user){
                throw new Error('No autenticado')
            }
            return await userModel.getUsers()
        },
        user: async (_, { user_id }) => {
            const user = await userModel.getUserById(user_id);
            if (!user) {
                throw new Error(`User  with ID ${user_id} not found`);
            }
            console.log(user)
            return user;
        },
    },
    Mutation: {
        createUser:  async (_, { fullname,username, email, password,personal_ID,role }) => {

             try {
                const existingUser= await userModel.getUserByPersonalID(personal_ID)

                if (existingUser) {
                    throw new Error('User with the provided email or username already exists');
                  }

                  if (password.length < 7) {
                    throw new Error( 'La contraseña debe tener al menos 7 caracteres' );
                }
            
            const hashedPassword =await  hash(password,10)
                  
            return userModel.createUser(fullname,username, email, hashedPassword,personal_ID,role);
                
             } catch (error) {
                throw new Error('Error inserting user:'+ error.message)
             }

        },

        updateUser:async (_,{user_id,fullname,username,email})=>{
            try {
                const result= userModel.updateUser(user_id,fullname,username,email)
                return result
            } catch (error) {
                throw new Error('Error updating user:'+ error.message)
            }
        },

    deleteUser : async (_,{user_id})=>{
        try {
            
            const result= await userModel.deleteUser(user_id);
            return result

    }catch(error){
        throw new Error('Error deleting user:' + error.message)
    }

    },

    login :async (_,{email,password})=>{

        const user = await userModel.getUserByEmail(email)
        console.log(user)
        if(!user){
            throw new Error('User not found')
        }

        const isMatch = await compare(password,user.password)
        
        if(!isMatch){
            throw new Error('Invalid password')
        }

        
       const token= tokenService.generateToken(user.id,user.correo,user.rol,'1h')
       
      const refreshToken = tokenService.generateToken(user.id,user.correo,user.rol,'7d')


       //const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);  // Expira en 7 días

       return {
        token,
       refreshToken,
        user
       }

    }

    
}
}

export default userResolvers;