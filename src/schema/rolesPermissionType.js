import { gql } from "apollo-server-express";

const rolesPermissionType = gql`

type Role {
id:Int,
name: String 
description: String 
createdAt : String
permissions: [Permission]
}

type Permission {
id:Int 
name: String
description: String
createdAt: String
}

type RolePermissions {
Role_id:Int 
Role: String
Permissions: String
}


type Query {
getAllRoles: [Role]
getRoleById(id: Int!): Role
getRoleByName(name: String) : Role 

getAllPermissions : [Permission]
getPermissionById(id: Int) : Permission

rolesPermissions : [RolePermissions]

}


type Mutation {
 createRole(name:String!,description: String): Role
 updateRole(id:Int!,name: String,description:String): Role
 deleteRole(id:Int) : Role

 createPermission(name:String,description:String) : Role
 updatePermission(id:Int!,name:String,description:String): Role
 deletePermission(id:Int): Permission

}




`


export default rolesPermissionType;