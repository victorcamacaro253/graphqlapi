import { query } from "../config/db.js";

class productModel {

    static async getAllProducts() {
        const queryStr = "SELECT * FROM product_stock JOIN products ON product_stock.product_id = products.product_id";
        const result = await query(queryStr);
        return result;
        }


        static async getProductById(id){
            
            const queryStr = "SELECT * FROM product_stock JOIN products ON product_stock.product_id = products.product_id WHERE products.product_id = ?";
            const result = await query(queryStr, [id]);
            return result [0];
            
        }

        static async getProductByName(product){
            console.log(product)
            const queryStr = "SELECT * FROM product_stock JOIN products ON product_stock.product_id = products.product_id WHERE products.name LIKE ?";
            const result = await query(queryStr, ['%'+product+'%']);
            return result;
        }

        static async createProduct(code,name,price,description,category_id,supplier_id,status){
            const queryStr = "INSERT INTO products SET ?";
            const result = await query(queryStr, [{
                code:code,
                name:name,
                price:price,
                description:description,
                category_id:category_id,
                supplier_id:supplier_id,
                status:status
                }]);
                return result;
                

        }

        static async createProductStock(product,stock){
        const queryStr = "INSERT INTO product_stock SET ?";
        const result = await query(queryStr, [{
            product_id:product,
            stock:stock
            }]);
            return result;
        }


}

export default productModel;