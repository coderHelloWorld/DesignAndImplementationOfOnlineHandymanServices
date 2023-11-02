function response(data) {
    console.log("inform");
    const orderId = data.id;
    //const email = data.email;
    const htmlLink = `http://localhost:5000/api/v1/order/order/response/`;
    const responseBody = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f2f2f2;
            }
    
            form {
                margin: auto;
                padding: 20px;
                background-color: white;
                border: 1px solid #ccc;
                box-shadow: 0 0 10px 0 rgba(0,0,0,0.2);
                max-width: 500px;
            }
    
            label {
                display: inline-block;
                margin-bottom: 10px;
                font-weight: bold;
            }
        label[for="response"] {
          display: block;
          text-align: center;
          font-size: 24px;
          margin-top: 5px;
          margin-bottom: 15px;
        }
    
            input[type="input"],
            input[type="email"],
            input[type="password"],
            input[type="submit"],
            input[type="radio"] {
                display: block;
                width: 100%;
                padding: 10px;
                border: 1px solid #ccc;
                border-radius: 5px;
                box-sizing: border-box;
                font-size: 16px;
                margin-bottom: 20px;
                background-color: #fff;
            }
    
            input[type="radio"] {
                display: inline-block;
                width: auto;
                margin-right: 10px;
            }
    
            input[type="submit"] {
                background-color: #4CAF50;
                color: white;
                cursor: pointer;
            }
    
            input[type="submit"]:hover {
                background-color: #45a049;
            }
    
            @media screen and (max-width: 600px) {
                form {
                    margin-top: 50px;
                }
            }
    
        </style>
    </head>
    <body>
        <form method="POST" action="${htmlLink}">
            <label for="response">Please Enter Your Response</label>
            <input type="input" id="orderID" name="orderID" value="${orderId}" placeholder="Enter Order ID">
            <div>
                <input type="radio" id="approve" name="response" value="approve">
                <label for="approve">Approve</label>
            </div>
            <div>
                <input type="radio" id="decline" name="response" value="decline">
                <label for="decline">Decline</label>
            </div>
            <input type="email" id="EmailID" name="EmailID" placeholder="Enter Email ID">
            <input type="password" id="password" name="password" placeholder="Password">
            <input type="submit" value="Submit">
        </form>
    </body>
    </html>
    
  `;
    return responseBody;
}

module.exports = response;