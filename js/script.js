//Fetch JSON data
fetch("/json/api.json")
  .then((response) => response.json()) //Converts the response into a JSON obj
  .then((data) => {
    //Fetched data passed to the data variable
    //select elements:

    //Products-
    const product = document.getElementById("product");
    const itemElement = product.querySelector(".product_ul");

    //Rendering
    //define function:

    //Product rendering function-
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
                        <div class="cart">
                            <h6>Add To Cart</h6>
                        </div>
                    </div>
                    <div class="card_bottom">
                        <h6>${product.product_name}</h6>
                        <div class="pricing">
                            <p>$${product.price}</p>
                            <div class="stars">
                                <img src="${
                                  product.star_img
                                }" alt="Star rating"/>
                            </div>
                            <span>(${product.review})</span>
                        </div>
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

//Category-
fetch("/json/apicat.json")
  .then((response) => response.json()) //Converts the response into a JSON obj
  .then((data) => {
    const category = document.getElementById("category");
    const itemCatElement = category.querySelector(".category_ul");
    //Category rendering function-
    function renderCategory(data) {
      itemCatElement.innerHTML = "";
      data.forEach((category) => {
        const categoryItem = document.createElement("li");
        categoryItem.classList.add("category_item");
        categoryItem.innerHTML = `
            <div class="categ">
                <div class="img_cont">
                    <img src="${category.cat_img}" alt="${category.cat_name} icon">
                </div>
                <p>${category.cat_name}</p>
            </div>
            `;
        itemCatElement.appendChild(categoryItem);
      });
    }
    renderCategory(data);
  });

// .catch((error) => {
//     console.error("Error fetching JSON data:", error);
//   });
