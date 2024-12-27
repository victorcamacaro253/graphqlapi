import { gql } from "apollo-server-express";

const productType = gql`
type Product {
product_id: ID!
name: String!
description: String!
price: Float!
stock : Int!
category_id : Int
supplier_id: Int 
status: String
}
 input ProductInput {
    name: String!
    description: String
    price: Float!
  }


type Query {
 getAllproducts: [Product]
 getProductById(product_id: ID): Product
 getProductByName(name: String):[Product]
}

type Mutation{

createProduct(name:String,description:String,price:Float,category_id:Int,supplier_id: Int,stock:Int) : Product

}

`;

export default productType