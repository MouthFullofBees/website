document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('guestbook-form');
    const botcheckInput = document.getElementById('botcheck');
    let flashBox = document.querySelector('.flash');

    if (!flashBox) {
        flashBox = document.createElement('div');
        flashBox.className = 'flash';
        flashBox.style.display = 'none';
        document.querySelector('.preamble').prepend(flashBox); // insert at top
    }

    if (form) {
        form.addEventListener('submit', function (e) {
            const botcheck = botcheckInput.value.trim().toLowerCase();

            if (botcheck !== 'guestbook') {
                e.preventDefault();
                flashBox.innerHTML = '<p>❌ Botcheck failed! Please try again.</p>';
                flashBox.style.display = 'flex';
            }
        });
    }
});



document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("guestbook-form");
    const flashBox = document.querySelector(".flash");
    const botcheckInput = document.getElementById("botcheck");

    form.addEventListener("submit", function (e) {
        if (botcheckInput.value.trim().toLowerCase() !== "guestbook") {
            e.preventDefault(); // stop form submission
            flashBox.innerHTML = "❌ Please type 'guestbook' to submit.";
            flashBox.style.display = "block";
            flashBox.style.color = "red";
            flashBox.style.marginBottom = "10px";
        }
    });
});






document.addEventListener("DOMContentLoaded", function() {
    const messagesDiv = document.querySelector(".Guestbook-Messages");
    const scrollButton = document.getElementById("scrollMessagesTop");
    // Function to check if overflow exists
    function checkOverflow() {
        if (messagesDiv.scrollHeight > messagesDiv.clientHeight) {
            scrollButton.style.display = 'inline-block';
        } else {
            scrollButton.style.display = 'none';
        }
    }

    // Initial check on page load
    checkOverflow();

    // Optional: Re-check if messages change dynamically
    // You could also call checkOverflow() after new messages are added

    // Scroll smoothly to top when button is clicked
    scrollButton.addEventListener("click", function() {
        messagesDiv.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});
