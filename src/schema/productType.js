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

type ProductMeta {
totalProducts: Int 
categories: [String]
priceRange: PriceRange
countByCategory:[CategoryCount]

}

type PriceRange{
min:Float
max:Float
}

type CategoryCount{
category:String
count:Int
}


 input ProductInput {
    name: String!
    description: String
    price: Float!
    stock: Int!
    category_id: Int
    supplier_id: Int
  }

  input ProductUpdateInput{
  name: String
  description: String
  price: Float
  stock: Int
  category_id: Int
  supplier_id: Int
  status: String
  }


type Query {
 getAllproducts: [Product]
 getProductById(product_id: ID): Product
 getProductByName(name: String):[Product]
 getProductsByCategory(category:String) : [Product]
 getProductByPriceRange(min:Float,max:Float):[Product]
 getProductsMeta: ProductMeta 
}

type Mutation{

createProduct(name:String,description:String,price:Float,category_id:Int,supplier_id: Int,stock:Int) : Product
updateProduct(product_id:ID!,input:ProductUpdateInput!) : Product
deleteProduct(product_id:ID!) : Product

createMultipleProducts(products: [ProductInput!]!): [Product]


}

`;

export default productType