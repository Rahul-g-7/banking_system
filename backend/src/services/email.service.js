const nodemailer=require("nodemailer")

const transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
        type:"OAuth2",
        user:process.env.EMAIL_USER,
        clientId:process.env.GOOGLE_CLIENT_ID,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        refreshToken:process.env.GOOGLE_REFRESH_TOKEN
    },
})
transporter.verify((error,success)=>{
    if(error){
        console.log('Error connceting to Email services:',error)
    }
    else{
        console.log("Email service is ready")
    }
})
 const sendEmail=async (to, subject,text,html)=>{
    try{
        const info= await transporter.sendMail({
            from: `"Banking_system " <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text,
            html
        })
        console.log("Message sent : %s",info.messageId)
        console.log("Preview URL: %s",nodemailer.getTestMessageUrl(info))
        console.log('Email sent successfully')
    }
    catch(err){
        console.log('Error sending email:', err)
    }
 }
 async function sendRegistrationEmail(userEmail,name) {
    const subject = "Welcome to Banking system";
    const text = `
        Dear ${name},

        Thank you for registering with our banking system.

        Your account has been created successfully.

        You can now login to your account using your email and password.

        Best regards,
        Banking System Team
    `;
    const html = `
       <h1>Hello ${name}</h1>
       <p>Thank you for registering with our banking system.</p>
       <p>Your account has been created successfully.</p>
       <p>You can now login to your account using your email and password.</p>
       <p>Best regards,</p>
       <p>Banking System Team</p>
    `;

    await sendEmail(userEmail,subject,text,html)
    console.log('Registration email sent successfully to',userEmail)
 }

 module.exports={sendEmail,sendRegistrationEmail}