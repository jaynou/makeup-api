const searchBtn = document.getElementById("search-btn");
const product = document.getElementById("product");
const productDetails = document.getElementById("product-details");
const productCloseBtn = document.getElementById("product-close-btn");

searchBtn.addEventListener("click", getProductList);
product.addEventListener("click", getProductDetails);
productCloseBtn.addEventListener("click", () => {
  productDetailsContent.parentElement.classList.remove("showDetails");
});

// Get list of makeup products related to search
function getProductList() {
  let searchInputTxt = document.getElementById("search-input").value.trim();
  fetch(
    `http://makeup-api.herokuapp.com/api/v1/products.json?product_type=${searchInputTxt}`
  )
    .then((response) => response.json())
    .then((data) => {
      const topItems = data.slice(0, 12);
      console.log(topItems);

      let html = "";

      if (topItems.product) {
        topItems.product.forEach((product) => {
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

// Get makeup product details
function getProductDetails() {
  e.preventDefault();
  if (e.target.classList.contains("search-btn")) {
    let product = e.target.parentElement.parentElement;
    fetch(
      `http://makeup-api.herokuapp.com/api/v1/products.json?product_type=${product_type.dataset.id}`
    )
      .then((response) => response.json())
      .then((data) => productDetailModal(data.products));
  }
}
