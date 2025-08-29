document.addEventListener("DOMContentLoaded", () => {
    const list = document.querySelector(".blog-list");
    const entries = Array.from(document.querySelectorAll(".blog-entry"));
    const preamble = document.querySelector(".preamble");
    const postDisplay = document.querySelector(".post-display");

    let lastMouseY = null; // Y position relative to the list container

    // --- Show post on click ---
    entries.forEach(entry => {
        entry.addEventListener("click", () => {
            preamble.classList.add("hidden");
            postDisplay.classList.remove("hidden");
            postDisplay.innerHTML = `
                <h2>${entry.dataset.title}</h2>
                <div>${entry.dataset.content}</div>
            `;
        });
    });

    











    
    // --- Function to update highlights based on mouse position ---
    function highlightAt(mouseY) {
        if (mouseY === null) {
            entries.forEach(e => e.classList.remove("hover-main", "hover-neighbor", "hover-neighbor-2"));
            return;
        }

        const listRect = list.getBoundingClientRect();
        const relativeY = mouseY - listRect.top + list.scrollTop;

        // Find the entry that contains this relative Y
        let target = null;
        for (let i = 0; i < entries.length; i++) {
            const entry = entries[i];
            const entryTop = entry.offsetTop;
            const entryBottom = entry.offsetTop + entry.offsetHeight;
            if (relativeY >= entryTop && relativeY <= entryBottom) {
                target = entry;
                break;
            }
        }

        if (!target) return;

        // Clear all previous highlights
        entries.forEach(e => e.classList.remove("hover-main", "hover-neighbor", "hover-neighbor-2"));

        // Main highlight
        target.classList.add("hover-main");

        // Neighbors
        const idx = entries.indexOf(target);
        if (entries[idx - 1]) entries[idx - 1].classList.add("hover-neighbor");
        if (entries[idx + 1]) entries[idx + 1].classList.add("hover-neighbor");
        if (entries[idx - 2]) entries[idx - 2].classList.add("hover-neighbor-2");
        if (entries[idx + 2]) entries[idx + 2].classList.add("hover-neighbor-2");
    }

    // --- Mouse movement tracking ---
    list.addEventListener("mousemove", (e) => {
        lastMouseY = e.clientY;
        highlightAt(lastMouseY);
    });

    // --- Update highlights on scroll ---
    list.addEventListener("scroll", () => {
        highlightAt(lastMouseY);
    });

    // --- Clear highlights if mouse leaves list ---
    list.addEventListener("mouseleave", () => {
        entries.forEach(e => e.classList.remove("hover-main", "hover-neighbor", "hover-neighbor-2"));
        lastMouseY = null;
    });
});
