// https://kea-alt-del.dk/t7/api/products/1165

const productsURL = "https://kea-alt-del.dk/t7/api/products/1525";

fetch(productsURL)
  .then((response) => response.json())
  .then((data) => showProduct(data));

function showProduct(product) {
  document.querySelector(".product_image").src = `https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp`;
  document.querySelector(".product_image").alt = `Picture of a ${product.name}`;
  document.querySelector(".product_name").textContent = product.productdisplayname;
  document.querySelector(".product_brand").textContent = product.brandname;
  document.querySelector(".product_price").textContent = product.price;
  document.querySelector(".product_description").innerHTML = product.description;
  document.querySelector(".product_material").innerHTML = product.materialcaredesc;
}
