// import { cart } from "../data/cart";
// import { products } from "../data/products";

let html = '';

products.forEach((product) => {
   html += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image" src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars" src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${(product.priceCents / 100).toFixed(2)}
      </div>

      <div class="product-quantity-container">
        <select class='js-quantity' data-product-name="${product.name}">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart js-added-to-cart" style="display: none;">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button primary-button js-add-to-cart" data-product-name="${product.name}">
        Add to Cart
      </button>
    </div>
  `;
});

document.querySelector('.js-products').innerHTML = html;

document.querySelectorAll('.js-add-to-cart').forEach((button) => {
  button.addEventListener('click', () => {
    const productName = button.dataset.productName;
    const quantityElement = button.parentElement.querySelector('.js-quantity');
    const quantity = parseInt(quantityElement.value);

    let matchingItem = cart.find(cartItem => cartItem.productName === productName);

    if (matchingItem) {
      matchingItem.quantity += quantity;
    } else {
      cart.push({
        productName: productName,
        quantity: quantity
      });
    }

    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    let cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;

    // Show "Added to cart" message
    button.previousElementSibling.style.display = 'block';

    console.log(cart);
  });
});

