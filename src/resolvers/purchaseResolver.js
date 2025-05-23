import purchaseModel from "../models/purchaseModel.js";
import productModel from "../models/productModel.js";
import { pool } from "../config/db.js";
import { groupPurchases,groupPurchase,groupPurchasesByUser } from '../utils/groupPurchases.js';


const purchaseResolver = {
    Query: {
      getAllPurchases: async () => {
        try {
          const purchases = await purchaseModel.getAllPurchases();
          console.log('Purchases data:', purchases);
  
          // Use the helper function to group purchases
          const groupedPurchases = groupPurchases(purchases);
  
          console.log('Grouped Purchases with User Info:', groupedPurchases);
  
          return Object.values(groupedPurchases);
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
  
          const groupedPurchases = groupPurchase(purchase);
  
          return groupedPurchases;
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
      
          // Extract user data from the first purchase (assuming all purchases are by the same user)
          const { user_id: id, fullname, personal_ID, email } = purchases[0]; // All purchases have the same user data
      
          const groupedPurchases = groupPurchasesByUser(purchases)
        
      
          // Return the response with user data and the grouped purchases
          return {
            user: {
              user_id: id,
              fullname,
              personal_ID,
              email,
            },
            purchases: Object.values(groupedPurchases), // This ensures the response is an array of purchases
          };
        } catch (error) {
          console.error('Error fetching purchases by user ID:', error);
          throw new Error('Error getting purchases by user ID: ' + error.message);
        }
      },
      
      
      getPurchasesByUsername: async(_,{username})=>{
        try {

          const purchases = await purchaseModel.getPurchaseByUsername(username)

          if (!purchases || purchases.length === 0) {
            throw new Error(`No purchases found for username ${username}`);
          }
           
          // Extract user data from the first purchase (assuming all purchases are by the same user)
          const { user_id: id, fullname, personal_ID, email } = purchases[0]; // All purchases have the same user data
      
          const groupedPurchases = groupPurchasesByUser(purchases)
        
          return {
            user: {
              user_id: id,
              fullname,
              personal_ID,
              email,
            },
            purchases: Object.values(groupedPurchases), // This ensures the response is an array of purchases
          };


      }catch(error){
        console.error('Error fetching purchases by username:', error);
          throw new Error('Error getting purchases by username: ' + error.message);
      }
    },

    getPurchasesByDateRange: async (_,{startDate,endDate})=>{
      console.log(startDate,endDate)

      if (!startDate || !endDate) {
        throw new Error(`No dates provided`);
          }

     // Formatear las fechas (asegúrate de que el formato sea el correcto según tu base de datos)
  const formattedStartDate = new Date(startDate);
  const formattedEndDate = new Date(endDate);

  if (isNaN(formattedStartDate) || isNaN(formattedEndDate)) {
    throw new Error(`no dates formatted correctly`);
  }

      try{
        const purchases = await purchaseModel.getPurchasesByDateRange(formattedStartDate,formattedEndDate)

        if (!purchases || purchases.length === 0) {
          throw new Error(`No purchases found between ${formattedStartDate} & ${formattedEndDate}`);
        }

        const groupedPurchases = groupPurchases(purchases);

        
      

        return Object.values(groupedPurchases);
    }catch(error){
      throw new Error ( error.message)
    }
  },

  getPurchasesByUserDate: async(_,{user_id,startDate,endDate})=>{
    try{
      const purchases= await purchaseModel.getPurchasesByUserDate(user_id,startDate,endDate)

      if (!purchases || purchases.length === 0) {
        throw new Error(`No purchases found for user ID ${user_id}`);
      }
      

    // Extract user data from the first purchase (assuming all purchases are by the same user)
    const { user_id: id, fullname, personal_ID, email } = purchases[0]; // All purchases have the same user data
      
    const groupedPurchases = groupPurchasesByUser(purchases)
  
    return {
      user: {
        user_id: id,
        fullname,
        personal_ID,
        email,
      },
      purchases: Object.values(groupedPurchases), // This ensures the response is an array of purchases
    };



    }catch(error){
      throw new Error ( error.message)

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
},
deletePurchase: async (_,{purchase_id})=>{
  console.log(purchase_id)
    const connection = await pool.getConnection()
    await connection.beginTransaction(); // Ensure the transaction begins.
  
  try{


    const purchase = await purchaseModel.getPurchaseById(purchase_id)
    if(!purchase){
      console.log(purchase)
      throw new Error('Purchase not found')
      }
      const products = await purchaseModel.getPurchasedProducts(purchase_id)
      console.log(products)
      for(const product of products){
        const {product_id,amount}= product
        const stock = await productModel.getProductStock(connection,product_id)

        const newStock = stock + amount
        console.log(newStock)
        await productModel.updateProductStock(connection,product_id,newStock)
        const foundProducts= await purchaseModel.deletePurchasedProduct(purchase_id,product_id)
console.log(foundProducts)
        if(foundProducts.affectedRows ===0){
          throw new Error('Error deleting purchased products')
        }


        }
        const result =await purchaseModel.deletePurchase(purchase_id)
        if(result.affectedRows ===0){
          await connection.rollback()
          throw new Error('Error deleting purchase')
          }

        await connection.commit()
        return {message : 'Purchase deleted successfully'}
}catch(error){
  await connection.rollback()
  console.log(error)
  

}finally{
  connection.release()
}

  }
}
}

  export default purchaseResolver