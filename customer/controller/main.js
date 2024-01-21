// Var
var selectList = document.getElementById("selectList");
var cartCount = document.getElementById("cartCount");
var cart = [];

// Function

function renderProduct(arrProductList) {
  var content = [];
  for (var i = 0; i < arrProductList.length; i++) {
    var arr = arrProductList[i];
    content += `
        <div class="product__item card">
          <img src="${arr.img}" alt="" />
          <div class="item__text">
            <h3>${arr.name}</h3>
            <span>$${arr.price}</span>
          </div>

          <div class="item__action">
            <div class="rate">
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
            </div>
            <button onclick="addProduct(${arr.id})" class="btn btnAdd">
              <i class="fa-solid fa-cart-shopping"></i>
              <span>Add</span>
            </button>
          </div>
        </div>`;
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
      var product = res.data;
      var cartLength = cart.length   
      var isAddCartItem = false
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
      if (cartLength > 0) {
        for (var i = 0; i < cartLength; i++) {
          if (cart[i].product.name === product.name) {
            cart[i].quality++;
            isAddCartItem = true
            break;
          } 
        }
        if(!isAddCartItem) {
          cart.push(cartItem);
        }
      } else {
        cart.push(cartItem);
      }
      onSuccess("Add Success!")
      renderCart(cart.length, 'badge')
    })
    .catch(function (err) {
      console.log(err);
    });
}

function renderCart(length, className) {
  var qualityCount = 0
  cartCount.classList.add(className)
  if(length > 0) {
    for(var i = 0; i < length; i++) {
      qualityCount += cart[i].quality
      console.log(qualityCount)
    }
    cartCount.innerHTML = qualityCount
  } else {
    qualityCount = 1
    cartCount.innerHTML = qualityCount
  }
}


// Event
selectList.addEventListener("change", selectBrand);

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
