import { query } from "../config/db.js";

class categoryModel{

    static async getCategories(){
        const queryStr = "SELECT * FROM categories";
        const result = await query(queryStr);
        return result;

    }
}

export default categoryModel;