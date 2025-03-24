document.addEventListener("DOMContentLoaded", function () {
    const chatMessages = document.getElementById("chatMessages");
    const messageInput = document.getElementById("messageInput");
    const sendButton = document.getElementById("sendButton");

    // Foydalanuvchini localStorage'dan olish (faqat username)
    const currentUserData = JSON.parse(localStorage.getItem("currentUser")) || { username: "Mehmon" };
    const currentUser = currentUserData.username; // Faqat username'ni olamiz

    // Xabarlarni yuklash
    function loadMessages() {
        chatMessages.innerHTML = "";
        const messages = JSON.parse(localStorage.getItem("chatMessages")) || [];

        messages.forEach(msg => {
            const messageElement = document.createElement("div");
            messageElement.classList.add("message");

            if (msg.username === currentUser) {
                messageElement.classList.add("user");
            } else {
                messageElement.classList.add("others");
            }

            messageElement.innerHTML = `<strong>${msg.username}:</strong> ${msg.text}`;
            chatMessages.appendChild(messageElement);
        });

        // Yangi xabar qo'shilganda pastga o'tkazish
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Xabar jo‘natish
    function sendMessage() {
        const messageText = messageInput.value.trim();
        if (messageText === "") return;

        const newMessage = {
            username: currentUser, // Faqat username
            text: messageText,
            timestamp: new Date().toLocaleTimeString()
        };

        let messages = JSON.parse(localStorage.getItem("chatMessages")) || [];
        messages.push(newMessage);
        localStorage.setItem("chatMessages", JSON.stringify(messages));

        messageInput.value = "";
        loadMessages();
    }

    // Tugmani bosganda xabar jo‘natish
    sendButton.addEventListener("click", sendMessage);

    // Enter tugmasi bosilganda xabar jo‘natish
    messageInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });

    // Chatni yuklash
    loadMessages();
});
