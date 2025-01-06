import { gql } from "apollo-server-express";

const purchaseType = gql`

type Product {
  product_id: ID!
  name: String
  description: String
  price: Float
  amount:Float
}

type User {
  user_id: Int!
  fullname: String
  personal_ID: String
  email: String
}

type Purchase {
  purchase_id: ID!
  total_purchase: String!
  date: String!
  user: User!
  products: [Product]
}

type Query {
  getAllPurchases: [Purchase]
    getPurchaseById(purchase_id: ID!): Purchase
    getPurchasesByUserId(user_id: Int!): [Purchase]
}



`
export default purchaseType