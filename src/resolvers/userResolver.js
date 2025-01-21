import userModel from '../models/userModel.js'
import {hash,compare} from 'bcrypt'
import tokenService from '../services/tokenService.js';
import { randomBytes } from 'crypto';
import tokenModel from '../models/tokenModel.js';

const userResolvers = {
    Query: {
        getAllusers: async () => {
           /* if(!user){
                throw new Error('No authenticated')
            }*/
            return await userModel.getUsers()
        },
        getFilteredUsers:async (_,{filter})=>{
            try {
                const users = await userModel.getUsers(filter)
                return users
            } catch (error) {
                throw new Error('Error fetching filtered users' + error.message)
            }
        },
        getUserByEmail : async (_, {email}) => {
            try {
                const user = await userModel.getUserByEmail(email)
                return user
                } catch (error) {
                    throw new Error('Error fetching user by email' + error.message)
                    }
                    
                    },
        getPaginatedUsers: async (_, {limit=10, page=1}) => {
            try {
                // console.log(limit,offset)
                const offset = (page - 1) * limit; 
                const users = await userModel.getPaginatedUsers(limit, offset)
              //  console.log(users)
                return users
                } catch (error) {
                    throw new Error('Error fetching paginated users' + error.message)
                    }
                    },

        
        user: async (_, { user_id }) => {
            const user = await userModel.getUserById(user_id);
            if (!user) {
                throw new Error(`User  with ID ${user_id} not found`);
            }
            console.log(user)
            return user;
        },

        getUserLoginHistory: async (_, { user_id }) => {

            const user = await userModel.getUserLoginHistory(user_id);
            console.log(user)

            if (!user) {
                throw new Error(`User  with ID ${user_id} not found`);
                }
                console.log(user)
                const userData = user.map(({user_id,fullname,username,email})=>({
                    user_id,fullname,username,email
                }))
        
               const history = user.map(({date,code})=>({
                date: new Date(date).toLocaleString(), // Convert to a friendly date format
                code
               }))
        
        
        console.log(userData)
        
              
                 return {   historial:history,
                    total_ingresos: history.length,
                    usuario:userData[0]
                 }
               
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

        updateUser:async (_,{user_id,input})=>{
            try {
                const updateFields={}
                if (input.fullname) {
                    updateFields.fullname = input.fullname
                    }
                    if (input.username) {
                        updateFields.username = input.username
                        }
                        if (input.email) {
                            updateFields.email = input.email
                            }
                            if (input.password) {
                                if (input.password.length < 7) {
                                    throw new Error( 'La contraseña debe tener al menos 7 caracteres' );
                                    }
                                    const hashedPassword =await  hash(input.password,10)
                                    updateFields.password = hashedPassword
                                    }
                                    if (input.personal_ID) {
                                        const existingUser= await userModel.getUserByPersonalID(input.personal_ID)
                                        if (existingUser) {
                                            throw new Error('User with the provided email or username already exists');
                                            }
                                            updateFields.personal_ID = input.personal_ID
                                            }
                                            if (input.role) {
                                                updateFields.role = input.role
                                                }
                                                const updatedUser = await userModel.updateUser(user_id, updateFields)
                                                return updatedUser
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

  /*  login :async (_,{email,password},{res})=>{
    console.log(email,password)
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
       res.cookie('refreshToken', refreshToken, {
            httpOnly: true, // No accesible por JavaScript en el navegador
            secure: process.env.NODE_ENV === 'production', // Solo en producción
            sameSite: 'Strict', // Protección contra CSRF
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 días en milisegundos
        });


         // Generar un código aleatorio
         const randomCode = randomBytes(8).toString('hex'); // Genera un código aleatorio de 8 caracteres

         // Insertar registro de inicio de sesión en la base de datos
         userModel.insertLoginRecord(user.user_id, randomCode)

       return {
        token,
       refreshToken,
        user
       }

    },*/
createMultipleUsers: async (_, { users }) => {
  try {
    // Hasheamos las contraseñas y asignamos el valor por defecto de 'status' si no se pasa uno
    const usersWithHashedPasswords = await Promise.all(
      users.map(async user => {
        const hashedPassword = await hash(user.password, 10);
        return {
          ...user,
          password: hashedPassword,
          status: user.status || 'activo' // Asignamos el valor por defecto 'activo' si no se pasa 'status'
        };
      })
    );

    // Ahora insertamos los usuarios con los datos correctamente preparados
    const result = await userModel.createMultipleUsers(usersWithHashedPasswords);

    return result;
  } catch (error) {
    throw new Error('Error creating multiple users: ' + error.message);
  }
},

/*
loginUser: async(_,{email,password},{res})=>{
    
    try{
        console.log('victor',email,password)
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
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true, // No accesible por JavaScript en el navegador
        secure: process.env.NODE_ENV === 'production', // Solo en producción
        sameSite: 'Strict', // Protección contra CSRF
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 días en milisegundos
    });


     // Generar un código aleatorio
     const randomCode = randomBytes(8).toString('hex'); // Genera un código aleatorio de 8 caracteres

     // Insertar registro de inicio de sesión en la base de datos
     userModel.insertLoginRecord(user.user_id, randomCode)

   return {
    token,
   refreshToken,
    user
   }
}catch(error){
    console.log(error)
    throw new Error('Invalid credentials')
}

}

*/

    }
}


export default userResolvers;