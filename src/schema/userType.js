import { gql } from 'apollo-server-express';

const userType = gql`
  type user {
    user_id: ID!         # El campo user_id es obligatorio (non-nullable)
    fullname: String
    email: String,
    personal_ID:String
    createdAt:String
  }

  # Nuevo tipo para la respuesta de login
  type AuthPayload {  
    token: String!    # El token JWT generado
    refreshToken:String
    user: user        # El usuario correspondiente

   
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


  type Query {
    getAllusers: [user]
    getFilteredUsers(filter:UserFilterInput): [user]
    getUserByEmail(email:String) : [user]
    getPaginatedUsers(limit:Int,offset:Int): [user]
    user(user_id: ID!): user  # Consulta para obtener un usuario por su user_id
  }

  type Mutation {
    createUser(fullname: String!,username:String, email: String,password:String,personal_ID:String,role:Int): user  # Mutación para crear un usuario
    createMultipleUsers(users:[UserInput]!): Int
    updateUser(user_id:ID!,fullname:String,username:String,email:String): user
    deleteUser(user_id:ID!) : Boolean
    login(email:String!,password:String!): AuthPayload 
  }
`;

export default userType;
