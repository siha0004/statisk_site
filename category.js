const URLparams = new URLSearchParams(window.location.search);
const category = URLparams.get("category");
const categoryURL = "https://kea-alt-del.dk/t7/api/categories";
const categoryTemplate = document.querySelector("template");
const categoryContainer = document.querySelector(".category_container");

fetch(categoryURL)
  .then((response) => response.json())
  .then((data) => showCategories(data));

function showCategories(categories) {
  //   console.log("json", categories);
  //   console.log("første json element", categories[0]);

  let categoryClone;

  categories.forEach((cat) => {
    console.log("category", cat);

    categoryClone = categoryTemplate.cloneNode(true).content;
    categoryClone.querySelector("p").textContent = cat.category;

    categoryClone.querySelector(".category").href = `produktliste.html?category=${cat.category}`;

    categoryContainer.appendChild(categoryClone);
  });
}
