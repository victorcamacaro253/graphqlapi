import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";
import { randomBytes } from 'crypto';


const productResolver = {
    
    Query:{
        getAllproducts: async () => {
            try{
            const products = await productModel.getAllProducts();
            console.log(products)
            return products;
            }catch(err){
                console.log(err);
                return err;
                }
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

                                },
                                getProductByPriceRange : async (_, {min, max}) => {
                                    try {
                                        const products = await productModel.getProductsByPriceRange(min, max);
                                        if (products.length===0){
                                            throw new Error("Product not found");
                                            }
                                            return products;
                                            } catch (error) {
                                                throw new Error('Error  ' + error.message)
                                                }
                                            },

                                            getProductsMeta: async ()=>{
                                                try {
                                                    const products = await productModel.getAllProducts();
                                                    console.log(products.length)
                                                    const categories = await categoryModel.getCategories()

                                                        const meta ={
                                                            totalProducts: products.length,
                                                            categories: categories.map(category => category.name),
                                                            priceRange:{
                                                                min: Math.min(...products.map(product => product.price)),
                                                                max: Math.max(...products.map(product => product.price))
                                                    
                                                            },
                                                            countByCategory: categories.map(category => {
                                                                const count = products.filter(product => product.category_id === category.id).length;
                                                                return {
                                                                  category: category.name,
                                                                  count: count,
                                                                };
                                                              }),
                                                        
                                                        }
                                                        return meta
                                                    
                                            }catch(error){
                                                console.error(error)
                                                throw new Error('Error fetching product')

                                            }
                                        },


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
                                            },


                                            createMultipleProducts : async (_, {products}) => {
                                            try {
                                                const createdProducts=[]

                                                for(const product of products){

                                                    const existingProduct = await productModel.getProductByName(product.name)
                                                    if(existingProduct.length > 0){
                                                        throw new Error('Product already exists')
                                                    }

                                                    const code = randomBytes(10).toString('hex')
                                                    const status= 'active'
                                                    const newProduct = await productModel.createProduct(
                                                        code,
                                                        product.name,
                                                        product.price,
                                                        product.description,
                                                      
                                                        product.category_id,
                                                        product.supplier_id,
                                                        
                                                        status,
                                                        )
                                                    
                                                        const productStock = await productModel.createProductStock(newProduct.insertId,product.stock)

                                                        createdProducts.push(
                                                            {
                                                                id:newProduct.insertId,
                                                                name:product.name,
                                                                price:product.price,
                                                                description:product.description,
                                                                category_id:product.category_id,
                                                                supplier_id:product.supplier_id,
                                                                status:status,
                                                                stock:product.stock,
                                                                code,
                                                                status
                                                                }
                                                        )
                                                }

                                                return createdProducts
                                                
                                            } catch (error) {
                                                throw new Error('Error  ' + error.message)

                                            }
                                            }
                                            
                                        }


}

export default productResolver;