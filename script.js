const searchBtn = document.getElementById("search-btn");
const product = document.getElementById("product");
const productDetails = document.getElementById("product-details");
const productCloseBtn = document.getElementById("product-close-btn");

searchBtn.addEventListener("click", getProductList);
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

      if (topItems) {
        topItems.forEach((product) => {
          html += `
                    <div class = "product-item" data-id = "${product.category}">
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

        product.classList.remove("notFound");
      } else {
        html = "Sorry, we didn't find any products related to your search!";
        product.classList.add("notFound");
      }

      product.innerHTML = html;
    });
}
