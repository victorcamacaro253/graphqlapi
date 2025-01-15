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
     
}

export default categoryModel;