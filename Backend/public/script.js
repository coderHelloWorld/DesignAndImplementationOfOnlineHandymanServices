// const submitButton = document.getElementById('submit-button');
// submitButton.addEventListener('click', () => {
//   const response = document.querySelector('input[name="response"]:checked').value;
//   const password = document.getElementById("password").value;
//   const container = document.getElementById("response-container");
//   fetch("http://localhost:3000/api/v1/users/order/response/" + orderId, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ response, password }),
//   }).then(() => {
//     container.innerHTML = `Response sent: ${response}`;
//   });
// });
