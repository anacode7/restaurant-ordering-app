import { menuArray } from "./data.js";

let order = [];

document.addEventListener("click", function (e) {
  if (e.target.dataset.add) {
    handleAddClick(e.target.dataset.add);
  } else if (e.target.dataset.remove) {
    handleRemoveClick(e.target.dataset.remove);
  } else if (e.target.id === "complete-order-btn") {
    handleCompleteOrderClick();
  }
});

function handleCompleteOrderClick() {
  document.getElementById("modal").classList.remove("hidden");
}

function handleAddClick(itemId) {
  const targetOrderObj = order.filter(function (item) {
    return item.id == itemId;
  })[0];

  if (targetOrderObj) {
    targetOrderObj.quantity++;
  } else {
    const targetMenuObj = menuArray.filter(function (menu) {
      return menu.id == itemId;
    })[0];
    order.push({
      ...targetMenuObj,
      quantity: 1,
    });
  }
  render();
}

function handleRemoveClick(itemId) {
  const targetOrderObj = order.filter(function (item) {
    return item.id == itemId;
  })[0];

  if (targetOrderObj) {
    targetOrderObj.quantity--;
    if (targetOrderObj.quantity === 0) {
      const index = order.indexOf(targetOrderObj);
      order.splice(index, 1);
    }
  }
  render();
}

function getFeedHtml() {
  let feedHtml = ``;

  menuArray.forEach(function (menu) {
    feedHtml += `
<div class="menu-item">
    <div class="menu-inner">
        <div class="menu-emoji">${menu.emoji}</div>
        <div class="menu-details">
            <h2 class="menu-name">${menu.name}</h2>
            <p class="menu-ingredients">${menu.ingredients.join(", ")}</p>
            <p class="menu-price">$${menu.price}</p>
        </div>
        <button class="add-btn" data-add="${menu.id}">+</button>
    </div>
</div>
`;
  });

  // Add the Order section if we have items
  if (order.length > 0) {
    feedHtml += getOrderHtml();
  }

  return feedHtml;
}

function getOrderHtml() {
  let orderHtml = `
    <div class="order-section">
        <h3 class="order-title">Your order</h3>
        <div class="order-items">
    `;

  let totalPrice = 0;

  order.forEach(function (item) {
    totalPrice += item.price * item.quantity;
    orderHtml += `
            <div class="order-item">
                <div class="order-item-info">
                    <h3 class="order-item-name">${item.name}</h3>
                    <button class="quantity-btn remove" data-remove="${
                      item.id
                    }">-</button>
                    <span class="quantity-text">${item.quantity}</span>
                    <button class="quantity-btn add" data-add="${
                      item.id
                    }">+</button>
                </div>
                <p class="order-item-price">$${item.price * item.quantity}</p>
            </div>
        `;
  });

  orderHtml += `
        </div>
        <div class="order-divider"></div>
        <div class="total-section">
            <h3 class="total-title">Total price:</h3>
            <p class="total-price">$${totalPrice}</p>
        </div>
        <button class="complete-order-btn" id="complete-order-btn">Complete order</button>
    </div>
    `;

  return orderHtml;
}

function render() {
  document.getElementById("feed").innerHTML = getFeedHtml();
}

render();
