document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value;

    // Barcha foydalanuvchilarni localStorage'dan olish
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Foydalanuvchini username bo‘yicha qidirish
    const user = users.find(user => user.username === username);

    if (!user) {
        alert("⚠️ Bunday foydalanuvchi mavjud emas!");
        return;
    }

    if (user.password === password) {
        alert("✅ Tizimga muvaffaqiyatli kirdingiz!");
        localStorage.setItem("currentUser", JSON.stringify(user)); // Foydalanuvchini saqlash
        window.location.href = "Glavni.html";
    } else {
        alert("❌ Xato parol!");
    }
});
