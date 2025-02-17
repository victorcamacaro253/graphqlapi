import { gql } from 'apollo-server-express';


const userType = gql`
  scalar Upload

  type user {
    user_id: ID!         # El campo user_id es obligatorio (non-nullable)
    fullname: String
    username: String
    email: String,
    personal_ID:String
    createdAt:String
    image: String
  }
    # Input Type for Update User
input UpdateUserInput {
  fullname: String
  username: String
  email: String
  password: String
  personal_ID: String
  role: Int
}

  type loginHistory{
  id: ID! ,
  user_id: ID ,
  fullname: String
  username: String
    email: String,
    personal_ID:String,
  date: String ,
  code: String
  }

  type LoginHistoryResponse {
  historial: [loginHistory]
  total_ingresos: Int
  usuario: loginHistory
}

 
  type AuthPayload {  
    token: String    
    refreshToken:String
    user: user        

   
  }

  input UserFilterInput {
  fullname:String,
  email:String,
  role:Int,
  personal_ID:String
  }

  input UserInput { 
    fullname: String!
    username:String
    email: String!
    personal_ID: String!
    password: String!
    role: Int!
    status: String  # status es opcional
  }

   # Input type for password reset
  input ResetPasswordInput {
    token: String!
    newPassword: String!
  }

  

  type Query {
    getAllusers: [user]
    getFilteredUsers(filter:UserFilterInput): [user]
    getUserByEmail(email:String) : [user]
    getPaginatedUsers(limit:Int,offset:Int): [user]
    user(user_id: ID!): user  # Consulta para obtener un usuario por su user_id,
    getUserLoginHistory(user_id:ID!) : LoginHistoryResponse
  }

  type Mutation {
    createUser(fullname: String!,username:String, email: String,password:String,personal_ID:String,role:Int,image:String): user  # Mutación para crear un usuario
    createMultipleUsers(users:[UserInput]!): Int
    updateUser(user_id: ID!, input: UpdateUserInput!): user
    deleteUser(user_id:ID!) : Boolean
    requestPasswordReset(email: String!): String  # Mutation for requesting password reset
    resetPassword(input: ResetPasswordInput!): String  # Mutation for resetting password
    
     

  }
`;

export default userType;
