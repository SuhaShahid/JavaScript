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

  console.log("Generated URL:", url);
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

  addPagination(totalItems);
}

function filterTable() {
  currentPage = 1;
  fetchData(generateUrl());
}

function updatePage(pageNumber) {
  currentPage = pageNumber;
  fetchData(generateUrl());
}

function addPagination(totalItems) {
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

// let productsData = [];

// let currentPage = 1;
// const itemsPerPage = 20;
// const content = document.querySelector(".content");

// function fetchData() {
//   fetch("https://dummyjson.com/products?limit=0")
//     .then((response) => response.json())
//     .then((data) => {
//       productsData = data.products;
//       displayTable(productsData);
//     })
//     .catch((error) => console.error(error));
// }

// function displayTable(data) {
//   const tableBody = document.getElementById("table-body");

//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const pageItems = data.slice(startIndex, endIndex);

//   let tableContent = "";
//   pageItems.forEach((product) => {
//     tableContent += `
//       <tr>
//         <td>${product.id}</td>
//         <td>${product.title}</td>
//         <td>${product.price}</td>
//         <td>${product.category}</td>
//         <td>${product.rating}</td>
//       </tr>
//     `;
//   });

//   tableBody.innerHTML = tableContent;

//   addPagination(data.length);
// }

// function filterTable() {
//   const searchValue = document.getElementById("search").value.toLowerCase();
//   const filteredData = productsData.filter((product) =>
//     product.title.toLowerCase().includes(searchValue)
//   );
//   displayTable(filteredData);
// }

// document.getElementById("search").addEventListener("input", filterTable);

// fetchData();

// function updatePage(pageNumber) {
//   currentPage = pageNumber;
//   displayTable(productsData);
// }

// function addPagination(totalItems) {
//   const totalPages = Math.round(totalItems / itemsPerPage);
//   const paginationContainer = document.getElementById("pagination");

//   paginationContainer.innerHTML = "";

//   for (let i = 0; i < totalPages; i++) {
//     const pageButton = document.createElement("button");
//     pageButton.innerHTML = i + 1;
//     pageButton.addEventListener("click", () => {
//       updatePage(i + 1);
//     });
//     paginationContainer.appendChild(pageButton);
//   }
// }

// function sortByCategory() {
//   let dropDownMenu = document.getElementById("dropdown");

//   fetch("https://dummyjson.com/products/categories")
//     .then((res) => res.json())
//     .then((categories) => {
//       let options = `<option value="">Select Category </option>`;
//       console.log(categories);

//       categories.forEach((category) => {
//         options += `<option value="${category.slug}">${category.name}</option>`;
//       });
//       dropDownMenu.innerHTML = options;
//     })
//     .catch((error) => console.error(error));
// }
// sortByCategory();
