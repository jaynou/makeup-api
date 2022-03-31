const searchBtn = document.getElementById("search-btn");

searchBtn.addEventListener("click", getProductList);

function getProductList() {
  let searchInputTxt = document.getElementById("search-input").value.trim();
  fetch(
    `http://makeup-api.herokuapp.com/api/v1/products.json?product_type=${searchInputTxt}`
  )
    .then((response) => response.json())
    .then((data) => {
      const topItems = data.slice(0, 12);
      console.log(topItems);
    });
}
