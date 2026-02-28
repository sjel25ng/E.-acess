//Slider function
document.querySelectorAll(".slider").forEach(slider => {
	const slides = slider.querySelector(".slides");
	const prev = slider.querySelector(".prev");
	const next = slider.querySelector(".next");
	
	let index = 0;
	
	next.addEventListener("click", () => {
		index++;
		const totalSlides = slider.querySelectorAll(".slide").length;

		if(index >= totalSlides) index = 0;
		slides.style.transform = `translateX(-${index * 100}%)`;
	});
	
	prev.addEventListener("click", () => {
		index--;
		if(index < 0) index = totalSlides - 1;
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
    button.addEventListener("click", (e) => {

        const card = e.target.closest(".product-card");

        const name = card.querySelector("h3").textContent;
        const price = card.querySelector("p").textContent.replace("$", "");

        const product = {
            name: name,
            price: parseFloat(price)
        };

        cart.push(product);
        updateCart();
    });
});

function displayCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    if (!cartItemsContainer) return;

    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const div = document.createElement("div");
        div.innerHTML = `
            <p>${item.name} - $${item.price}</p>
        `;
        cartItemsContainer.appendChild(div);

        total += item.price;
    });

    cartTotal.textContent = total.toFixed(2);
}

displayCart();
updateCart();