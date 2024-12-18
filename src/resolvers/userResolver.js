import userModel from '../models/userModel.js'

const resolvers = {
    Query:{
        users: ()=> userModel.getUsers(),
        user:(_,{id})=> userModel.getUserById(id)
    },
    Mutation:{
        createUser :(_,{name,email,password})=> userModel.createUser(name,email,password),
    }
}

export default resolvers