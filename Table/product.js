
     fetch(`https://dummyjson.com/products/1`)
       .then((res) => res.json())
       .then((productData) => {
         displayProduct(productData);
       })
       .catch((error) => console.error(error));

   
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
           <p id="prodDesc">${product.description}</p>
           <div class="addToCart">
             <button>Add To Cart</button>
           </div>
         </div>
       </div>`;
   
     productContainer.innerHTML = content;
   }
