document.addEventListener("DOMContentLoaded", function () {
    // Foydalanuvchi ma'lumotlarini olish
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
        window.location.href = "Kirish.html";
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.username === currentUser);

    if (user) {
        document.getElementById("usernameDisplay").textContent = user.username;
        document.getElementById("userProfilePic").src = user.profilePic || "default-profile.png";
    }

    // Mahsulotlarni yuklash
    loadProducts();
});

function loadProducts() {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    const products = JSON.parse(localStorage.getItem("products")) || [];

    if (products.length === 0) {
        productList.innerHTML = "<p style='color: white; text-align: center;'>Hozircha mahsulot yo'q</p>";
        return;
    }

    products.forEach((product, index) => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-img">
            <h3>${product.name}</h3>
            <p><strong>Narx:</strong> ${product.price} so'm</p>
            <p><strong>Holati:</strong> ${product.condition}</p>
            <p><strong>Batafsil:</strong> ${product.description}</p>
            <p><strong>Tel:</strong> ${product.phone}</p>
            <button class="chat-button" data-index="${index}">💬 Chat</button>
        `;
        productList.appendChild(productCard);
    });

    // Chat tugmachalariga hodisa qo‘shish
    document.querySelectorAll(".chat-button").forEach(button => {
        button.addEventListener("click", function () {
            const productIndex = this.getAttribute("data-index");
            localStorage.setItem("selectedProduct", JSON.stringify(products[productIndex]));
            window.location.href = "Chat.html";
        });
    });
}

// Qidiruv sahifasiga yo‘naltirish
function goToSearch() {
    window.location.href = "/Qidiruv/Qidiruv.html";
}