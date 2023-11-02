function responseRecieved(data) {
    console.log("inform");
    const orderId = data.id;
    const emailId = data.emailid;
    const req = data.requested;
    const responseRecievedBody = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Approval Form</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f2f2f2;
            text-align: center;
          }
          h1 {
            font-size: 32px;
            margin-top: 40px;
          }
          p {
            font-size: 20px;
            margin: 20px 0;
          }
          @media only screen and (max-width: 768px) {
            h1 {
              font-size: 24px;
              margin-top: 20px;
            }
            p {
              font-size: 16px;
              margin: 10px 0;
            }
          }
        </style>
      </head>
      <body>
        <h1>WE HAVE RECEIVED YOUR ${req} RESPONSE!</h1>
        <p>For order ID: ${orderId}</p>
        <p>From your emailID: ${emailId}</p>
      </body>
    </html>    
  `;
    return responseRecievedBody;
}

module.exports = responseRecieved;