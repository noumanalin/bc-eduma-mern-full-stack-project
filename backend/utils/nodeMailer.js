import nodemailer from 'nodemailer'


const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST_SERVER,
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: process.env.SMTP_USER_LOGIN,
      pass:process.env.SMTP_PASSWORD,
    },
  });


  export const sendEmail = async (to, subject, body) => {
    try {
      await transporter.sendMail({
        from: process.env.FROM_EMAIL,
        to: to,
        subject: subject,
        html: body
      });
      console.log("Email sent successfully");
    } catch (error) {
      console.error("❌ Failed to send email:", error);
    }
  };
  