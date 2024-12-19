import { gql } from 'apollo-server-express';

const userType = gql`
  type user {
    user_id: ID!         # El campo user_id es obligatorio (non-nullable)
    fullname: String
    email: String,,
    personal_ID:String
    createdAt:String
  }

  # Nuevo tipo para la respuesta de login
  type AuthPayload {
    token: String!    # El token JWT generado
    user: user        # El usuario correspondiente
  }


  type Query {
    users: [user]
    user(user_id: ID!): user  # Consulta para obtener un usuario por su user_id
  }

  type Mutation {
    createUser(fullname: String!,username:String, email: String,password:String,personal_ID:String,role:Int): user  # Mutación para crear un usuario
    updateUser(user_id:ID!,fullname:String,username:String,email:String): user
    deleteUser(user_id:ID!) : Boolean
    login(email:String!,password:String!): AuthPayload 
  }
`;

export default userType;
