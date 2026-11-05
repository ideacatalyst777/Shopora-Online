let buttons = document.querySelectorAll(".add-cart");

buttons.forEach(function(button) {

    button.addEventListener("click", function() {

        let name = button.dataset.name;
        let price = Number(button.dataset.price);
        let image = button.dataset.image;

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        let existingProduct = cart.find(function(product) {
            return product.name === name;
        });

        if (existingProduct) {
            existingProduct.quantity++;
            existingProduct.image = image;
        } else {
            cart.push({
                name: name,
                price: price,
                image: image,
                quantity: 1
            });
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        alert(name + " added to cart!");

    });

});


let searchInput = document.getElementById("searchInput");
let categoryFilter = document.getElementById("categoryFilter");

let products = document.querySelectorAll(".product");

function filterProducts() {

    let searchValue = searchInput.value.toLowerCase();
    let selectedCategory = categoryFilter.value;

    products.forEach(function(product) {

        let productName = product.querySelector("h3").innerText.toLowerCase();
        let productCategory = product.dataset.category;

        let matchesSearch = productName.includes(searchValue);

        let matchesCategory =
            selectedCategory === "all" ||
            productCategory === selectedCategory;

        if (matchesSearch && matchesCategory) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }

    });

}

searchInput.addEventListener("input", filterProducts);

categoryFilter.addEventListener("change", filterProducts);


let menuToggle = document.getElementById("menu-toggle");
let navMenu = document.getElementById("nav-menu");

menuToggle.addEventListener("click", function() {
    navMenu.classList.toggle("active");
});
