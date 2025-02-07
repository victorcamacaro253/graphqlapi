import userResolvers from './userResolver.js';
import productResolver from './productResolver.js';
import purchaseResolver from './purchaseResolver.js';
import categoryResolver from './categoryResolver.js';
import rolesPermissions from './rolesPermissions.js';
import authResolver from './authResolver.js';
import exportResolver from './exportResolver.js';

const resolvers = {
    Query:{
        ...userResolvers.Query,
        ...productResolver.Query,
        ...purchaseResolver.Query,
        ...categoryResolver.Query,
        ...rolesPermissions.Query,
        ...authResolver.Query,
        ...exportResolver.Query,
    },
    Mutation:{
        ...userResolvers.Mutation,
        ...productResolver.Mutation,
        ...purchaseResolver.Mutation,
        ...categoryResolver.Mutation,
        ...rolesPermissions.Mutation,
        ...authResolver.Mutation,
        ...exportResolver.Mutation
    }
}
export default resolvers