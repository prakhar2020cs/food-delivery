function showMessage(message) {
    const messageBox = document.getElementById("message-box");
    messageBox.innerHTML = message;
    messageBox.style.display = "block";

    setTimeout(() => {
        messageBox.style.display = "none"; // Hide the message after 3 seconds
    }, 3000);
}