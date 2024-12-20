import userResolvers from './userResolver.js';

const resolvers = {
    Query:{
        ...userResolvers.Query
    },
    Mutation:{
        ...userResolvers.Mutation
    }
}
export default resolvers