import userResolvers from './userResolver.js';
import productResolver from './productResolver.js';
import purchaseResolver from './purchaseResolver.js';
import categoryResolver from './categoryResolver.js';

const resolvers = {
    Query:{
        ...userResolvers.Query,
        ...productResolver.Query,
        ...purchaseResolver.Query,
        ...categoryResolver.Query
    },
    Mutation:{
        ...userResolvers.Mutation,
        ...productResolver.Mutation,
        ...purchaseResolver.Mutation,
        ...categoryResolver.Mutation
    }
}
export default resolvers