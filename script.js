const slides = document.querySelector('.slides');
const slide = document.querySelectorAll('.slide');
const next = document.querySelector('.next');
const prev = document.querySelector('.prev');

let index = 0;

function updateSlide() {
  slides.style.transform = `translateX(-${index * 100}%)`;
}

next.addEventListener('click', () => {
  index++;
  if (index >= slide.length) index = 0;
  updateSlide();
});

prev.addEventListener('click', () => {
  index--;
  if (index < 0) index = slide.length - 1;
  updateSlide();
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