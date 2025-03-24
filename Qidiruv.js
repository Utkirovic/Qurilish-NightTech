document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const searchResults = document.getElementById("searchResults");

    function searchProducts() {
        let query = searchInput.value.trim().toLowerCase();
        if (!query) {
            searchResults.innerHTML = "<p>🔎 Iltimos, qidiruv so'zini kiriting.</p>";
            return;
        }

        let products = JSON.parse(localStorage.getItem("products")) || [];
        let filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query)
        );

        if (filteredProducts.length === 0) {
            searchResults.innerHTML = "<p>❌ Mos mahsulot topilmadi.</p>";
            return;
        }

        searchResults.innerHTML = "";
        filteredProducts.forEach(product => {
            let productDiv = document.createElement("div");
            productDiv.classList.add("product");
            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="product-img">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p><strong>${product.price} so'm</strong></p>
            `;
            searchResults.appendChild(productDiv);
        });
    }

    window.searchProducts = searchProducts;
});

const sampleProducts = [
    "Anor", "Anor sharbati", "Anor daraxti", "Apple iPhone", "Armut", "Avtomobil",
    "Asus laptop", "Acer noutbuk", "Adidas krossovkalar", "Samsung Galaxy", "Sony televizor"
];

function showSuggestions() {
    let input = document.getElementById("searchInput").value.toLowerCase();
    let suggestionsBox = document.getElementById("suggestions");
    suggestionsBox.innerHTML = ""; // Avvalgi tavsiyalarni tozalash

    if (input.length === 0) {
        suggestionsBox.style.display = "none";
        return;
    }

    let filteredSuggestions = sampleProducts.filter(item => item.toLowerCase().includes(input));

    if (filteredSuggestions.length === 0) {
        suggestionsBox.style.display = "none";
        return;
    }

    suggestionsBox.style.display = "block";

    filteredSuggestions.forEach(item => {
        let li = document.createElement("li");
        li.textContent = item;
        li.onclick = function () {
            document.getElementById("searchInput").value = item;
            suggestionsBox.style.display = "none"; // Tavsiyalarni yashirish
        };
        suggestionsBox.appendChild(li);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const productList = document.getElementById("product-list");

    // LocalStorage dan mahsulotlarni olish
    const products = JSON.parse(localStorage.getItem("products")) || [];

    if (products.length === 0) {
        productList.innerHTML = "<p>Hozircha hech qanday mahsulot mavjud emas!</p>";
        return;
    }

    // Har bir mahsulotni chiqarish
    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-img">
            <h3>${product.name}</h3>
            <p><strong>Narx:</strong> ${product.price} so'm</p>
            <p><strong>Holati:</strong> ${product.condition}</p>
            <p><strong>Rang:</strong> ${product.color}</p>
            <p><strong>Batafsil:</strong> ${product.description}</p>
            <p><strong>Tel:</strong> ${product.phone}</p>
            <p><strong>Manzil:</strong> ${product.location}</p>
            <button class="chat-button">💬 Chat</button>
        `;
        productList.appendChild(productCard);
    });
});
