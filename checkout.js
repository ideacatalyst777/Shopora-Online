(function () {
    emailjs.init({
        publicKey: "lcNv7bFyD4xtvhO6w"
    });
})();

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function calculateTotal() {

    let total = 0;

    cart.forEach(function (product) {
        total += product.price * product.quantity;
    });

    document.getElementById("checkout-total").innerText =
        "Total: ₹" + total;
}

calculateTotal();

const checkoutForm = document.getElementById("checkout-form");

checkoutForm.addEventListener("submit", function (event) {

    event.preventDefault();

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const address = document.getElementById("address").value.trim();

    if (!name || !phone || !email || !address) {
        alert("Please fill in all the fields.");
        return;
    }


    if (!/^[0-9]{10}$/.test(phone)) {
        alert("Please enter a valid 10-digit phone number.");
        return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert("Please enter a valid email address.");
    return;
}

    let total = 0;
    let orderDetails = "";

    cart.forEach(function (product) {

        total += product.price * product.quantity;

        orderDetails += product.name +
            " - Quantity: " + product.quantity +
            " - Price: ₹" + product.price + "\n";
    });

    const adminParams = {
        customer_name: name,
        customer_phone: phone,
        customer_email: email,
        delivery_address: address,
        order_details: orderDetails,
        total_amount: total
    };

    const customerParams = {
        to_email: email,
        customer_name: name,
        customer_phone: phone,
        customer_email: email,
        delivery_address: address,
        order_details: orderDetails,
        total_amount: total
    };

    const submitButton = checkoutForm.querySelector(
        "button[type='submit']"
    );

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    emailjs.send(
        "service_1fh9w4l",
        "template_fr86kcj",
        adminParams
    )

    .then(function (response) {

        console.log("Admin email sent:", response);
        return emailjs.send(
            "service_m042bec",
            "template_lzm1bmq",
            customerParams
        );

    })

    .then(function (response) {

        console.log("Customer email sent:", response);

        alert("Order placed successfully! Emails sent to customer and admin.");

        localStorage.removeItem("cart");

        window.location.href = "index.html";

    })

    .catch(function (error) {

        console.log("Email Error:", error);
        console.log("Error details:", error.text);

        alert("Unable to send order emails. Please check EmailJS settings.");

    })

    .finally(function () {

        submitButton.disabled = false;
        submitButton.textContent = "Place Order";

    });

});

