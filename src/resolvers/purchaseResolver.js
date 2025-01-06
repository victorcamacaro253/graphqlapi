import purchaseModel from "../models/purchaseModel.js";


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
    },
  };

  export default purchaseResolver