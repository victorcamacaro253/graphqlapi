import purchaseModel from "../models/purchaseModel.js";
import productModel from "../models/productModel.js";
import { pool } from "../config/db.js";


const purchaseResolver = {
    Query: {
      getAllPurchases: async () => {
        try {
          // Fetch all purchase data (including user data)
          const purchases = await purchaseModel.getAllPurchases();
          console.log('Purchases data:', purchases);
  
          // Group the purchases by purchase_id
          const groupPurchases = purchases.reduce((acc, row) => {
            const {
              purchase_id,
              date,
              total_purchase,
              user_id,
              fullname,
              personal_ID,
              email,
              product_id,
              name,
              amount,
              price,
            } = row;
  
            // Check if this purchase_id already exists in the accumulator
            if (!acc[purchase_id]) {
              acc[purchase_id] = {
                purchase_id,
                date,
                total_purchase,
                user: {
                  user_id,
                  fullname,
                  personal_ID,
                  email,
                },
                products: [],
              };
            }
  
            // Add the product to the products array if it exists
            if (product_id && name && price) {
              acc[purchase_id].products.push({
                product_id,
                name,
                amount,
                price,
              });
            } else {
              console.log(`Missing product data for purchase_id: ${purchase_id}`);
            }
  
            return acc;
          }, {});
  
          // Debugging: log grouped purchases
          console.log('Grouped Purchases with User Info:', groupPurchases);
  
          // Return the grouped purchases as an array
          return Object.values(groupPurchases);
        } catch (error) {
          console.error('Error fetching purchases:', error);
          throw new Error('Error getting purchases: ' + error.message);
        }
      },

      getPurchaseById: async (_, { purchase_id }) => {
        try {
          const purchase = await purchaseModel.getPurchaseById(purchase_id);
          if (!purchase || purchase.length === 0) {
            throw new Error(`Purchase with ID ${purchase_id} not found`);
          }
  
          // Similar a la agrupación en getAllPurchases
          const groupedPurchase = purchase.reduce((acc, row) => {
            const {
              purchase_id,
              date,
              total_purchase,
              user_id,
              fullname,
              personal_ID,
              email,
              product_id,
              name,
              amount,
              price,
            } = row;
  
            if (!acc) {
              acc = {
                purchase_id,
                date,
                total_purchase,
                user: {
                  user_id,
                  fullname,
                  personal_ID,
                  email,
                },
                products: [],
              };
            }
  
            if (product_id && name && price) {
              acc.products.push({
                product_id,
                name,
                amount,
                price,
              });
            }
  
            return acc;
          }, null);
  
          return groupedPurchase;
        } catch (error) {
          console.error('Error fetching purchase by ID:', error);
          throw new Error('Error getting purchase by ID: ' + error.message);
        }
      },
  
      getPurchasesByUserId: async (_, { user_id }) => {
        try {
          const purchases = await purchaseModel.getPurchaseByUserId(user_id);
          if (!purchases || purchases.length === 0) {
            throw new Error(`No purchases found for user ID ${user_id}`);
          }
  
          const groupedPurchases = purchases.reduce((acc, row) => {
            const {
              purchase_id,
              date,
              total_purchase,
              user_id,
              fullname,
              personal_ID,
              email,
              product_id,
              name,
              amount,
              price,
            } = row;
  
            if (!acc[purchase_id]) {
              acc[purchase_id] = {
                purchase_id,
                date,
                total_purchase,
                user: {
                  user_id,
                  fullname,
                  personal_ID,
                  email,
                },
                products: [],
              };
            }
  
            if (product_id && name && price) {
              acc[purchase_id].products.push({
                product_id,
                name,
                amount,
                price,
              });
            }
  
            return acc;
          }, {});
  
          return Object.values(groupedPurchases);
        } catch (error) {
          console.error('Error fetching purchases by user ID:', error);
          throw new Error('Error getting purchases by user ID: ' + error.message);
        }
      },

  },
  Mutation:{
    

    createPurchase: async  (_,{userId,products})=>{
        if(!userId ||  !products){
            throw new new Error('User ID and products are required to create a purchase');
        }

        let total_purchase = 0

        for(const product of products){
            const {product_id,price,quantity}= product
            if(!product_id || !price || !quantity){
                throw new Error('Product ID, price, and quantity are required to create a purchase')
        }
        total_purchase += price * quantity
      }

      const connection = await pool.getConnection()
      await connection.beginTransaction()

      try{
        const insertProducts=[]

        for (const product of products) {
            const { product_id, quantity } = product
            const stock = await productModel.getProductStock(connection,product_id)

            if(stock < quantity){
                await connection.rollback()
                throw new Error('Not enough stock for product')
            }
            insertProducts.push(product)
      }

      const purchaseId = await purchaseModel.createPurchase(connection,userId,total_purchase)
      console.log(purchaseId)
      await purchaseModel.createPurchasedProduct(connection,purchaseId,insertProducts)

      for(const product of insertProducts){
        const {product_id,quantity}= product
       // console.log(product_id)
        const stock = await productModel.getProductStock(connection,product_id)
      //  console.log(stock)
       const newStock = stock- quantity
     //  console.log(newStock)
       await productModel.updateProductStock(connection,product_id,newStock)

      }
      await connection.commit()

      for (const product of insertProducts){
        const { product_id, quantity } = product
        await productModel.updateTopSellingProducts(product_id,quantity)
        
      }

      console.log(purchaseId)

      return {message : 'Purchase created successfully',purchase_id:purchaseId}

    }catch(error){
        await connection.rollback()
        console.log(error)
        throw new Error ('Error creating purchase'+ error.message)
    }finally{
        connection.release()
    }
}

  }
};

  export default purchaseResolver