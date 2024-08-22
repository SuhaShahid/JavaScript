// const nextButton = document.getElementById("btn-next");
// const prevButton = document.getElementById("btn-prev");
// const cards = document.getElementsByClassName("card-container");

const cards = document.getElementsByClassName("card-container");

const cardContent = `<div id="content">
<p>
Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit aspernatur maiores non harum adipisci provident!
Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit aspernatur maiores non harum adipisci provident!
Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit aspernatur maiores non harum adipisci provident!
Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore voluptas quas reprehenderit placeat saepe deserunt.
Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore voluptas quas reprehenderit placeat saepe deserunt.
</p>
<button id="btn-prev">Previous</button> 
<button id="btn-next">Next</button> 
</div>`;
// const content = document.getElementById("content");
// console.log(content);

console.log(cards[0]);

// const content = document.getElementById("content");
// cards[0].appendChild(cardContent);

cards[0].innerHTML = cardContent;

// console.log(typeof cardContent);

const nextButton = document.getElementById("btn-next");
const prevButton = document.getElementById("btn-prev");

let currentPos = 0;

prevButton.addEventListener("click", () => {
  if (currentPos > 0) {
    moveCard(currentPos - 1);
  }
});

nextButton.addEventListener("click", () => {
  if (currentPos < cards.length - 1) {
    moveCard(currentPos + 1);
  }
});

function moveCard(newPos) {
  cards[currentPos].innerHTML = "";
  cards[newPos].innerHTML = cardContent;
  // newPos++;
  currentPos = newPos;
  console.log(cards[newPos]);

  if (currentPos === 0) {
    prevButton.style.visibility = "hidden";
  } else {
    prevButton.style.visibility = "visible";
  }

  if (currentPos === cards.length - 1) {
    nextButton.style.visibility = "hidden";
  } else {
    nextButton.style.visibility = "visible";
  }
}

nextButton.style.float = "right";
prevButton.style.visibility = "hidden";

// const nextButton = document.createElement("button");
// const prevButton = document.createElement("button");
// const cardContent = document.createElement("div");

// cards[0].appendChild(cardContent);
// cardContent.id = "content";

// const para = document.createElement("p");
// cardContent.appendChild(para);

// const text = document.createTextNode(
//   "Lorem ipsum dolor sit amet consectetur, adipisicing elit.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit aspernatur maiores non harum adipisci provident! Suscipit aspernatur maiores non harum adipisci provident! Lorem ipsum dolor sit amet
// consectetur, adipisicing elit. Suscipit aspernatur maiores non harum adipisci provident!"
// );
// para.appendChild(text);

// prevButton.textContent = "Previous";
// cardContent.appendChild(prevButton);

// nextButton.textContent = "Next";
// cardContent.appendChild(nextButton);
