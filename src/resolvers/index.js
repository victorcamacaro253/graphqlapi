import userResolvers from './userResolver.js';
import productResolver from './productResolver.js';
import purchaseResolver from './purchaseResolver.js';

const resolvers = {
    Query:{
        ...userResolvers.Query,
        ...productResolver.Query,
        ...purchaseResolver.Query
    },
    Mutation:{
        ...userResolvers.Mutation,
        ...productResolver.Mutation,
        ...purchaseResolver.Mutation
    }
}
export default resolvers