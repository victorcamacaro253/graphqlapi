import { gql } from "apollo-server-express";

const categoryType = gql`

type Category {
id: ID!
name: String!
description: String
}

input updateCategoryInput{
id:ID!
name:String
description:String
}


# Query Type for Categories
type Query {
  getCategories: [Category]         # Fetches all categories
  getCategoryById(id: ID!): Category  # Fetches a category by its ID
  getCategoryByName(name: String!): Category  # Fetches a category by its name
}

# Mutation Type for Categories
type Mutation {
  createCategory(name: String!, description: String): Category  # Creates a new category
  updateCategory(id:ID!,input:updateCategoryInput) : Category
  deleteCategory(id:ID!) : Category
}
`


export default categoryType