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
  let reviewContainer = document.querySelector(".reviewContainer");
  let btnContainer = document.querySelector(".btnContainer")
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
       </div>
       `;

  let review = "";
  product.reviews.forEach((reviews) => {
    review += `<div class="reviewData">
                <h3>${reviews.reviewerName}</h3>
                         
                <p>
                ${reviews.comment}
                </p>
                <h4>Rating:${reviews.rating}</h4>
               </div>
               `;
  });
  let btnRev=`<button onclick="location.href='review.html' ">Add Review</button>`
  productContainer.innerHTML = content;
  reviewContainer.innerHTML = review;
  btnContainer.innerHTML= btnRev;
}

fetchData();
