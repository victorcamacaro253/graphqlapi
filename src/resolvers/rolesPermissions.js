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
                
            },

            getAllRoles: async ()=>{
                try {
                    const roles = await rolesPermissionsModel.getAllRoles()
                    return roles
                    } catch (error) {
                        console.log(error)
                        throw new Error( error.message)
                        }
         
            },
            getRoleById: async (_,{id}) => {
                try {
                    const role = await rolesPermissionsModel.getRoleById(id)
                    console.log(role)
                    if(!role){
                        throw new Error('Role not found')
                    }
                    return role
                    } catch (error) {
                        console.log(error)
                        throw new Error( error.message)
                        }
                        },
                        
                        getRoleByName:async(_,{name})=>{
                            try {
                                const role = await rolesPermissionsModel.getRoleByName(name)
                                if(!role){
                                    throw new Error('Role not found')
                                    }
                                    return role
                                    } catch (error) {
                                        console.log(error)
                                        throw new Error( error.message)
                                        }
                        },
                        getAllPermissions: async ()=>{
                            try {
                                const permissions = await rolesPermissionsModel.getAllPermissions()
                                return permissions
                                } catch (error) {
                                    console.log(error)
                                    throw new Error( error.message)
                                    }
                                    
                    },
                },

            Mutation: {
                createRole: async (_,{name,description}) => {
                    try {
                        const role = await rolesPermissionsModel.createRole(name,description)
                        if(!role){
                            throw new Error('Role not created')
                        }
                        return role
                        } catch (error) {
                            console.log(error)
                            throw new Error( error.message)
                            }
                            },
                            updateRole:async(_,{id,input})=>{
                                try {
                                    const updateFields={}

                                    if(input.name){
                                        updateFields.name = input.name
                                    }
                                    
                                    if(input.description){
                                        updateFields.description = input.description
                                        }
                                        const role = await rolesPermissionsModel.updateRole(id,updateFields)
                                        if(!role){
                                            throw new Error('Role not updated')
                                            }
                                            return role
                                            } catch (error) {
                                                console.log(error)
                                                throw new Error( error.message)
                                                }
                                            },
                                            deleteRole:async(_,{id})=>{
                                                try {
                                                    const role = await rolesPermissionsModel.deleteRole(id)
                                                    if(!role){
                                                        throw new Error('Role not deleted')
                                                        }
                                                        return role
                                                        } catch (error) {
                                                            console.log(error)
                                                            throw new Error( error.message)
                                                            }

            } ,
            createPermission: async (_,{name,description}) => {
                try {
                    const permission = await rolesPermissionsModel.createPermission(name,description)
                    if(!permission){
                        throw new Error('Permission not created')
                        }
                        return permission
                        } catch (error) {
                            console.log(error)
                            throw new Error( error.message)
                            }
        },
        updatePermission:async(_,{id,input})=>{
            try {
                const updateFields={}
                if(input.name){
                    updateFields.name = input.name
                    }

                    if(input.description){
                        updateFields.description = input.description
                    }
                    const permission = await rolesPermissionsModel.updatePermission(id,updateFields)
                    if(!permission){
                        throw new Error('Permission not updated')
                        }
                        return permission
                        } catch (error) {
                            console.log(error)
                            throw new Error( error.message)
                            }
    },
    deletePermission:async(_,{id})=>{
        try {
            const permission = await rolesPermissionsModel.deletePermission(id)
            if(!permission){
                throw new Error('Permission not deleted')
                }
                return permission
                } catch (error) {
                    console.log(error)
                    throw new Error( error.message)
                    }
                    },
                    

}

}

export default rolesPermissionsResolver