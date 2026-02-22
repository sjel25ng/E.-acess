//Sliders
document.querySelectorAll(".slider").forEach(slider => {
    const slides = slider.querySelector(".slides");
    const prev = slider.querySelector(".prev");
    const next = slider.querySelector(".next");
    let currentIndex = 0;

    function showSlide(index) {
        slides.style.transform = `translateX(-${index * 100}%)`;
    }

    prev.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + slides.children.length) % slides.children.length;
        showSlide(currentIndex);
    });

    next.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % slides.children.length;
        showSlide(currentIndex);
    });

})

