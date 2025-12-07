import { menuArray } from "./data.js";

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
  return feedHtml;
}

function render() {
  document.getElementById("feed").innerHTML = getFeedHtml();
}

render();
