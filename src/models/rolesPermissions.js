import {query} from  '../config/db.js';

class rolesPermissionsModel{
   
      static  async getAllRoles(){
            try{
                const result = await query(`SELECT * FROM roles`)
                return result
                }catch(error){
                    throw new Error(error)
          }

      }


      static async getRoleById(id){
        try{
            const [result] = await query(`SELECT * FROM roles WHERE id = ?`, [id])
            return result
            }catch(error){
                throw new Error(error)

                }
                
      }

      static async getPermissionsByRoleId(roleId) {
        try {
            const sql = `
                SELECT p.id, p.name, p.description
                FROM permissions p
                JOIN roles_permissions rp ON rp.permission_id = p.id
                WHERE rp.role_id = ?
            `;
            const result = await query(sql, [roleId]);
            return result;
        } catch (error) {
            throw new Error(error);
        }
    }
    

      static async getRoleByName(name){
        try{
            const [result] = await query(`SELECT * FROM roles WHERE name = ?`, [name])
            return result
            }catch(error){
                throw new Error(error)

                }
                }

                static async createRole(name,description){
                    try{
                        const result = await query('INSERT INTO roles (rol,descripcion,createdAt) VALUES(?,?,NOW())',[ name,description]);
                        return result
                        }catch(error){
                            throw new Error(error)
                            }

                }


               static async updateRole(id,updateFields){
                try{
                    const result = await query('UPDATE roles SET ? WHERE id = ?', [updateFields,id])
                    return result
                    }catch(error){
                        throw new Error(error)
                        }
                        }

                        static async deleteRole(id){
                            try{
                                const result = await query('DELETE FROM roles WHERE id = ?', [id])
                                return result
                                }catch(error){
                                    throw new Error(error)
                                    }
                                    
                        }


                        static async getAllPermissions(){
                            try{
                                const result = await query('SELECT * FROM permissions')
                                return result
                                }catch(error){
                                    throw new Error(error)
                                    }

                        }


                        static async getPermissionById(id){
                            try{
                                const result = await query('SELECT * FROM permissions WHERE id = ?', [id])
                                return result
                                }catch(error){
                                    throw new Error(error)
                                    }
                                    }


                                    static async createPermission(name,description){
                                        try{
                                            

                                            const result = await query('INSERT INTO permissions (name,description,createdAt) VALUES(?,?,NOW())',[name,description])
                                            return result
                                            }catch(error){
                                                throw new Error(error)

                                                }

                                                }

                                          static async updatePermissions(id,updateFields){
                                            try{
                                                const result = await query('UPDATE permissions SET ? WHERE id = ?', [updateFields,id])
                                                return result
                                                }catch(error){
                                                    throw new Error(error)
                                                    }

                                          }      

                                          static async deletePermission(id){
                                            try{
                                                const result = await query('DELETE FROM permissions WHERE id = ?', [id])
                                                return result
                                                }catch(error){
                                                    throw new Error(error)
                                                    }
                                                }

                                                

                                              static async getAllRolesPermissions(){
                                                try{
                                                    const sql= `SELECT r.id as Role_id,.r.name as Role ,GROUP_CONCAT(p.name SEPARATOR ', ') as Permissions
                                                FROM roles_permissions rp JOIN roles r ON rp.role_id=r.id JOIN permissions p ON rp.permission_id=p.id
                                                GROUP BY r.id, r.name ORDER BY r.id`

                                             const result = await query(sql)
                     return result
                     }catch(error){
                        throw new Error(error)

                            }  
                                                

    }
}

    export default rolesPermissionsModel