

function renderProduct(arrProductList) {
    var content = "";
    for (var i = 0; i < arrProductList.length; i++) {
      var arr = arrProductList[i];
      content += `
      <div class="card">
          <img src="${arr.img}" class="card-img-top" alt="...">
          <div class="card-body">
              <h5 class="card-title">${arr.name}</h5>
              <p class="card-text">${arr.desc}</p>
              <div class="purchase">
                  <p class="product-price">${arr.price}</p>
                  <span class="btn btn-primary btn-add">Add</span>
              <div>
          </div>
      </div>`;
    }
    document.getElementById("phoneList").innerHTML = content;
}


function fetchProductList() {
  axios({
    url: "https://6597f7c2668d248edf23d04d.mockapi.io/api_capstone",
    method: "GET",
  })
    .then(function (res) {
      renderProduct(res.data);
      renderProductAdmin(res.data)
      console.log(res.data);
    })
    .catch(function (err) {
      console.log(err);
    });
}

fetchProductList();


