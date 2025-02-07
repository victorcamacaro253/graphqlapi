import { gql } from 'apollo-server-express';


const exportType = gql `

type ExportResponse {
    filename: String
    buffer: String! # Base64 encoded buffer
}


type Mutation {
    exportUsersToExcel: ExportResponse
     

  }

`
export default exportType;