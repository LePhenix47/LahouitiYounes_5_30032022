let orderIdElement = document.getElementById("orderId");
let orderId = getParameter("id");
orderIdElement.textContent = orderId;
let emptyCart = getProducts();
emptyCart = [];
registerProducts(emptyCart);
