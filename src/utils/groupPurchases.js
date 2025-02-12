export const groupPurchases = (purchases) => {
    return purchases.reduce((acc, row) => {
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
  };
  
  export const groupPurchase = (purchases) => {
    return purchases.reduce((acc, row) => {
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
  
      // Ensure acc is always initialized as an object for the first iteration
      if (!acc.purchase_id) {
        acc.purchase_id = purchase_id;
        acc.date = date;
        acc.total_purchase = total_purchase;
        acc.user = {
          user_id,
          fullname,
          personal_ID,
          email,
        };
        acc.products = []; // Initialize products as an empty array
      }
  
      // Add product information to the products array if the required fields exist
      if (product_id && name && price) {
        acc.products.push({
          product_id,
          name,
          amount,
          price,
        });
      }
  
      return acc;
    }, {}); // Ensure the accumulator starts as an empty object
  };


  export const groupPurchasesByUser = (purchases) => {
    return purchases.reduce((acc, row) => {
        const {
            purchase_id,
            date,
            total_purchase,
            product_id,
            name,
            amount,
            price,
            } = row;

            if(!acc[purchase_id]){
                acc[purchase_id]={
                    purchase_id,
                    date,
                    total_purchase,
                    products: [],
                }
            }

            if(product_id && name && price){
                acc[purchase_id].products.push({
                    product_id,
                    name,
                    amount,
                    price,
                    });
                    }
                    return acc;
                    }, {}); // Ensure the accumulator starts as an empty object
                    
                }
  