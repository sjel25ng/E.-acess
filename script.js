/* =========================
   SLIDER (säker version)
========================= */

const slidesContainer = document.querySelector('.slides');
const slideItems = document.querySelectorAll('.slide');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

let index = 0;

function updateSlide() {
  if (!slidesContainer) return;
  slidesContainer.style.transform = `translateX(-${index * 100}%)`;
}

if (slidesContainer && nextBtn && prevBtn) {

  nextBtn.addEventListener('click', () => {
    index++;
    if (index >= slideItems.length) index = 0;
    updateSlide();
  });

  prevBtn.addEventListener('click', () => {
    index--;
    if (index < 0) index = slideItems.length - 1;
    updateSlide();
  });

}


/* =========================
   CART SYSTEM
========================= */

// Hämta cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];


/* ===== HEADER UPDATE ===== */

function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  if (!cartCount) return;

  const itemCount = cart.length;
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  cartCount.textContent =
    `${itemCount} item${itemCount !== 1 ? "s" : ""} – $${total.toFixed(2)}`;
}


/* ===== ADD TO CART ===== */

function addToCart(name, price) {
  const product = {
    name: name,
    price: parseFloat(price)
  };

  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount();
  displayCart();
}


// Add-to-cart knappar
document.querySelectorAll(".add-to-cart").forEach(button => {
  button.addEventListener("click", () => {
    const name = button.dataset.name;
    const price = button.dataset.price;
    addToCart(name, price);
  });
});


/* ===== DISPLAY CART PAGE ===== */

function displayCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  const totalContainer = document.getElementById("cart-total");

  if (!cartItemsContainer) return;

  cartItemsContainer.innerHTML = "";

  // Gruppera produkter
const grouped = {};

  cart.forEach(item => {
  if (!item.name || isNaN(item.price)) return;

  if (!grouped[item.name]) {
    grouped[item.name] = {
      price: parseFloat(item.price),
      quantity: 1
    };
  } else {
    grouped[item.name].quantity++;
  }
});

  let total = 0;

  Object.keys(grouped).forEach(name => {
    const item = grouped[name];
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const div = document.createElement("div");
    div.classList.add("cart-item");

    div.innerHTML = `
      <span>${name} (${item.quantity})</span>
      <span>$${itemTotal.toFixed(2)}</span>
      <button class="remove-item" data-name="${name}">✕</button>
    `;

    cartItemsContainer.appendChild(div);
  });

  if (totalContainer) {
    totalContainer.textContent = total.toFixed(2);
  }

  // Remove-knappar
  document.querySelectorAll(".remove-item").forEach(button => {
    button.addEventListener("click", () => {
      const name = button.dataset.name;

      const index = cart.findIndex(item => item.name === name);
      if (index > -1) {
        cart.splice(index, 1);
      }

      localStorage.removeItem("cart");
      updateCartCount();
      displayCart();
    });
  });
}


/* ===== CLEAR CART ===== */

const clearBtn = document.getElementById("clear-cart");

if (clearBtn) {
  clearBtn.addEventListener("click", () => {
    cart = [];
    localStorage.removeItem("cart");
    updateCartCount();
    displayCart();
  });
}


/* ===== INIT ===== */

updateCartCount();
displayCart();