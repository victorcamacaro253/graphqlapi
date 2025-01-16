import { query } from "../config/db.js";

class categoryModel{

    static async getAllCategories(){
        const queryStr = "SELECT * FROM categories";
        const result = await query(queryStr);
        return result;

    }

    static async getCategoryById(id){
        const queryStr = "SELECT * FROM categories WHERE id = ?";
        const result = await query(queryStr, [id]);
        return result[0];
        }

        static async getCategoryByName(name){
            const queryStr = "SELECT * FROM categories WHERE name = ?";
            const result = await query(queryStr, [name]);
            return result[0];
        }

     static async createCategory(name,description){
        const queryStr = "INSERT INTO categories (name,description) VALUES (?,?)";
        const result = await query(queryStr, [name,description]);
        return {result,
            name,
            description
        };
     }   
     static async updateCategory (id,updateFields){
        try {
      
            if(Object.keys(updateFields).length ===0){
                throw new Error ('No fields provided to update')
            }
      
                const queryStr = "UPDATE categories SET ? WHERE id = ?";
      
                const result = await query(queryStr, [updateFields, id]);
      
                if(result.affectedRows > 0){
                    return {id,...updateFields}
                }else{
                    throw new Error ('No product found or no  change was made ')
                }
            
        } catch (error) {
            throw new Error ('Error updating product' + error.message)
            
        }
        
      }

      static async deleteCategory(id){
        try {
            const queryStr = "DELETE FROM categories WHERE id = ?";
            const result = await query(queryStr, [id]);
            if(result.affectedRows > 0){
                return {id}
                }else{
                    throw new Error ('No product found ')
                    }
                    } catch (error) {
                        throw new Error ('Error deleting product' + error.message)
                        }
                        }

     
}

export default categoryModel;