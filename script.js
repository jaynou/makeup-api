const searchBtn = document.getElementById("search-btn");
const productList = document.getElementById("product");
const productDetailsContent = document.querySelector(
  ".product-details-content"
);
const productCloseBtn = document.getElementById("product-close-btn");

// event listeners
searchBtn.addEventListener("click", getProductList);
productList.addEventListener("click", getProductDetails);
productCloseBtn.addEventListener("click", () => {
  productDetailsContent.parentElement.classList.remove("showDetails");
});

// get meal list that matches with the ingredients
function getProductList() {
  let searchInputTxt = document.getElementById("search-input").value.trim();

  // API Call
  fetch(
    `http://makeup-api.herokuapp.com/api/v1/products.json?product_type=${searchInputTxt}`
  )
    .then((response) => response.json())
    .then((data) => {
      let html = "";

      if (data.product) {
        data.product.forEach((product) => {
          html += `
                    <div class = "product-item" data-id = "${product.name}">
                        <div class = "meal-img">
                            <img src = "${product.api_featured_image}" alt = "makeup">
                        </div>
                        <div class = "product-name">
                            <h3>${product.name}</h3>
                            <a href = "#" class = "product-btn">Get Product</a>
                        </div>
                    </div>
                `;
        });
        productList.classList.remove("notFound");
      } else {
        html = "Sorry, we didn't find any products related to your search!";
        productList.classList.add("notFound");
      }

      productList.innerHTML = html;
    });
}

// get recipe of the meal
function getProductDetails(e) {
  e.preventDefault();
  if (e.target.classList.contains("recipe-btn")) {
    let mealItem = e.target.parentElement.parentElement;
    fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`
    )
      .then((response) => response.json())
      .then((data) => mealRecipeModal(data.meals));
  }
}

// create a modal
function makeupProductModal(product) {
  console.log(product);
  product = product[0];
  let html = `
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <p class = "recipe-category">${meal.strCategory}</p>
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class = "recipe-meal-img">
            <img src = "${meal.strMealThumb}" alt = "">
        </div>
        <div class = "recipe-link">
            <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
        </div>
    `;

  productDetailsContent.innerHTML = html;
  productDetailsContent.parentElement.classList.add("showProduct");
}
