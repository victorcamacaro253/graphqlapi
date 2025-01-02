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

        static async getProductsByCategory(category){
            const queryStr = "SELECT * FROM product_stock ps JOIN products p ON ps.product_id=p.product_id JOIN categories c ON p.category_id=c.id WHERE c.name = ?";
            const result = await query(queryStr, [category]);
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


        static async updateProduct (product_id,updateFields){
            try {

                if(Object.keys(updateFields).length ===0){
                    throw new Error ('No fields provided to update')
                }

                    const queryStr = "UPDATE products SET ? WHERE product_id = ?";

                    const result = await query(queryStr, [updateFields, product_id]);

                    if(result.affectedRows > 0){
                        return {product_id,...updateFields}
                    }else{
                        throw new Error ('No product found or no  change was made ')
                    }
                
            } catch (error) {
                throw new Error ('Error updating product' + error.message)
                
            }
            
        }

        static async deleteProduct(product_id){
            try {

                const queryStr1 = "DELETE FROM product_stock WHERE product_id = ?";
                const result1= await query(queryStr1, [product_id]);

                const queryStr = "DELETE FROM products WHERE product_id = ?";
                const result = await query(queryStr, [product_id]);
                if(result.affectedRows > 0){
                    return {product_id}
                    }else{
                        throw new Error ('No product found ')
                        }
                        } catch (error) {
                            throw new Error ('Error deleting product' + error.message)
                            }

        }





}

export default productModel;