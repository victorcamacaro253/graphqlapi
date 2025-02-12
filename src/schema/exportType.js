import { gql } from 'apollo-server-express';


const exportType = gql `

type ExportResponse {
    filename: String
    buffer: String! # Base64 encoded buffer
}


type Mutation {
    exportUsersToExcel: ExportResponse
     exportUserToExcel(id:String!):ExportResponse 
     exportUsersToPdf: ExportResponse
    exportUserToPdf(id: String!): ExportResponse

  }

`
export default exportType;