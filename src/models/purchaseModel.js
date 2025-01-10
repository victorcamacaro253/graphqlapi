import { query } from "../config/db.js";


class purchaseModel{

   static async getAllPurchases(){
    
    try {
        const queryStr= "SELECT * FROM purchased_products pp JOIN purchases p ON pp.purchase_id=p.purchase_id JOIN products sp ON pp.product_id=sp.product_id JOIN  users u ON p.user_id=u.user_id";
       const result = await query(queryStr);
       return result;
       } catch (error) {
        console.log(error);
        throw new Error('Error ' + error.message);
        }

    }

    static async getPurchaseById(id){
        try {
            const queryStr = "SELECT * FROM purchased_products pp JOIN purchases p ON pp.purchase_id=p.purchase_id JOIN products sp ON pp.product_id=sp.product_id JOIN  users u ON p.user_id=u.user_id WHERE pp.purchase_id = ?";
            const result = await query(queryStr, [id]);
            return result;
            } catch (error) {
                console.log(error);
                throw new Error('Error ' + error.message);
                }


            }


            static async getPurchaseByUserId(id){
                try {
                    const queryStr = "SELECT * FROM purchased_products pp JOIN purchases p ON pp.purchase_id=p.purchase_id JOIN products sp ON pp.product_id=sp.product_id JOIN  users u ON p.user_id=u.user_id WHERE u.user_id = ?";
                    const result = await query(queryStr, [id]);
                    return result;
                    } catch (error) {
                        console.log(error);
                        throw new Error('Error ' + error.message);
                        }
                    
            }

            static async getPurchaseByUsername(username){
                try {
                    const queryStr = "SELECT * FROM purchased_products pp JOIN purchases p ON pp.purchase_id=p.purchase_id JOIN products sp ON pp.product_id=sp.product_id JOIN  users u ON p.user_id=u.user_id WHERE u.username = ?";
                    const result = await query(queryStr, [username]);
                    return result;
                    } catch (error) {
                        console.log(error);
                        throw new Error('Error ' + error.message);
                        }
                    
            }

            static async getPurchasesByDateRange(startDate,endDate){
                try {
                    const queryStr = "SELECT * FROM purchased_products pp JOIN purchases p ON pp.purchase_id=p.purchase_id JOIN products sp ON pp.product_id=sp.product_id JOIN  users u ON p.user_id=u.user_id WHERE p.date BETWEEN ? AND ?";
                    const result = await query(queryStr, [startDate,endDate]);
                    return result;

                    
                } catch (error) {
                    console.log(error);
                    throw new Error('Error ' + error.message);
                }

            }

            static async getPurchasedProducts(purchase_id){
                const querStr= "SELECT * FROM purchased_products WHERE purchase_id=?"
                const result = await query(querStr, [purchase_id]);
                return result;
            }
    


      static async createPurchase(connection,userId,total_purchase){
        const [result] = await connection.query('INSERT INTO purchases (user_id,total_purchase,date) VALUES (?,?,NOW())',[userId,total_purchase]); 
        return result.insertId;
    }

    static async createPurchasedProduct(connection,purchaseId,insertProducts){
        const query = "INSERT INTO purchased_products (purchase_id,product_id,amount,price) VALUES ?";
        const values = insertProducts.map((product) => [purchaseId, product.product_id,product.quantity,product.price])
        const result = await connection.query(query, [values]);
        return result;
    }


    static async getPurchasesByUserDate(user_id,startDate,endDate){
        const queryStr = "SELECT * FROM purchased_products pp JOIN purchases p ON pp.purchase_id=p.purchase_id JOIN products sp ON pp.product_id=sp.product_id JOIN  users u ON p.user_id=u.user_id WHERE u.user_id = ? AND p.date BETWEEN ? AND ?";
        const result = await query(queryStr, [user_id,startDate,endDate]);
        return result;


    }


    static async deletePurchase(purchase_id){
        const queryStr = "DELETE FROM purchases WHERE purchase_id = ?";
        const result = await query(queryStr, [purchase_id]);
        return result;
    }



    static async deletePurchasedProduct(purchase_id,product_id){
        const queryStr = "DELETE FROM purchased_products WHERE purchase_id = ? AND product_id = ?";
        const result = await query(queryStr, [purchase_id,product_id]);
        return result;
        }
}

export default purchaseModel