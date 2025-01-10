//Fetch JSON data
fetch("/json/api2.json")
  .then((response) => response.json()) //Converts the response into a JSON obj
  .then((data) => {
    //Fetched data passed to the data variable
    //select elements:
    const product = document.getElementById("product");
    const itemElement = product.querySelector(".product_ul");

    //Rendering
    //define function:
    function renderProduct(data) {
      itemElement.innerHTML = ""; //Clears the prev contents before adding new products
      data.forEach((product) => {
        //Loops through each products in the data array
        //creating new <div>:
        const productItem = document.createElement("li"); //using <li> since it's a list of items
        productItem.classList.add(".product_item"); //class for styling the css
        productItem.innerHTML = `
            <li>
                <div class="card">
                    <div class="card_top">
                        <div class="img_cont">
                            <img src="${product.img}" alt="Product 1"/>
                        </div>
                        ${generateNew(product.id)}
                        <div class="like">
                            <div class="circle">
                                <div class="like_icon">
                                    <img src="/images/like.svg" alt="Wishlist icon"/>
                                </div>
                            </div>
                            <div class="circle">
                                <div class="like_icon">
                                    <img src="/images/eye_icon.svg" alt="Watch icon"/>
                                </div>
                            </div>
                        </div>
                        ${generatePercentage(product)}
                        <div class="cart">
                            <h6>Add To Cart</h6>
                        </div>
                    </div>
                    <div class="card_bottom">
                        ${generateDiscount(product)}
                        <div class="color">
                            ${generateColorCircles(product.id)}
                        </div>
                    </div>
                </div>
            </li>
        `;
        itemElement.appendChild(productItem); //Appends the li to the ul
      });
    }
    renderProduct(data);
  });

//Function for NEW badge
function generateNew(productId) {
  const newBadge = {
    5: true,
    17: true,
    7: true,
    19: true,
  };
  if (newBadge[productId]) {
    return `
        <div class="new">
            <p>
                NEW
            </p>
        </div>
    `;
  }
  return ""; // Return an empty string for products without new badge
}

//Function for circle
function generateColorCircles(productId) {
  const firstCircleColors = {
    6: "yellow",
    7: "black",
    8: "green",
    5: "red",
    18: "yellow",
    19: "black",
    20: "green",
    17: "red",
  };
  const secCircleColors = {
    6: "pink",
    7: "pink",
    8: "pink",
    5: "pink",
    18: "pink",
    19: "pink",
    20: "pink",
    17: "pink",
  };
  if (firstCircleColors[productId]) {
    return `
        <div class="circle_border">
            <div class="border_circle ${firstCircleColors[productId]}"></div>
        </div>
        <div class="pink_circle ${secCircleColors[productId]}"></div>`;
  }

  return ""; // Return an empty string for products without circles
}

//Function for discount
function generateDiscount(product) {
  const discountPrice = {
    9: true,
    10: true,
    11: true,
  };
  if (discountPrice[product.id]) {
    return `
        <h6>${product.product_name}</h6>
        <div class="pricing_new">
            <div class="discount">
                <p>$${product.price}</p>
                <span>$${product.offer_price}</span>
            </div>
            <div class="stars">
                <img src="${product.star_img}" alt="Star rating"/>
                <span>(${product.review})</span>
            </div>
        </div>`;
  } else {
    return `
        <h6>${product.product_name}</h6>
        <div class="pricing">
            <p>$${product.price}</p>
            <div class="stars">
                <img src="${product.star_img}" alt="Star rating"/>
            </div>
            <span>(${product.review})</span>
        </div>`;
  }
}

//Function for off percentage bagde
function generatePercentage(product) {
  const percentageBadge = {
    9: true,
    10: true,
    11: true,
  };
  if (percentageBadge[product.id]) {
    return `
        <div class="offer">
            <p>
                -${product.percentage}%
            </p>
        </div>
      `;
  }
  return ""; // Return an empty string for products without new badge
}

//Search Results

// fetch("/json/api2.json")
//   .then((response) => response.json())
//   .then((products) => {
//     const searchInput = document.getElementById("searchInput");
//     const searchIcon = document.getElementById("searchIcon");
//     const searchResults = document.querySelector("#searchResults .product_ul");

//     function renderProducts(data) {
//       searchResults.innerHTML = "";
//       if (data.length === 0) {
//         searchResults.innerHTML = "<h4>No results found</h4>";
//         return;
//       }
//       data.forEach((product) => {
//         const productItem = document.createElement("li");
//         productItem.classList.add("product_item");
//         productItem.innerHTML = `
//           <div class="card">
//               <div class="card_top">
//                   <div class="img_cont">
//                       <img src="${product.img}" alt="Product 1"/>
//                   </div>
//                   ${generateNew(product.id)}
//                   <div class="like">
//                       <div class="circle">
//                           <div class="like_icon">
//                               <img src="/images/like.svg" alt="Wishlist icon"/>
//                           </div>
//                       </div>
//                       <div class="circle">
//                           <div class="like_icon">
//                               <img src="/images/eye_icon.svg" alt="Watch icon"/>
//                           </div>
//                       </div>
//                   </div>
//                   <div class="cart">
//                       <h6>Add To Cart</h6>
//                   </div>
//               </div>
//               <div class="card_bottom">
//                   <h6>${product.product_name}</h6>
//                   <div class="pricing">
//                       <p>$${product.price}</p>
//                       <div class="stars">
//                           <img src="${product.star_img}" alt="Star rating"/>
//                       </div>
//                       <span>(${product.review})</span>
//                   </div>
//                   <div class="color">
//                       ${generateColorCircles(product.id)}
//                   </div>
//               </div>
//           </div>
//           `;
//         searchResults.appendChild(productItem);
//       });
//     }
//   });

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const searchIcon = document.getElementById("searchIcon");
  const searchResults = document.querySelector("#searchResults .product_ul");

  let products = []; // Declare products in the global scope

  fetch("/json/api2.json")
    .then((response) => response.json())
    .then((data) => {
      products = data; // Assign fetched data to the global products variable
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
    });

  function renderProducts(data) {
    searchResults.innerHTML = ""; // Clear previous results
    if (data.length === 0) {
      searchResults.innerHTML = "<h4>No results found</h4>";
      return;
    }
    data.forEach((product) => {
      const productItem = document.createElement("li");
      productItem.classList.add("product_item");
      productItem.innerHTML = `
          <div class="card">
              <div class="card_top">
                  <div class="img_cont">
                      <img src="${product.img}" alt="Product 1"/>
                  </div>
                  ${generateNew(product.id)}
                  <div class="like">
                      <div class="circle">
                          <div class="like_icon">
                              <img src="/images/like.svg" alt="Wishlist icon"/>
                          </div>
                      </div>
                      <div class="circle">
                          <div class="like_icon">
                              <img src="/images/eye_icon.svg" alt="Watch icon"/>
                          </div>
                      </div>
                  </div>
                  ${generatePercentage(product)}
                  <div class="cart">
                      <h6>Add To Cart</h6>
                  </div>
              </div>
              <div class="card_bottom">
                  ${generateDiscount(product)}
                  <div class="color">
                      ${generateColorCircles(product.id)}
                  </div>
              </div>
          </div>
        `;
      searchResults.appendChild(productItem); // Append to the list
    });
  }

  function handleSearch() {
    const query = searchInput.value.trim().toLowerCase();
    if (!query) {
      renderProducts([]); // Clear results if search is empty
      return;
    }

    const filteredProducts = products.filter((product) =>
      product.category.toLowerCase().includes(query)
    );
    renderProducts(filteredProducts);
  }

  // Add event listeners
  if (searchIcon) {
    searchIcon.addEventListener("click", handleSearch);
  }

  if (searchInput) {
    searchInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") handleSearch();
    });
  }
});

//Function for searching
function handleSearch(products) {
  const query = searchInput.value.trim().toLowerCase();
  if (!query) {
    renderProducts([]); //clear results if search is empty
  }
  const filteredProducts = products.filter((products) => {
    products.category.toLowerCase().includes(query);
  });
  renderProducts(filteredProducts);
}

//Add event listeners
searchIcon.addEventListener("click", handleSearch);
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") handleSearch();
});

//   const filteredProducts = products.filter((product) =>
//     product.category.toLowerCase().includes(query)
//   );
//   renderProducts(filteredProducts);
// }

// // Add event listeners
// searchIcon.addEventListener("click", handleSearch); // Click on search icon
// searchInput.addEventListener("keydown", (event) => {
//   if (event.key === "Enter") handleSearch(); // Press enter
// });
