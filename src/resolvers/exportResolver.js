import userModel from "../models/userModel.js";
import XLSX from "xlsx";
import PDFDocument from "pdfkit";
import blobStream from "blob-stream";
import PassThrough from "stream"
import { Buffer } from 'node:buffer';
import { Readable } from 'stream';
import { createReadStream } from 'fs';


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
            },

            exportUserToExcel : async(_,{id})=>{
                try {
                    const user = await userModel.getUserById(id)
                    console.log(user)
                    if (!user) {
                        throw new Error('User not found');
                        }

                      /*  const selectedFields = {
                            name: user.fullname,
                            email: user.email,
                            role: user.role, // Adjust fields as needed
                            Personal_ID : user.personal_ID
                        };
                       */

                        const workbook = XLSX.utils.book_new()
                        const worksheet = XLSX.utils.json_to_sheet([user])
                       // const worksheet = XLSX.utils.json_to_sheet([selectedFields]); 

                        XLSX.utils.book_append_sheet(workbook,worksheet,'User')
                        const buffer = XLSX.write(workbook,{bookType:'xlsx',type:'buffer'})
                        const filename = `user_${new Date().toISOString().split('T')[0]}.xlsx`
                        return {
                        filename,
                        buffer: buffer.toString('base64'), // Convert buffer to base64 for transmission
                        }
                        } catch (error) {
                            console.log(error)
                         throw new Error('Error exporting user to excel: ' + error.message);
                    }
                
            },
    
            exportUsersToPdf: async () => {
                try {
                  const users = await userModel.getUsers();
              
                  // Check if users exist, if not, throw an error
                  if (!users || users.length === 0) {
                    throw new Error("No users found to export");
                  }
              
                  // Create a PDF document
                  const doc = new PDFDocument();
                  const stream = doc.pipe(blobStream());
              
                  doc.fontSize(16).text('User List', { align: 'center' });
              
                  doc.moveDown(2);
                  doc.fontSize(12).text('-------------------------------------------');
              
                  // Add users to PDF
                  users.forEach(user => {
                    doc.fontSize(12).text(`Name: ${user.fullname}`);
                    doc.text(`Email: ${user.email}`);
                    doc.text(`Role: ${user.role}`);
                    doc.text('-------------------------------------------');
                  });
              
                  // Finalize the PDF
                  doc.end();
              
                  // Wait for the PDF to be generated
                  const pdfBuffer = await new Promise((resolve, reject) => {
                    const chunks = [];
              
                    stream.on('data', chunk => {
                        console.log('Received chunk:', chunk);
                      chunks.push(chunk);
                    });
              
                    stream.on('finish', () => {
                        console.log('Stream finished, concatenating chunks...');
                      const buffer = Buffer.concat(chunks); // Combine the chunks into a single Buffer
                      const base64data = buffer.toString('base64'); // Convert the buffer to a base64 string
                      resolve(base64data);
                    });
              
                    stream.on('error', reject);
                  });
              
                  const filename = `users_${new Date().toISOString().split("T")[0]}.pdf`;
                
                  // Return the filename and base64 buffer
                  return {
                    filename,
                    buffer: pdfBuffer, // Base64 string here
                  };
                } catch (error) {
                  throw new Error("Error exporting users to PDF: " + error.message);
                }
              },

              
    exportUserToPdf : async (_,{id})=>{
        try{
            const user = await userModel.getUserById(id)
            if(!user){
                throw new Error('User not found')
                }
                const doc = new PDFDocument()
                const stream = doc.pipe(BlobStream())
                doc.fontSize(18).text('User Profile', {align: 'center'})
                doc.moveDown()
                doc.fontSize(12).text(`Name: ${user.fullname}`)
                doc.fontSize(10).text(`Email: ${user.email}`)
                doc.fontSize(10).text(`Role: ${user.role}`)
                doc.fontSize(10).text(`Personal ID: ${user.personal_ID}`)
                doc.end()
                stream.on('finish', () => {
                    const filename = `user_${id}_${new Date().toISOString().split('T')[0]}.pdf`
                        const buffer = stream.toBlobURL()
                        return {
                            filename,
                            buffer: buffer.toString('base64'), // Convert buffer to base64 for transmission
                            }
                        })
                        }catch(error){
                            throw new Error('Error exporting user to pdf: ' + error.message);
                        }
                            
                  }
    
              }
          }

export default exportResolver