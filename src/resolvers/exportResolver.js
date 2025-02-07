import userModel from "../models/userModel.js";
import XLSX from "xlsx";


const exportResolver={


    Mutation:{

        exportUsersToExcel : async () =>{
            try {
                const users = await userModel.getUsers()
        
              //  console.log(users)
        
               // Check if users exist, if not, throw an error
               if (!users || users.length === 0) {
                throw new Error('No users found to export');
            }
        
        
                const workbook = XLSX.utils.book_new()
                const worksheet = XLSX.utils.json_to_sheet(users)
        
                XLSX.utils.book_append_sheet(workbook,worksheet,'Users')
                const buffer = XLSX.write(workbook,{bookType:'xlsx',type:'buffer'})
        
                const filename = `users_${new Date().toISOString().split('T')[0]}.xlsx`;
        
                // Return the buffer and filename
                return {
                    filename,
                    buffer: buffer.toString('base64'), // Convert buffer to base64 for transmission
                };
        
            } catch (error) {
                throw new Error('Error exporting users to excel: ' + error.message);
                
            }
            }
    }
    
}

export default exportResolver