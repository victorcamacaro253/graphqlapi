import jwt from 'jsonwebtoken'


const generateToken = (UserId, email, role,expiresIn) => {
const payload= {id: UserId,email: email,rol: role}
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