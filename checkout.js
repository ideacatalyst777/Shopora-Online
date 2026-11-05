let cart = JSON.parse(localStorage.getItem("cart")) || [];

emailjs.init({
    publicKey: "mBY2neNOa5GFYIa66"
});

let adminEmail = "anuradhabhandi50@gmail.com";

function calculateTotal() {

    let total = 0;

    cart.forEach(function(product) {
        total += product.price * product.quantity;
    });

    document.getElementById("checkout-total").innerText =
        "Total: ₹" + total;
}

calculateTotal();

document.getElementById("checkout-form").addEventListener("submit", function(event) {

    event.preventDefault();

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let email = document.getElementById("email").value;
    let address = document.getElementById("address").value;

    let total = 0;

    cart.forEach(function(product) {
        total += product.price * product.quantity;
    });

    let orderDetails = "";

    cart.forEach(function(product) {
        orderDetails += product.name + " - Quantity: " +
            product.quantity + " - Price: ₹" +
            product.price + "\n";
    });

    let templateParams = {
        customer_name: name,
        customer_phone: phone,
        customer_email: email,
        delivery_address: address,
        order_details: orderDetails,
        total_amount: total,
        to_email: email
    };

    Promise.all([

        emailjs.send(
            "service_1fh9w4l",
            "template_fr86kcj",
            templateParams
        ),

        emailjs.send(
            "service_1fh9w4l",
            "template_fr86kcj",
            {
                ...templateParams,
                to_email: adminEmail
            }
        )

    ])
    .then(function() {

        alert("Order placed successfully! Emails sent to customer and admin.");

        localStorage.removeItem("cart");

        window.location.href = "index.html";

    })
    .catch(function(error) {

        alert("Email sending failed. Please try again.");

        console.log(error);

    });

});

