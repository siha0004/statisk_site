window.addEventListener("DOMContentLoaded", init);

const productsURL = "https://kea-alt-del.dk/t7/api/products";

let productTemplate;
let productContainer;

function init() {
  console.log("init");

  productTemplate = document.querySelector(".product_template");
  console.log("productTemplate", productTemplate);

  productContainer = document.querySelector(".products_container");
  console.log("productContainer", productContainer);

  fetch(productsURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      showproducts(json);
    });
}

function showproducts(productJSON) {
  //   console.log("json", productJSON);
  //   console.log("første json element", productJSON[0]);

  let productClone;

  productJSON.forEach((product) => {
    console.log("product", product);
    productClone = productTemplate.cloneNode(true).content;
    // productClone.querySelector(".product_image").src = product.image_url;
    productClone.querySelector(".product_image").alt = `Picture of a ${product.name}`;
    productClone.querySelector(".product_name").textContent = product.productdisplayname;
    productClone.querySelector(".product_brand").textContent = product.brandname;
    productClone.querySelector(".product_price").textContent = product.price;
    // productClone.querySelector(".product_price_sale").textContent = product.description;
    // productClone.querySelector(".product_price_old").textContent = product.description;
    productContainer.appendChild(productClone);
  });
}
