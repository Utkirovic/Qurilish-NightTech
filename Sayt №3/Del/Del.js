document.addEventListener("DOMContentLoaded", function () {
    const productList = document.getElementById("product-list");

    // LocalStorage dan mahsulotlarni olish
    let products = JSON.parse(localStorage.getItem("products")) || [];

    // Mahsulotlar mavjudligini tekshirish
    if (products.length === 0) {
        productList.innerHTML = "<p>Hozircha hech qanday mahsulot mavjud emas!</p>";
        return;
    }

    // Mahsulotlarni ekranga chiqarish
    function renderProducts() {
        productList.innerHTML = "";
        products.forEach((product, index) => {
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
                <button class="delete-button" data-index="${index}">❌ Удалить</button>
            `;
            productList.appendChild(productCard);
        });

        // O'chirish tugmalariga event qo'shish
        document.querySelectorAll(".delete-button").forEach(button => {
            button.addEventListener("click", function () {
                const index = this.getAttribute("data-index");
                products.splice(index, 1); // Mahsulotni arraydan olib tashlash
                localStorage.setItem("products", JSON.stringify(products)); // Yangi ro‘yxatni saqlash
                renderProducts(); // Sahifani yangilash
            });
        });
    }

    renderProducts();
});
