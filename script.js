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

//Cart
let cartCount = 0;
const cartDisplay = document.getElementById("cart-count");
document.querySelectorAll(".add-to-cart").forEach(button => {
	button.addEventListener("click", () => {
		cartCount++;
		if(cartDisplay){
			cartDisplay.textContent = cartCount;
		}
	});
});	

