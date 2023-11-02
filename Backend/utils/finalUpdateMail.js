const nodemailer = require('nodemailer');

function createEmailBody(orderData) {
  const orderId = orderData.orderId;
  //const htmlLink = `http://localhost:3000/api/v1/order/order/responseForm/${orderId}`;
  const emailBody = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f2f2f2;
        color: #333;
        line-height: 1.5;
      }
  
      h1 {
        font-size: 28px;
        margin-top: 0;
      }
  
      p {
        margin-top: 0;
        margin-bottom: 10px;
      }
  
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #fff;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
      }
  
      .btn {
        display: block;
        padding: 10px 20px;
        background-color: #000;
        color: #fff;
        text-decoration: none;
        border-radius: 5px;
        margin-top: 20px;
      }
      a {
        text-align: center;
        color: white;
        text-decoration: none;
      }
      a p{        
        color:#fff;
        margin-top: 0;
        margin-bottom: 0px;
      }
  
      @media screen and (max-width: 600px) {
        .container {
          max-width: 100%;
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>New Order Status : ${orderData.status}</h1>
      <p><strong>Order ID:</strong> ${orderData.orderId}</p>
      <p><strong>Address:</strong> ${orderData.Address}</p>
      <p><strong>Service to provide:</strong> ${orderData.subname}</p>
      <p><strong>Price: </strong> ${orderData.price}</p>
      <p><strong>Instruction: </strong> ${orderData.instruction}</p>
      <p><strong>Date: </strong> ${orderData.date}</p>
      <p><strong>Time </strong> ${orderData.time}</p>
    </div>
  </body>
  </html>
  
`;
  return emailBody;
}



async function finalUpdateMail(orderData, senderEmail){
  console.log("in mail");
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_UNAME,
          pass: process.env.GMAIL_PASS
        }
      });
    
    const emailBody = createEmailBody(orderData); // Creates email body with order data
    const mailOptions = {
      from: process.env.GMAIL_UNAME,
      to: senderEmail,
      subject: 'Order Update',
      html: emailBody
    };
    
    const emailResponse = await transporter.sendMail(mailOptions);
    console.log(emailResponse);
}

module.exports=finalUpdateMail;