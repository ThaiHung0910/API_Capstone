

function renderProduct(arrProductList) {
    var content = [];
    for (var i = 0; i < arrProductList.length; i++) {
      var arr = arrProductList[i];
      content += `
      <div class="product__content">
        <div class="product__item card">
          <img src="${arr.img}" alt="" />
          <div class="item__text">
            <h3>${arr.name}<span>$${arr.price}</span></h3>
            <p>${arr.type}</p>
          </div>

          <div class="item__action">
            <div class="rate">
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
            </div>
            <button><i class="fa-solid fa-cart-shopping"></i>Add</button>
          </div>
        </div>
      </div>`
    }
    document.getElementById('phoneList').innerHTML = content
}

function fetchProductList() {
  axios({
    url: "https://6597f7c2668d248edf23d04d.mockapi.io/api_capstone",
    method: "GET",
  })
    .then(function (res) {
      renderProduct(res.data);
      console.log(res.data);
    })
    .catch(function (err) {
      console.log(err);
    });
}

fetchProductList();


