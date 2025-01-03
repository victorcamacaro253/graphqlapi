import { gql } from "apollo-server-express";

const categoryType = gql`

type Category {
id: ID!
name: String!
description: String
}


type Query{
 getCategories:[Category]

}

`


export default categoryType