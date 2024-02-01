// Var
var selectList = document.getElementById("selectList");
var cartCount = document.getElementById("cartCount");
var cartItems = document.querySelector(".cart-items");
var cartEmpty = document.querySelector(".cart-empty");
var totalMoney = document.querySelector(".total");
var shoppingCart = document.querySelector(".js-toggle-cart div");
var carousel = document.querySelector(".carousel");
var orderOverlay = document.querySelector(".order-overlay");
var cart = [];

// Function

function renderProduct(arrProductList) {
  var content = [];
  for (var i = 0; i < arrProductList.length; i++) {
    var arr = arrProductList[i];
    content += ` 
    <div class="col-lg-3 col-md-6 mt-4">
    <div class="product-item">
        <div class="img" >
          <img src="${arr.img}" />
        </div>
        <h4 class="name">${arr.name}</h4>
        <div class="price">
            <span>$${arr.price}</span>
            <span class="like">
              <button class="${arr.id}" onclick="likeProduct(${arr.id})"><i class="fa-solid fa-heart"></i></button>
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
  imageNotFound(".product-item .img img", arrProductList.length);
}

function imageNotFound(selector, length) {
  if(length > 0) {
    var images = document.querySelectorAll(selector);
    images.forEach((img) => {
      img.addEventListener("error", function handleError() {
        const defaultImage =
          "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg";
        img.src = defaultImage;
        img.alt = "Image Not Found";
      });
    });
  }
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
        if (cart[i].product.name === product.name && cart[i].product.price == product.price) {
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
    cartItems.innerHTML = htmls;
    imageNotFound(".cart-item .cart-img img", length);
    shoppingCart.classList.add("shopping_cart");
    cartCount.style.display = "";
    cartCount.innerHTML = qualityCount;
    cartEmpty.classList.remove("is-show");
    totalMoney.innerHTML = total;
  } else {
    shoppingCart.classList.remove("shopping_cart");
    cartCount.style.display = "none";
    cartItems.innerHTML = "";
    cartEmpty.classList.add("is-show");
    cartItems.appendChild(cartEmpty);
    totalMoney.innerHTML = 0;
  }
}

function likeProduct(id) {
  var likeBtn = document.querySelectorAll(".like button"),
    favourite = document.querySelectorAll(".favourite");
  for (var i = 0; i < likeBtn.length; i++) {
    if (likeBtn[i].classList.contains(id)) {
      likeBtn[i].classList.toggle("liked");
      favourite[i].classList.toggle("liked");
    }
  }
}

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

function purchase() {
  var price = document.querySelector(".total").innerText,
    productQuality = "",
    totalPrice = "";
  for (var i = 0; i < cart.length; i++) {
    var product = cart[i].product,
      quality = cart[i].quality;
    productQuality += `<p>${quality} X ${product.name}</p>`;
    totalPrice += `<p>$ ${product.price * quality}</p>`;
  }
  $("body").addClass("stop-scrolling");

  return `<div class="invoice">
      <div class="shipping-items">
        <div class="item-names">${productQuality}</div>
        <div class="items-price">${totalPrice}</div>
      </div>
      <hr />
      <div class="payment">
        <em>payment</em>
        <div>
          <p>total amount to be paid:</p>
          <span class="pay">$ ${price}</span>
        </div>
      </div>
      <div class="order">
        <button onclick="order(${price})" class="btn-order btn">Order Now</button>
        <button onclick="cancel()" class="btn-cancel btn">Cancel</button>
      </div>
    </div>`;
}

function purchaseCartItem(e) {
  if (cart.length) {
    orderOverlay.style.display = e ? "block" : "none";
    document.querySelector(".order-now").innerHTML = e ? purchase() : "";
    carousel.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
    document.querySelector(".cart").classList.toggle("is-hidden");
  }
}

function clearCart() {
  cart = [];
  saveValueLocalStorage("Cart", cart);
  renderCart(cart.length);
}

function order(money) {
  let e = document.getElementsByClassName("invoice")[0];
  e.style.height = "500px";
  e.classList.add("responsive");
  e.innerHTML = orderConfirm(money);
}

function cancel() {
  purchaseCartItem(0);
  $("body").removeClass("stop-scrolling");
}

function orderConfirm(money) {
  cart = [];
  saveValueLocalStorage("Cart", cart);
  renderCart(cart.length);
  carousel.scrollIntoView({
    behavior: "smooth",
    block: "end",
    inline: "nearest",
  });
  return `<div>
    <div class="order-details">
      <em>Your order has been placed</em>
      <p>Your order-id is : <span>${Math.round(1e3 * Math.random())}</span></p>
      <p>Your order will be delivered to you in 3-5 working days</p>
      <p>You can pay <span>$ ${money}</span> by card or any online transaction method after the products have been dilivered to you</p>
    </div>
    <button onclick="okay(event)" class="btn-ok">Okay</button>
  </div>`;
}

function okay(e) {
  let t = document.getElementsByClassName("invoice")[0];
  "Continue" == e.target.innerText
    ? ((t.style.display = "none"),
      (orderOverlay.style.display = "none"),
      $("body").removeClass("stop-scrolling"),
      t.classList.remove("responsive"))
    : ((e.target.innerText = "Continue"),
      (e.target.parentElement.querySelector(".order-details").innerHTML =
        "<em class='thanks'>Thanks for shopping with us</em>"),
      (t.style.height = "180px"),
      (t.style.top = "5%"));
}

// Event
selectList.addEventListener("change", selectBrand);

// toggle shopping cart
$(".js-toggle-cart, .cart_overlay, .icon-close-cart").on("click", function () {
  $(".cart").toggleClass("is-hidden");
});
// change nav bar color when scroll
$(window).on("scroll", function () {
  if (this.scrollY > 50) {
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
