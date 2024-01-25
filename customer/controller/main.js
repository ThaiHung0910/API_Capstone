// Var
var selectList = document.getElementById("selectList");
var cartCount = document.getElementById("cartCount");
var cartItems = document.querySelector(".cart-items");
var cartEmpty = document.querySelector(".cart-empty");
var totalMoney = document.querySelector(".total");
var shoppingCart = document.querySelector(".js-toggle-cart div");
var cart = [];

// Function

function renderProduct(arrProductList) {
  var content = [];
  for (var i = 0; i < arrProductList.length; i++) {
    var arr = arrProductList[i];
    content += ` 
    <div class="col-lg-3 col-md-6 mt-4">
    <div class="product-item">
        <div class="img"  style="background-image: url(${arr.img})"></div>
        <h4 class="name">${arr.name}</h4>
        <div class="price">
            <span>$${arr.price}</span>
            <span class="like">
              <button onclick="likeProduct(${arr.id})"><i class="fa-solid fa-heart"></i></button>
            </span>
        </div>
        <div class="action">

            <div class="rating">
                <i class="star--gold fa-solid fa-star"></i>
                <i class="star--gold fa-solid fa-star"></i>
                <i class="star--gold fa-solid fa-star"></i>
                <i class="star--gold fa-solid fa-star"></i>
                <i class="star--gold fa-solid fa-star"></i>
                <!-- <i class="fa-regular fa-star"></i> -->
            </div>

            <button onclick="addProduct(${arr.id})" class="btn btn_add">ADD TO CART</button>
        </div>

        <div class="info">
            <span class="brand">${arr.screen}</span>
            <span class="info-name">${arr.frontCamera}</span>

        </div>

        <div onclick="likeProduct(${arr.id})" class="favourite">
            <i class="fa-solid fa-check"></i>
            <span >Yêu thích</span>
        </div>
    </div>
</div>
    `;
  }
  document.getElementById("phoneList").innerHTML = content;
}

function selectBrand() {
  var result = [];
  phoneServices
    .getProductList()
    .then(function (res) {
      var arr = res.data;
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].type == selectList.value) {
          result.push(arr[i]);
        }
      }
      result.length > 0 ? renderProduct(result) : renderProduct(arr);
      console.log(res.data);
    })
    .catch(function (err) {
      console.log(err);
    });
}

function addProduct(id) {
  phoneServices
    .getCurrentProduct(id)
    .then(function (res) {
      var product = res.data,
        cartLength = cart.length,
        isAddCartItem = false,
        i = 0;
      var cartItem = new CartItem(
        1,
        new Product(
          product.id,
          product.name,
          product.price,
          product.screen,
          product.backCamera,
          product.frontCamera,
          product.img,
          product.desc,
          product.type
        )
      );
      while (i < cartLength) {
        if (cart[i].product.name === product.name) {
          cart[i].quality++;
          isAddCartItem = true;
          break;
        }
        i++;
      }
      if (!isAddCartItem) {
        cart.push(cartItem);
        isAddCartItem = true;
      }
      // if (cartLength > 0) {
      //   for (var i = 0; i < cartLength; i++) {
      //     if (cart[i].product.name === product.name) {
      //       cart[i].quality++;
      //       isAddCartItem = true;
      //       break;
      //     }
      //   }
      //   if (!isAddCartItem) {
      //     cart.push(cartItem);
      //   }
      // } else {
      //   cart.push(cartItem);
      // }
      // addItemShoppingCart(product)
      onSuccess("Add Success!");
      saveValueLocalStorage("Cart", cart);
      renderCart(cart.length);
    })
    .catch(function (err) {
      console.log(err);
    });
}

function renderCart(length) {
  var qualityCount = 0,
    htmls = "",
    total = 0;
  cartCount.classList.add("badge");
  if (length > 0) {
    for (var i = 0; i < length; i++) {
      var cartCurrent = cart[i].product;
      var quality = cart[i].quality;
      // Count cart
      qualityCount += quality;
      // Caculate money
      total += cartCurrent.price * quality;
      // Html cart
      htmls += `
        <div class="cart-item">
                  <div class="cart-img">
                    <img
                      src="${cartCurrent.img}"
                      alt=""
                    />
                  </div>
                  <strong class="name">${cartCurrent.name}</strong>
                  <span class="qty-change">
                    <div>
                      <button class="btn-qty" onclick="qtyChange(${cartCurrent.id},'sub')">
                        <i class="fa-solid fa-chevron-left"></i>
                      </button>
                      <p class="qty">${quality}</p>
                      <button class="btn-qty" onclick="qtyChange(${cartCurrent.id},'add')">
                        <i class="fa-solid fa-chevron-right"></i>
                      </button></div
                  ></span>
                  <p class="price">$${cartCurrent.price}</p>
                  <button class="btnRemoveCartItem" onclick="removeItem(${cartCurrent.id})">
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </div>`;
    }
    shoppingCart.classList.add("shopping_cart");
    cartCount.style.display = "";
    cartCount.innerHTML = qualityCount;
    cartItems.innerHTML = htmls;
    cartEmpty.classList.remove("is-show");
    document.querySelector(".total").innerHTML = total;
  } else {
    shoppingCart.classList.remove("shopping_cart");
    cartCount.style.display = "none";
    cartItems.innerHTML = "";
    cartEmpty.classList.add("is-show");
    cartItems.appendChild(cartEmpty);
    document.querySelector(".total").innerHTML = 0;
  }
}


function likeProduct(id) {
  var likeBtn = document.querySelectorAll(".like button"),
    favourite = document.querySelectorAll(".favourite");
  for (var i = 0; i < likeBtn.length; i++) {
    if (i == id - 1) {
      likeBtn[i].classList.toggle("liked");
      favourite[i].classList.toggle("liked");
    }
  }
}

// function addItemShoppingCart (data) {
//   cartServices
//     .createCartItem(data)
//     .then(function(res)  {
//             console.log(res.data);
//           })
//           .catch(function(err)  {
//            console.log(err);
//           });
// }

function qtyChange(id, action) {
  for (var i = 0; i < cart.length; i++) {
    var cartItem = cart[i];
    if (cartItem.product.id == id) {
      switch (action) {
        case "add":
          cartItem.quality++;
          break;
        case "sub":
          cartItem.quality--;
          if (cartItem.quality == 0) {
            cart.splice(i, 1);
          }
          break;
      }
      break;
    }
  }
  if (cart.length == 0) {
    toggleCartItem = false;
  }
  saveValueLocalStorage("Cart", cart);
  renderCart(cart.length);
}

function removeItem(id) {
  for (var i = 0; i < cart.length; i++) {
    var cartItem = cart[i];
    if (cartItem.product.id == id) {
      cart.splice(i, 1);
      break;
    }
  }
  saveValueLocalStorage("Cart", cart);
  renderCart(cart.length);
}

function saveValueLocalStorage(key, value) {
  var stringValue = JSON.stringify(value);
  localStorage.setItem(key, stringValue);
}

function getValueLocalStorage(key) {
  var dataLocal = localStorage.getItem(key);
  if (dataLocal) {
    cart = JSON.parse(dataLocal);
    saveValueLocalStorage("Cart", cart);
    renderCart(cart.length);
  }
}

getValueLocalStorage("Cart");

function purchaseCartItem() {
  cart = [];
  saveValueLocalStorage("Cart", cart);
  renderCart(cart.length);
  onSuccess("Purchase success!", "Thank you for shopping with us!");
}

function clearCart() {
  cart = [];
  saveValueLocalStorage("Cart", cart);
  renderCart(cart.length);
  onSuccess("Clear cart success!", " ");
}

// Event
selectList.addEventListener("change", selectBrand);

// toggle shopping cart
$(".js-toggle-cart, .cart_overlay, .icon-close-cart").on("click", function () {
  $(".cart").toggleClass("is-hidden");
});
// change nav bar color when scroll
$(window).on("scroll", function () {
  if (this.scrollY > 100) {
    $("nav").addClass("black");
  } else {
    $("nav").removeClass("black");
  }
});

// Call API
function fetchProductList() {
  phoneServices
    .getProductList()
    .then(function (res) {
      renderProduct(res.data);
      console.log(res.data);
    })
    .catch(function (err) {
      console.log(err);
    });
}

fetchProductList();
