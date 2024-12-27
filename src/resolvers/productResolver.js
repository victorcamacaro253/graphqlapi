import productModel from "../models/productModel.js";
import { randomBytes } from 'crypto';


const productResolver = {
    
    Query:{
        getAllproducts: async () => {
            const products = await productModel.getAllProducts();
            return products;
            },
            getProductById: async (_, {product_id}) => {
                try {
                    const product = await productModel.getProductById(product_id);
                    if (!product) {
                        throw new Error('Product not found');
                        }
    
                    console.log(product)
                    return product;
                } catch (error) {
                    throw new Error('Error  ' + error.message)

                }
              
                },

                getProductByName: async (_, {name}) => {
                    try {

                    const product = await productModel.getProductByName(name);
                    if (product.length===0){
                        throw new Error("Product not found");
                        }

                    return product;

                    }catch(error){
                        throw new Error('Error  ' + error.message)
                    }
                    },

    },
    Mutation:{
        createProduct:async (_, {name,price,description,category_id,supplier_id,stock}) => {
            try {


             //   const existingProduct = await productModel.getProductByName(name)
              //  if(existingProduct.length>0){
                //    throw new Error("Product already exists")
                  //  }

                const code = randomBytes(10).toString('hex');
                const status= 'active'
                const product = await productModel.createProduct(code,name,price,description,category_id,supplier_id,status);
               console.log(product.insertId)

                const product_stock= await productModel.createProductStock(product.insertId,stock)

                  return product
        return product

                } catch (error) {

                    throw new Error('Error  ' + error.message)
                    }

                    },



             /*       updateProduct: async (_, {product_id, name, price, description}) => {
                        try {
                            const product = await productModel.updateProduct(product_id, name, price, description);
                            return product;
                            } catch (error) {
                                throw new Error('Error  ' + error.message)
                                }
                                },
                                deleteProduct: async (_, {product_id}) => {
                                    try {
                                        const product = await productModel.deleteProduct(product_id);
                                        return product;
                                        } catch (error) {
                                            throw new Error('Error  ' + error.message)
                                            }
                                            }
                                            */
                                            }
                                            
    


}

export default productResolver;