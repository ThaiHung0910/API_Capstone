const BASE_URL = "https://6597f7c2668d248edf23d04d.mockapi.io/api_capstone";

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

var onSuccess = function (message1, message2) {
  Swal.fire({
    title: message1,
    text: message2,
    icon: "success",
  });
};
