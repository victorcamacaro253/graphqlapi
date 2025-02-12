import { gql } from "apollo-server-express";

const purchaseType = gql`

type Product {
  product_id: ID!
  name: String
  description: String
  price: Float
  amount:Float
  status: String
}

type User {
  user_id: Int!
  fullname: String
  personal_ID: String
  email: String
}

input Productinput{
product_id:ID!
quantity:Float!
price:Float!
}



type Purchase {
  purchase_id: ID!
  total_purchase: Float!
  date: String!
  user: User!
  products: [Product]
  message:String
}

type UserPurchases {
  user: User
  purchases: [Purchase]
}

type Query {
  getAllPurchases: [Purchase]
    getPurchaseById(purchase_id: ID!): Purchase
    getPurchasesByUserId(user_id: Int!): UserPurchases
    getPurchasesByUsername(username: String!): [Purchase]
    getPurchasesByDateRange(startDate: String!,endDate: String!): [Purchase]
    getPurchasesByUserDate(user_id:Int!,startDate:String!,endDate:String!) :[Purchase]
}

type Mutation{
 createPurchase(userId:Int!,products:[Productinput!]!):Purchase
 updatePurchase(purchase_id:ID!,products:[Productinput!]!):Purchase
 deletePurchase(purchase_id:ID!): Purchase
  
}



`
export default purchaseType