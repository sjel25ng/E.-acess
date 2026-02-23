//Slider function
document.querySelectorAll(".slider").forEach(slider => {
	const slides = slider.querySelector(".slides");
	const prev = slider.querySelector(".prev");
	const next = slider.querySelector(".next");
	
	let index = 0;
	
	next.addEventListener("click", () => {
		index++;
		if(index > 2) index = 0;
		slides.style.transform = `translateX(-${index * 100}%)`;
	});
	
	prev.addEventListener("click", () => {
		index--;
		if(index < 0) index = 2;
		slides.style.transform = `translateX(-${index * 100}%)`;
	});
});
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCart() {
  	localStorage.setItem("cart", JSON.stringify(cart));

  	const cartCount = document.getElementById("cart-count");
  	if(cartCount){
    		cartCount.textContent = cart.length;
  	}
}

document.querySelectorAll(".add-to-cart").forEach(button => {
 	button.addEventListener("click", () => {
    		const product = {
      			name: "Elegant Pearl Necklace",
      			price: 189.99
    		};

    		cart.push(product);
    		updateCart();
  	});
});

