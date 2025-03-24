document.addEventListener("DOMContentLoaded", function () {
    const profileForm = document.getElementById("profileForm");
    const profilePicInput = document.getElementById("profilePic");
    const previewImage = document.getElementById("previewImage");

    // ✅ LocalStorage-dan profil ma'lumotlarini yuklash
    const currentUser = localStorage.getItem("currentUser");
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // ✅ Ma'lumotlarni shaklga yuklash
    document.getElementById("username").value = user.username || "";
    document.getElementById("phone").value = user.phone || "";
    document.getElementById("email").value = user.email || "";
    document.getElementById("gender").value = user.gender || "";
    document.getElementById("location").value = user.location || "";
    previewImage.src = user.profilePic || "default-profile.png";

    // ✅ Rasm yuklanganda oldindan ko'rsatish
    profilePicInput.addEventListener("change", function () {
        const file = profilePicInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                previewImage.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // ✅ **Saqlash tugmasi bosilganda profilni yangilash**
    profileForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // **Foydalanuvchi ma'lumotlarini yangilash**
        user.username = document.getElementById("username").value;
        user.phone = document.getElementById("phone").value;
        user.email = document.getElementById("email").value;
        user.gender = document.getElementById("gender").value;
        user.location = document.getElementById("location").value;
        user.profilePic = previewImage.src; // **Yangi rasmni saqlash**

        // **LocalStorage-ga yangilangan foydalanuvchi ma'lumotlarini qayta saqlash**
        users = users.map(u => (u.username === currentUser ? user : u));
        localStorage.setItem("users", JSON.stringify(users));

        // **Joriy foydalanuvchi nomini va rasmini ham saqlaymiz**
        localStorage.setItem("currentUser", user.username);
        localStorage.setItem("currentUserProfilePic", user.profilePic);

        // ✅ **Barcha sahifalarda profil yangilanadi**
        updateProfileOnAllPages(user);

        // ✅ **Glavni sahifasiga yo‘naltirish**
        window.location.href = "Glavni.html";
    });
});

// ✅ **Barcha sahifalarda profil ma'lumotlarini yangilash**
function updateProfileOnAllPages(user) {
    document.querySelectorAll(".profile-pic").forEach(img => img.src = user.profilePic);
    document.querySelectorAll(".profile-username").forEach(el => el.textContent = user.username);
}
