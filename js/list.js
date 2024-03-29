window.addEventListener("DOMContentLoaded", init);
const URLparams = new URLSearchParams(window.location.search);
const category = URLparams.get("category");
const productsURL = "https://kea-alt-del.dk/t7/api/products?category=" + category;

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
    productClone.querySelector(".product_price").textContent = product.price;

    if (product.discount) {
      console.log("product.discount", product.discount);
      productClone.querySelector(".product_flag").classList.add("sale");
      productClone.querySelector(".product_flag").textContent = `- ${product.discount}%`;

      let discountPrice;

      discountNum = product.price * (product.discount / 100);
      discountPrice = product.price - discountNum;

      productClone.querySelector(".product_price").textContent = discountPrice.toFixed(2);
      productClone.querySelector(".product_price_old").textContent = product.price.toFixed(2);
    } else {
      productClone.querySelector(".product_price").classList.remove("product_price_sale");
      productClone.querySelector(".product_price_kr").classList.remove("product_price_sale");
      productClone.querySelector(".dot").classList.add("hide");
      productClone.querySelector(".product_price_old").classList.add("hide");
      productClone.querySelector(".product_price_old_kr").classList.add("hide");
    }

    if (product.soldout) {
      console.log("product.soldout", product.soldout);
      productClone.querySelector(".product_image").classList.add("image_sold");
      // productClone.querySelector(".product_flag").classList.remove("sale");
      productClone.querySelector(".product_flag").classList.add("sold");
      productClone.querySelector(".product_flag").textContent = "Sold out";
    }

    productClone.querySelector(".product_name").textContent = product.productdisplayname;
    productClone.querySelector(".product_brand").textContent = product.brandname;

    productClone.querySelector(".product_card").href = `produkt.html?id=${product.id}`;

    productContainer.appendChild(productClone);
  });
}
