import userResolvers from './userResolver.js';
import productResolver from './productResolver.js';

const resolvers = {
    Query:{
        ...userResolvers.Query,
        ...productResolver.Query
    },
    Mutation:{
        ...userResolvers.Mutation,
        ...productResolver.Mutation
    }
}
export default resolvers