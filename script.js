// script.js (with online product images)
let cart = JSON.parse(localStorage.getItem('cart')) || [];

const products = [
  { name: "T-Shirt", price: 20, img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&auto=format&fit=crop&q=80" },
  { name: "Jeans", price: 40, img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&auto=format&fit=crop&q=80" },
  { name: "Jacket", price: 60, img: "https://images.unsplash.com/photo-1584378868070-4a26cf1b7a1e?w=600&auto=format&fit=crop&q=80" },
  { name: "Sneakers", price: 50, img: "https://images.unsplash.com/photo-1584735174914-6b8e86b57b83?w=600&auto=format&fit=crop&q=80" },
  { name: "Cap", price: 15, img: "https://images.unsplash.com/photo-1621184455862-f07e0f932f63?w=600&auto=format&fit=crop&q=80" },
  { name: "Hoodie", price: 35, img: "https://images.unsplash.com/photo-1593032465171-8b45b4d7dc39?w=600&auto=format&fit=crop&q=80" },
  { name: "Skirt", price: 25, img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=600&auto=format&fit=crop&q=80" },
  { name: "Dress", price: 55, img: "https://images.unsplash.com/photo-1520975916090-310aaa04e1a5?w=600&auto=format&fit=crop&q=80" }
];



function renderProducts() {
  const productList = document.getElementById('product-list');
  if (!productList) return;

  products.forEach((product, index) => {
    const div = document.createElement('div');
    div.classList.add('product-card');
    div.innerHTML = `
      <img src="${product.img}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>$${product.price.toFixed(2)}</p>
      <button class="btn add-btn" data-index="${index}">Add to Cart</button>`;
    productList.appendChild(div);
  });
}

function addToCart(index) {
  cart.push(products[index]);
  localStorage.setItem('cart', JSON.stringify(cart));
  showToast(`${products[index].name} added to cart!`);
}

function renderCart() {
  const cartContainer = document.getElementById('cart-container');
  if (!cartContainer) return;

  cartContainer.innerHTML = '';
  if (cart.length === 0) {
    cartContainer.innerHTML = '<p>Your cart is empty.</p>';
    return;
  }

  let total = 0;
  cart.forEach((item, index) => {
    total += item.price;
    const div = document.createElement('div');
    div.classList.add('cart-item');
    div.innerHTML = `
      ${item.name} - $${item.price.toFixed(2)} 
      <button class="btn remove-btn" data-index="${index}">Remove</button>`;
    cartContainer.appendChild(div);
  });

  const totalDiv = document.createElement('div');
  totalDiv.innerHTML = `<h3>Total: $${total.toFixed(2)}</h3><a href='checkout.html' class='btn'>Proceed to Checkout</a>`;
  cartContainer.appendChild(totalDiv);
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

function showToast(message) {
  let toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerText = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

function animateOnScroll() {
  const elements = document.querySelectorAll('.product-card, form');
  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
      el.classList.add('visible');
    }
  });
}

function handleForms() {
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Form submitted successfully!');
      setTimeout(() => window.location.href = 'index.html', 2000);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  renderCart();
  handleForms();

  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-btn')) {
      addToCart(e.target.dataset.index);
    }
    if (e.target.classList.contains('remove-btn')) {
      removeFromCart(e.target.dataset.index);
    }
  });

  animateOnScroll();
  window.addEventListener('scroll', animateOnScroll);
});