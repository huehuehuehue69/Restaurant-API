"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
module.exports.sendMail = async function sendMail(str, data) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
//   let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "lakshyadeeptilak@gmail.com", // generated ethereal user
      pass: "nvstaxrarpygnzim", // generated ethereal password
    },
  });
  let eSubj, eHtml;
  if (str == "signup") {
    eSubj = `Thank You for signing ${data.name}`;
    eHtml = `
        <h1>Bsdk</h1>
        pet bhar khana khao
        Name - ${data.name}
        Email - ${data.email}
        `;
  } 
  else if (str == "forgetpassword") {
    eSubj = `Reset Password`;
    eHtml = `
        <h1>foodApp.com</h1>
        Here is your link to reset password : ${data.resetPasswordLink}
        `;
  }
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Khanaa Khao 👀" <lakshyadeeptilak@gmail.com>', // sender address
    to: data.email, // list of receivers
    subject: eSubj, // Subject line
    // text: "Hello world?", // plain text body
    html: eHtml, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
//   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

// sendMail().catch(console.error);
