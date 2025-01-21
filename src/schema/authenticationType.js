import { gql} from 'apollo-server-express';

const authenticationType = gql`

     type user {
    user_id: ID!         # El campo user_id es obligatorio (non-nullable)
    fullname: String
    username: String
    email: String,
    personal_ID:String
    createdAt:String
  }

   
  type AuthPayload {  
    token: String    
    refreshToken:String
    user: user        
  }

  type message{
  message:String!
  }


  type Mutation{
  login(email:String!,password:String!): AuthPayload 
  logout : message
  }

`

export default authenticationType;