function fetchData() {
  const productId = new URLSearchParams(window.location.search).get("id");
  fetch(`https://dummyjson.com/products/${productId}`)
    .then((res) => res.json())
    .then((product) => {
      displayProduct(product);
    })
    .catch((error) => console.error(error));
    console.log(productId);
    
}

function displayProduct(product) {
  let productContainer = document.querySelector(".productContainer");

  let content = `
       <div class="container">
         <div class="imageContainer">
           <img src="${product.thumbnail}" alt="${product.title}" />
         </div>
         <div class="details">
           <h1>${product.title}</h1>
           <h3>Price: $${product.price}</h3>
           <h4>Rating: ${product.rating}</h4>
           <h4>Category: ${product.category}</h4>
           <p id="prodDesc">${product.description}</p>
           <div class="addToCart">
             <button id=
             "addToCartbtn">Add To Cart</button>
           </div>
         </div>
       </div>`;

  productContainer.innerHTML = content;
}

fetchData();
