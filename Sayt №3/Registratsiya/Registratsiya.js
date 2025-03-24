// Registratsiya.js
document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let username = document.getElementById("username").value.trim();
    let realname = document.getElementById("realname").value.trim();
    let dob = document.getElementById("dob").value;
    let gender = document.getElementById("gender").value;
    let phone = document.getElementById("phone").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    
    if (!username || !realname || !dob || !gender || !phone || !email || !password || !confirmPassword) {
        alert("Iltimos, barcha maydonlarni to'ldiring!");
        return;
    }
    
    if (password !== confirmPassword) {
        alert("Parollar mos kelmadi!");
        return;
    }
    
    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some(user => user.username === username)) {
        alert("Bu foydalanuvchi nomi allaqachon band!");
        return;
    }
    
    let user = {
        username,
        realname,
        dob,
        gender,
        phone,
        email,
        password
    };
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    alert("Ro‘yxatdan muvaffaqiyatli o‘tdingiz! Endi tizimga kiring.");
    window.location.href = "/Glavni/Glavni.html";
});

document.getElementById("loginLink").addEventListener("click", function() {
    window.location.href = "/Kirish/Kirish.html";
});

