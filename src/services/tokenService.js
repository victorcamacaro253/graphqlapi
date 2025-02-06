import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const generateToken = (UserId, email, role,expiresIn) => {
const payload= {id: UserId,email: email,role: role}
const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: expiresIn });
return token

}

const verifyToken=(token)=>{
     try{ 

  const decode = jwt.verify(token, process.env.JWT_SECRET);
  return decode.id; //Retorna el id del usuario 
}catch(error){
    return null  
  }

}



export default {generateToken,verifyToken}