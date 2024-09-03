let productsData = [];

let currentPage = 1;
let itemsPerPage = 20;

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
}

function filterTable() {
  const searchValue = document.getElementById("search").value.toLowerCase();
  const filteredData = productsData.filter((product) =>
    product.title.toLowerCase().includes(searchValue)
  );
  displayTable(filteredData);
}

document.getElementById("search").addEventListener("input", filterTable);

fetchData();

function updatePage() {}

function addPagination() {
  let pageDiv = document.createElement("div");
  let body1 = document.getElementsByTagName('body')
  body1.appendChild(pageDiv)
  let pageNo = document.createElement("a");
  let log8 = pageDiv.appendChild(pageNo);

  // for (let index = 0; index < data.length; index++) {
  //     pageNo;
  // }

  console.log(log8);
}
