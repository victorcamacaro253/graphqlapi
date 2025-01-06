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
                    const queryStr = "SSELECT * FROM purchased_products pp JOIN purchases p ON pp.purchase_id=p.purchase_id JOIN products sp ON pp.product_id=sp.product_id JOIN  users u ON p.user_id=u.user_id WHERE u.user_id = ?";
                    const result = await query(queryStr, [id]);
                    return result;
                    } catch (error) {
                        console.log(error);
                        throw new Error('Error ' + error.message);
                        }
                    
            }
}

export default purchaseModel