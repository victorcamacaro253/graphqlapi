import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
    service : 'gmail',
    secure : false,
    auth : {
        user : process.env.EMAIL_USER,
        pass : process.env.EMAIL_PASS,
        },
        })
        
        

        const sendEmail= async (toString,subject,text) =>{
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: toString,
                subject: subject,
                text: text,
            }

            try {
                const info = await transporter.sendMail(mailOptions)
            } catch (error) {
                console.error('Error sending email',error)
                throw new error("Error sending email")
            }
        }

        export default sendEmail