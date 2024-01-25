const BASE_URL = "https://6597f7c2668d248edf23d04d.mockapi.io/api_capstone";
// const CART_URL = "https://65a8ce60219bfa371867a6b5.mockapi.io/cart"



var phoneServices = {
  getProductList: function () {
    return axios({
      url: BASE_URL,
      method: "GET",
    });
  },
  getCurrentProduct: function(id) {
    return axios({
      url: `${BASE_URL}/${id}`,
      method: "GET",
    });
  }
};

// var cartServices = {
//   getCartList: function () {
//     return axios({
//       url: CART_URL,
//       method: "GET",
//     });
//   },
//   createCartItem: function(data) {
//     return axios({
//       url: CART_URL,
//       method: "POST",
//       data: data
//     });
//   }
// }

var onSuccess = function (message1, message2) {
  Swal.fire({
    title: message1,
    text: message2,
    icon: "success",
  });
};
