import rolesPermissionsModel from "../models/rolesPermissions.js";


const checkPermission = (requiredPermission)=>{
    return async (context)=>{
        const {user} = context
//console.log(user)
        if(!user){
        throw new Error('Not authenticated');
        }


           
    const userRole = user.role
        const permissions = await rolesPermissionsModel.getPermissionsByRoleId(userRole)
    //    console.log(permissions)

        if(!permissions){
            throw new Error('User does not have any permissions');
        }

        const hasPermission = permissions.find((permission) => permission.name === requiredPermission);
        if(!hasPermission){
            throw new Error(`User does not have the ${requiredPermission} permission`);
            }
            
    }

}


export default checkPermission;