var idItem = null
var myModal = new bootstrap.Modal(document.getElementById('exampleModal'));
console.log(myModal)

function turnOnLoading(){
  document.getElementById('spinner-container').style.display = 'block'
}
function turnOffLoading(){
  document.getElementById('spinner-container').style.display = 'none'
}

function resetData(){
 var inputs = document.querySelectorAll('input[type="text"]')
 for(var i =0; i< inputs.length; i++){
  inputs[i].value = ''
 }
}
resetData()
function renderProductAdmin(arrProduct){
    var content = " "
    for(var i = 0; i< arrProduct.length; i++){
      var products = arrProduct[i]
      content += `
        <tr>
          <td>${products.id}</td>
          <td>${products.name}</td>
          <td>${products.price}</td>
          <td>${products.img}</td>
          <td>${products.desc}</td>
          <td>
              <button id='btnEdit' class='btn mb-2' onclick="getDataPtoduct(${products.id})">Edit</button>
              <button id='btnDelete' class='btn' onclick="deleteProductItem(${products.id})">Delete</button>
  
          </td>
  
        </tr>
      `
    }
    document.getElementById("tablePhone").innerHTML = content;
  }

  function fetchProductList() {
    axios({
      url: "https://6597f7c2668d248edf23d04d.mockapi.io/api_capstone",
      method: "GET",
    })
    .then(function (res) {
      renderProductAdmin(res.data)
        console.log(res.data);
        myModal.hide()

      })
      .catch(function (err) {
        console.log(err);
      });
  }
  
  fetchProductList();

  
  function deleteProductItem(id){
    turnOnLoading()
    axios({
        url: `https://6597f7c2668d248edf23d04d.mockapi.io/api_capstone/${id}`,
        method: "DELETE",
      })
        .then(function (res) {
          turnOffLoading()
          fetchProductList()
        })
        .catch(function (err) {
          turnOffLoading()
          console.log(err);
        });
  }
  
  
  function addProductItemAdd() {
    turnOnLoading()
    var nameItem = document.getElementById('name').value;
    var priceItem = document.getElementById('price').value;
    var imgItem = document.getElementById('img').value;
    var descItem = document.getElementById('desc').value;

    // kiểm tra value user nhập
    if (!checkEmptyValue(nameItem, 'tbname') || !checkEmptyValue(priceItem, 'tbprice') || !checkEmptyValue(imgItem, 'tbimg') || !checkEmptyValue(descItem, 'tbdesc')) {
      turnOffLoading();
      
      return; // Dừng hàm nếu có giá trị trống
    }
    if (!checkNameValue(nameItem, 'tbname')) {
      turnOffLoading();
      return; // Dừng hàm nếu giá không hợp lệ
    }
  
    if (!checkPriceValue(priceItem, 'tbprice')) {
      turnOffLoading();
      return; // Dừng hàm nếu giá không hợp lệ
  }
  
  if (!checkImgValue(imgItem, 'tbimg')) {
    turnOffLoading();
    return; // Dừng hàm nếu giá không hợp lệ
  }

  // Gọi api

    axios({
        url: "https://6597f7c2668d248edf23d04d.mockapi.io/api_capstone",
        method: "POST",
        data: {
            name: nameItem,
            price: priceItem,
            img: imgItem,
            desc: descItem
        }
    })
    .then(function (res) {
        turnOffLoading()
        fetchProductList()
        resetData()
      })
      .catch(function (err) {
        console.log(err);
      });

    
  }


  function getDataPtoduct(id){
    turnOnLoading()
    axios({
      url: `https://6597f7c2668d248edf23d04d.mockapi.io/api_capstone/${id}`,
      method: "GET",
    })
    .then(function (res) {
      turnOffLoading()
      console.log(res.data)
      document.getElementById('name').value = res.data.name;
      document.getElementById('price').value = res.data.price;
      document.getElementById('img').value = res.data.img;
      document.getElementById('desc').value = res.data.desc;
      myModal.show()
        })
        .catch(function (err) {
          turnOffLoading()
          console.log(err);
        });
      idItem = id
      console.log(idItem)
    }

  function updateProductItem(){
    turnOnLoading()
    var nameItem = document.getElementById('name').value;
    var priceItem = document.getElementById('price').value;
    var imgItem = document.getElementById('img').value;
    var descItem = document.getElementById('desc').value;


    // kiểm tra value user nhập
    if (!checkEmptyValue(nameItem, 'tbname') || !checkEmptyValue(priceItem, 'tbprice') || !checkEmptyValue(imgItem, 'tbimg') || !checkEmptyValue(descItem, 'tbdesc')) {
      turnOffLoading();
      
      return; // Dừng hàm nếu có giá trị trống
    }
    if (!checkNameValue(nameItem, 'tbname')) {
      turnOffLoading();
      return; // Dừng hàm nếu giá không hợp lệ
    }
  
    if (!checkPriceValue(priceItem, 'tbprice')) {
      turnOffLoading();
      return; // Dừng hàm nếu giá không hợp lệ
  }
  
  if (!checkImgValue(imgItem, 'tbimg')) {
    turnOffLoading();
    return; // Dừng hàm nếu giá không hợp lệ
  }

  // Gọi api
    axios({
      url: `https://6597f7c2668d248edf23d04d.mockapi.io/api_capstone/${idItem}`,
      method: "PUT",
      data: {
        name: nameItem,
            price: priceItem,
            img: imgItem,
            desc: descItem
      }
    })
    .then(function (res) {
      console.log(res.data)
      fetchProductList()
      turnOffLoading()
      resetData()
      
    })
        .catch(function (err) {
          console.log(err);
          turnOffLoading()
        });
  }

function searchProduct(){
 var keySearch = document.getElementById('searchInput').value.toLowerCase()
  var filterProduct = []
  axios({
    url: "https://6597f7c2668d248edf23d04d.mockapi.io/api_capstone",
    method: "GET"
  })
  .then(function (res) {
    res.data.forEach(item => {
      if(item.name.toLowerCase().includes(keySearch)){
        filterProduct.push(item)
      }
      
    })
    renderProductAdmin(filterProduct)
  })
  .catch(function (err) {
        
  });
  
}

document.getElementById('searchInput').addEventListener('input', searchProduct);
document.getElementById('searchButton').addEventListener('click', searchProduct);


function sortProductPrice(status){
  
   axios({
     url: "https://6597f7c2668d248edf23d04d.mockapi.io/api_capstone",
     method: "GET"
   })
   .then(function (res) {
    var sortProduct =  res.data.sort((a, b) => {
      return status == 'low' ? a.price - b.price : b.price - a.price;
    })
    renderProductAdmin(sortProduct)
   })
   .catch(function (err) {
         
   });
   
 }

 document.getElementById('sortByPriceAsc').addEventListener('click', function (){
  sortProductPrice('low')
 } );
document.getElementById('sortByPriceDesc').addEventListener('click', function (){
  sortProductPrice('hight')
 } );



//  drop down
document.querySelectorAll('.dropdown-toggle').forEach(function(dropdownToggle) {
  dropdownToggle.addEventListener('click', function() {
    var dropdownMenu = dropdownToggle.nextElementSibling;
    dropdownMenu.classList.toggle('show');
  });
});

document.addEventListener('click', function(event) {
  if (!event.target.closest('.dropdown')) {
    var openDropdownMenus = document.querySelectorAll('.dropdown-menu.show');
    openDropdownMenus.forEach(function(dropdownMenu) {
      dropdownMenu.classList.remove('show');
    });
  }
});
