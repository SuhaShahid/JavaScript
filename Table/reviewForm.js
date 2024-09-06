let nameTxt = document.getElementById("name");
let rating = document.getElementById("rating");
let customerReview = document.getElementById("subject");
let submitbtn = document.getElementById("submitbtn");

function setInput() {
  const name = document.querySelector("#name").value;
  nameTxt.textContent = name;
  localStorage.setItem("name", name);
}

function getReview() {
  let reviewForm = document.querySelector(".reviewForm");
  let form = `<form action="product.html">
          <label for="fname">Name</label>
          <input
            type="text"
            id="name"
            name="firstname"
            placeholder="Your name.."
          />

          <label for="rating">Rating</label>
          <input type="text" id="rating" placeholder="Rate the product..">
          <label for="subject">Review</label>
          <textarea
            id="subject"
            name="subject"
            placeholder="Write something.."
            style="height: 150px"
          ></textarea>

          <input id="submitbtn" type="submit" value="Submit">
          </form>
          `;
  reviewForm.innerHTML = form;
}

getReview();
setInput();