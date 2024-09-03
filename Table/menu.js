let productsData = [];

let currentPage = 1;
const itemsPerPage = 20;
const content = document.querySelector(".content");

function fetchData() {
  fetch("https://dummyjson.com/products?limit=0")
    .then((response) => response.json())
    .then((data) => {
      productsData = data.products;
      displayTable(productsData);
    })
    .catch((error) => console.error(error));
}

function displayTable(data) {
  const tableBody = document.getElementById("table-body");

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pageItems = data.slice(startIndex, endIndex);

  let tableContent = "";
  pageItems.forEach((product) => {
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

  addPagination(data.length);
}

function filterTable() {
  const searchValue = document.getElementById("search").value.toLowerCase();
  const filteredData = productsData.filter((product) =>
    product.title.toLowerCase().includes(searchValue)
  );
  currentPage = 1;
  displayTable(filteredData);
}

document.getElementById("search").addEventListener("input", filterTable);

fetchData();

function updatePage(pageNumber) {
  currentPage = pageNumber;
  displayTable(productsData);
}

function addPagination(totalItems) {
  const totalPages = Math.round(totalItems / itemsPerPage);
  const paginationContainer = document.getElementById("pagination");

  paginationContainer.innerHTML = "";

  for (let i = 0; i < totalPages; i++) {
    const pageButton = document.createElement("button");
    pageButton.textContent = i + 1;
    pageButton.addEventListener("click", () => {
      updatePage(i + 1);
      updateActiveButtonStates();
    });
    paginationContainer.appendChild(pageButton);
  }

  updateActiveButtonStates();
}

function updateActiveButtonStates() {
  const pageButtons = document.querySelectorAll(".pagination button");
  pageButtons.forEach((button, index) => {
    if (index + 1 === currentPage) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });
}

function sortByCategory() {
  let dropDownMenu = document.getElementById('dropdown');

  fetch("https://dummyjson.com/products/categories")
    .then((res) => res.json())
    .then((categories) => {
      let options = `<option value="">Select Category </option>`;

      categories.forEach((category) => {
        options += `<option value="${category}">${category}</option>`;
      });
      dropDownMenu.innerHTML = options;
    })
    .catch((error)=>console.error(error))
}
sortByCategory();
