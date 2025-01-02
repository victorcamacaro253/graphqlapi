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
                    getProductsByCategory: async (_, {category}) => {
                        try {
                            const products = await productModel.getProductsByCategory(category);
                            if (products.length===0){
                                throw new Error("Product not found");
                                }
                                return products;
                                } catch (error) {
                                    throw new Error('Error  ' + error.message)
                                    }

                                }


    },
    Mutation:{
        createProduct:async (_, {name,price,description,category_id,supplier_id,stock}) => {
            try {


                const existingProduct = await productModel.getProductByName(name)
                if(existingProduct.length>0){
                    throw new Error("Product already exists")
                    }

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



                    updateProduct: async (_, {product_id, input}) => {
                        try {
                            

                    const updateFields = {}

                    if(input.name) updateFields.name = input.name
                    if(input.description) updateFields.description = input.description
                    if(input.price) updateFields.price = input.price
                    if(input.category_id) updateFields.category_id = input.category_id
                    if(input.supplier_id) updateFields.supplier_id = input.supplier_id

                    if(input.status) updateFields.status = input.status
                    
                    if(Object.keys(updateFields).length === 0){
                        throw new Error('No fields to update')
                    }

                    const updateProduct= await productModel.updateProduct(product_id,updateFields)
                    console.log(updateProduct.product_id)

                    return updateProduct

                   /* if(updateProduct){
                        const product = await productModel.getProductById(product_id)
                        return product
                    }else{
                        throw new Error('Product not found or change was made')
                    }*/


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
                                            
                                            }
                                            
    


}

export default productResolver;