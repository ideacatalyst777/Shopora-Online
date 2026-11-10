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

        window.location.href = "cart.html";

    });

});

let searchInput = document.getElementById("searchInput");
let categoryFilter = document.getElementById("categoryFilter");
let sortOption = document.getElementById("sortOption");

let productContainer = document.querySelector(".product-container");

let products = productContainer
    ? Array.from(productContainer.querySelectorAll(".product"))
    : [];

function getPrice(product) {
    let button = product.querySelector(".add-cart");
    return Number(button.dataset.price);
}

function getName(product) {
    let button = product.querySelector(".add-cart");
    return button.dataset.name;
}

function filterAndSortProducts() {

    if (!productContainer) {
        return;
    }

    let searchValue = searchInput.value.toLowerCase();
    let categoryValue = categoryFilter.value;
    let sortValue = sortOption.value;

    // Filter products
    let filteredProducts = products.filter(function(product) {

        let productName = getName(product).toLowerCase();
        let productCategory = product.dataset.category;

        let matchesSearch = productName.includes(searchValue);

        let matchesCategory =
            categoryValue === "all" ||
            productCategory === categoryValue;

        return matchesSearch && matchesCategory;

    });


    // Sort products
    if (sortValue === "low-high") {

        filteredProducts.sort(function(a, b) {
            return getPrice(a) - getPrice(b);
        });

    }

    else if (sortValue === "high-low") {

        filteredProducts.sort(function(a, b) {
            return getPrice(b) - getPrice(a);
        });

    }

    else if (sortValue === "name-az") {

        filteredProducts.sort(function(a, b) {
            return getName(a).localeCompare(getName(b));
        });

    }

    else if (sortValue === "name-za") {

        filteredProducts.sort(function(a, b) {
            return getName(b).localeCompare(getName(a));
        });

    }


    // Display sorted and filtered products
    products.forEach(function(product) {
        product.style.display = "none";
    });

    filteredProducts.forEach(function(product) {
        product.style.display = "";
        productContainer.appendChild(product);
    });

}

if (searchInput) {
    searchInput.addEventListener("input", filterAndSortProducts);
}

if (categoryFilter) {
    categoryFilter.addEventListener("change", filterAndSortProducts);
}

if (sortOption) {
    sortOption.addEventListener("change", filterAndSortProducts);
}

filterAndSortProducts();

let menuToggle = document.getElementById("menu-toggle");
let navMenu = document.getElementById("nav-menu");

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", function() {
        navMenu.classList.toggle("active");
    });

}
