// https://kea-alt-del.dk/t7/api/products/1165

const URLparams = new URLSearchParams(window.location.search);
const id = URLparams.get("id");
const productsURL = "https://kea-alt-del.dk/t7/api/products/" + id;

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

  if (product.discount) {
    console.log("product.discount", product.discount);
    document.querySelector(".product_flag").classList.remove("sold");
    document.querySelector(".product_flag").classList.add("sale");
    document.querySelector(".product_flag").textContent = `- ${product.discount}%`;

    let discountPrice;
    discountNum = product.price * (product.discount / 100);
    discountPrice = product.price - discountNum;

    document.querySelector(".product_price").textContent = discountPrice.toFixed(2);
    document.querySelector(".product_price_old").textContent = product.price.toFixed(2);
  } else {
    document.querySelector(".product_price").classList.remove("product_price_sale");
    document.querySelector(".product_price_kr").classList.remove("product_price_sale");
    document.querySelector(".dot").classList.add("hide");
    document.querySelector(".product_price_old").classList.add("hide");
    document.querySelector(".product_price_old_kr").classList.add("hide");
  }

  if (product.soldout) {
    console.log("product.soldout", product.soldout);
    document.querySelector(".product_image").classList.add("image_sold");
    document.querySelector(".product_flag").classList.add("sold");
    document.querySelector(".product_flag").textContent = "Sold out";
  }
}
