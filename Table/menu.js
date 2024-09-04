let productsData = [];
let totalItems = 0;
let currentPage = 1;
const itemsPerPage = 20;

function fetchData(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      totalItems = data.total;
      productsData = data.products;
      displayTable(productsData);
    })
    .catch((error) => console.error(error));
}

function generateUrl() {
  const searchValue = document.getElementById("search").value.toLowerCase();
  const selectedCategory = document.getElementById("dropdown").value;
  const skip = (currentPage - 1) * itemsPerPage;

  let url = `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${skip}`;

  if (searchValue) {
    url = `https://dummyjson.com/products/search?q=${searchValue}&limit=${itemsPerPage}&skip=${skip}`;
  } else if (selectedCategory) {
    url = `https://dummyjson.com/products/category/${selectedCategory}?limit=${itemsPerPage}&skip=${skip}`;
  }

  return url;
}

function displayTable(data) {
  const tableBody = document.getElementById("table-body");

  if (!data.length) {
      tableBody.innerHTML = "<tr><td colspan='5'>No results found</td></tr>";
      return;
    }
  let tableContent = "";
  data.forEach((product) => {
    tableContent += `
      <tr>
        <td>${product.id}</td>
        <td>${product.title}</td>
        <td>${product.price}</td>
        <td>${product.category}</td>
        <td>${product.rating}</td>
      </tr>
      `;
  });

  tableBody.innerHTML = tableContent;

  addingPagination(totalItems);
}

function filterTable() {
  currentPage = 1;
  fetchData(generateUrl());
}

function updatePage(pageNumber) {
  currentPage = pageNumber;
  fetchData(generateUrl());
}

function addingPagination(totalItems) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginationContainer = document.getElementById("pagination");

  paginationContainer.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement("button");
    pageButton.innerHTML = i;
    pageButton.className = i === currentPage ? "active" : "";
    pageButton.addEventListener("click", () => updatePage(i));
    paginationContainer.appendChild(pageButton);
  }

  console.log("Total Pages:", totalPages);
}

function fetchCategories() {
  fetch("https://dummyjson.com/products/categories")
    .then((res) => res.json())
    .then((categories) => {
      let dropDownMenu = document.getElementById("dropdown");
      let options = `<option value="">Select Category</option>`;

      categories.forEach((category) => {
        options += `<option value="${category.slug}">${category.name}</option>`;
      });

      dropDownMenu.innerHTML = options;
    })
    .catch((error) => console.error(error));
}

document.getElementById("search").addEventListener("input", filterTable);
document.getElementById("dropdown").addEventListener("change", () => {
  currentPage = 1;
  fetchData(generateUrl());
});

fetchData(generateUrl());
fetchCategories();
