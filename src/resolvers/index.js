import userResolvers from './userResolver.js';
import productResolver from './productResolver.js';
import purchaseResolver from './purchaseResolver.js';
import categoryResolver from './categoryResolver.js';
import rolesPermissions from './rolesPermissions.js';

const resolvers = {
    Query:{
        ...userResolvers.Query,
        ...productResolver.Query,
        ...purchaseResolver.Query,
        ...categoryResolver.Query,
        ...rolesPermissions.Query
    },
    Mutation:{
        ...userResolvers.Mutation,
        ...productResolver.Mutation,
        ...purchaseResolver.Mutation,
        ...categoryResolver.Mutation,
        ...rolesPermissions.Mutation
    }
}
export default resolvers