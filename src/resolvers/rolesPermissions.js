import rolesPermissionsModel from "../models/rolesPermissions.js";


const rolesPermissionsResolver = {
    Query: {
        rolesPermissions: async ()=>{
            try {
                const rolesPermission = await rolesPermissionsModel. getAllRolesPermissions()
                return rolesPermission
            } catch (error) {
                console.log(error)
                throw new Error( error.message)

                }
                
            }
         
            },
            Mutation: {
            }

}



export default rolesPermissionsResolver