//slider
const slidesContainer = document.querySelector('.slides');
const slideItems = document.querySelectorAll('.slide');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

let index = 0;

function updateSlide() {
  if (!slidesContainer) return;
  slidesContainer.style.transform = `translateX(-${index * 100}%)`; // Move slides horizontally
}

if (slidesContainer && nextBtn && prevBtn) { // Ensure elements exist before adding event listeners

  nextBtn.addEventListener('click', () => { 
    index++;
    if (index >= slideItems.length) index = 0;
    updateSlide(); // Update slide position
  });

  prevBtn.addEventListener('click', () => {
    index--;
    if (index < 0) index = slideItems.length - 1;
    updateSlide(); 
  });

}

//cart
let cart = JSON.parse(localStorage.getItem("cart")) || []; // Load cart from localStorage or initialize as empty array

//header
function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  if (!cartCount) return; // Ensure cartCount element exists

  const itemCount = cart.length;
  const total = cart.reduce((sum, item) => sum + item.price, 0); // Calculate total price of items in cart

  cartCount.textContent =
    `${itemCount} item${itemCount !== 1 ? "s" : ""} – $${total.toFixed(2)}`; // Update cart count and total price in header
}

//add to cart
function addToCart(name, price) {
  const product = {
    name: name,
    price: parseFloat(price) // Ensure price is stored as a number for accurate calculations
  };

  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart)); // Save updated cart to localStorage

  updateCartCount();
  displayCart();
}

document.querySelectorAll(".add-to-cart").forEach(button => { // Add event listeners to all "Add to Cart" buttons
  button.addEventListener("click", () => {
    const name = button.dataset.name;
    const price = button.dataset.price;
    addToCart(name, price);
  });
});


function displayCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  const totalContainer = document.getElementById("cart-total");

  if (!cartItemsContainer) return; 

  cartItemsContainer.innerHTML = ""; // Clear existing cart items before displaying updated cart

//group items
const grouped = {};

  cart.forEach(item => {
  if (!item.name || isNaN(item.price)) return; // Skip items with missing name or invalid price

  if (!grouped[item.name]) {
    grouped[item.name] = {
      price: parseFloat(item.price), // Ensure price is stored as a number for accurate calculations
      quantity: 1
    };
  } else {
    grouped[item.name].quantity++; // Increment quantity for existing items in the cart
  }
});

  let total = 0;

  Object.keys(grouped).forEach(name => { // Iterate over grouped items to calculate total and display each item in the cart
    const item = grouped[name];
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const div = document.createElement("div");
    div.classList.add("cart-item"); // Add class for styling cart items

    div.innerHTML = ` 
      <span>${name} (${item.quantity})</span>
      <span>$${itemTotal.toFixed(2)}</span> 
      <button class="remove-item" data-name="${name}">✕</button>
    `; // Display item name, quantity, total price for that item, and a remove button

    cartItemsContainer.appendChild(div);
  });

  if (totalContainer) {
    totalContainer.textContent = total.toFixed(2);
  } // Update total price in the cart display

  //remove from cart
  document.querySelectorAll(".remove-item").forEach(button => {
    button.addEventListener("click", () => {
      const name = button.dataset.name; // Get the name of the item to be removed from the cart using data attribute

      const index = cart.findIndex(item => item.name === name); // Find the index of the first occurrence of the item in the cart array based on its name
      if (index > -1) {
        cart.splice(index, 1);
      }

      localStorage.removeItem("cart"); // Clear the entire cart from localStorage to ensure it reflects the updated cart state after an item is removed
      updateCartCount();
      displayCart();
    });
  });
}


//clear cart

const clearBtn = document.getElementById("clear-cart"); // Get the "Clear Cart" button element by its ID

if (clearBtn) { // Ensure the "Clear Cart" button exists before adding an event listener
  clearBtn.addEventListener("click", () => {
    cart = [];
    localStorage.removeItem("cart");
    updateCartCount();
    displayCart();
  });
}

updateCartCount();
displayCart();