function fetchData() {
  const productId = new URLSearchParams(window.location.search).get("id");
  fetch(`https://dummyjson.com/products/${productId}`)
    .then((res) => res.json())
    .then((product) => {
      displayProduct(product);
      displayReviews(productId, product.reviews);
    })
    .catch((error) => console.error(error));
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
          <button id="addToCartbtn">Add To Cart</button>
        </div>
      </div>
    </div>`;
  
  productContainer.innerHTML = content;
}

function displayReviews(productId, apiReviews) {
  let reviewContainer = document.querySelector(".reviewContainer");
  let storedReviews = JSON.parse(localStorage.getItem(`reviews-${productId}`)) || [];

  let allReviews = [...apiReviews, ...storedReviews];
  let reviewContent = "";

  if (allReviews.length) {
    allReviews.forEach(review => {
      reviewContent += `
        <div class="reviewData">
          <h3>${review.reviewerName || review.name}</h3>
          <p>${review.comment || review.subject}</p>
          <h4>Rating: ${review.rating}</h4>
        </div>`;
    });
  } else {
    reviewContent = "<p>No reviews yet. Be the first to add one!</p>";
  }

  reviewContainer.innerHTML = reviewContent;

  showReviewForm(productId);
}

function showReviewForm(productId) {
  let reviewForm = document.querySelector(".reviewForm");

  let form = `
    <form id="reviewForm">
      <label for="fname">Name</label>
      <input type="text" id="name" name="firstname" placeholder="Your name.." required />

      <label for="rating">Rating</label>
      <input type="number" id="rating" name="rating" placeholder="Rate the product.." min="1" max="5" required />

      <label for="subject">Review</label>
      <textarea id="subject" name="subject" placeholder="Write something.." style="height: 150px" required></textarea>

      <button type="submit">Submit</button>
    </form>`;
    
  reviewForm.innerHTML = form;

  document.getElementById("reviewForm").addEventListener("submit", function (event) {
    event.preventDefault();
    addReview(productId);
  });
}

function addReview(productId) {
  const name = document.getElementById("name").value;
  const rating = document.getElementById("rating").value;
  const subject = document.getElementById("subject").value;

  let newReview = {
    name: name,
    rating: rating,
    subject: subject
  };

  let storedReviews = JSON.parse(localStorage.getItem(`reviews-${productId}`)) || [];

  storedReviews.push(newReview);

  localStorage.setItem(`reviews-${productId}`, JSON.stringify(storedReviews));

  document.querySelector(".reviewContainer").innerHTML += `
    <div class="reviewData">
      <h3>${newReview.name}</h3>
      <p>${newReview.subject}</p>
      <h4>Rating: ${newReview.rating}</h4>
    </div>`;

  document.getElementById("reviewForm").reset();
}

fetchData();
