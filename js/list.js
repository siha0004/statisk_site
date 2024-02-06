window.addEventListener("DOMContentLoaded", init);

const productsURL = "https://kea-alt-del.dk/t7/api/products?start=10";

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
    // console.log("product", product);

    productClone = productTemplate.cloneNode(true).content;
    productClone.querySelector(".product_image").src = `https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp`;
    productClone.querySelector(".product_image").alt = `Picture of a ${product.name}`;

    if (product.soldout) {
      console.log("product.soldout", product.soldout);
      productClone.querySelector(".product_image").classList.remove("image_sold");
      productClone.querySelector(".product_flag").classList.remove("sold");
      productClone.querySelector(".product_flag").textContent = "";
    }

    productClone.querySelector(".product_name").textContent = product.productdisplayname;
    productClone.querySelector(".product_brand").textContent = product.brandname;
    productClone.querySelector(".product_price").textContent = product.price;
    // productClone.querySelector(".product_price_sale").textContent = product.description;
    // productClone.querySelector(".product_price_old").textContent = product.description;

    productClone.querySelector(".product_card").href = `produkt.html?id=${product.id}`;

    productContainer.appendChild(productClone);
  });
}
