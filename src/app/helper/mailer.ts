import nodemailer from 'nodemailer'


export const sendMail= async({email,verificationCode}:any)=>{
    
        try {
            var transport = nodemailer.createTransport({
                host: "sandbox.smtp.mailtrap.io",
                port: 2525,
                auth: {
                  user: process.env.NODEMAILER_USERNAME,
                  pass: process.env.NODEMAILER_PASSWORD
                }
              });

              const mailOptions = {
                from:'workemail4tushar@gmail.com',
                to:email,
                subject:'VERIFY YOUR ACCOUNT',
                html:`<p>Your varification code is : ${verificationCode} </p>`
              }

              const mailResponse = await transport.sendMail(mailOptions)
              console.log("email sent succesfully");
              return mailResponse
              

        } catch (error) {
            console.log("Failed to send email ", error);
            
        }
}
