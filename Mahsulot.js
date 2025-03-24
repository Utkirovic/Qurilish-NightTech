document.addEventListener("DOMContentLoaded", function () {
    const productForm = document.getElementById("product-form");
    const locationButton = document.getElementById("get-location");
    const locationInput = document.getElementById("seller-location");
    const addProductButton = document.getElementById("add-product-button");
    const successMessage = document.getElementById("success-message");

    // Lokatsiyani olish
    locationButton.addEventListener("click", function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                locationInput.value = `Lat: ${position.coords.latitude}, Lng: ${position.coords.longitude}`;
            }, function () {
                alert("Lokatsiyani olish imkonsiz!");
            });
        } else {
            alert("Brauzeringiz lokatsiyani qo‘llab-quvvatlamaydi!");
        }
    });

    // Mahsulotni joylash
    addProductButton.addEventListener("click", function () {
        const imageInput = document.getElementById("product-image");
        const productImage = imageInput.files.length > 0 ? imageInput.files[0] : null;
        const productName = document.getElementById("product-name").value.trim();
        const productPrice = document.getElementById("product-price").value.trim();
        const productDescription = document.getElementById("product-description").value.trim();
        const productCondition = document.getElementById("product-condition").value;
        const productColor = document.getElementById("product-color").value.trim();
        const sellerPhone = document.getElementById("seller-phone").value.trim();
        const sellerLocation = locationInput.value.trim();

        if (!productImage || !productName || !productPrice || !productDescription || !productCondition || !productColor || !sellerPhone || !sellerLocation) {
            alert("Iltimos, barcha maydonlarni to‘ldiring!");
            return;
        }

        // Rasmni yuklash
        const reader = new FileReader();
        reader.onload = function (e) {
            const productData = {
                image: e.target.result,
                name: productName,
                price: productPrice,
                description: productDescription,
                condition: productCondition,
                color: productColor,
                phone: sellerPhone,
                location: sellerLocation
            };

            // Mahsulotni localStorage ga saqlash (Key: 'products')
            let products = JSON.parse(localStorage.getItem("products")) || [];
            products.push(productData);
            localStorage.setItem("products", JSON.stringify(products));

            // Xabar chiqarish
            successMessage.classList.remove("hidden");

            // 5 soniyadan keyin Glavni sahifasiga yo'naltirish
            setTimeout(() => {
                window.location.href = "Glavni.html";
            }, 5000);
        };
        reader.readAsDataURL(productImage);
    });
});
А