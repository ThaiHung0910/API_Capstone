

function fetchProductList() {
    axios({
        url: 'https://6597f7c2668d248edf23d04d.mockapi.io/api_capstone',
        method: "GET"
    })
        .then(function(res)  {
                console.log(res.data);
              })
              .catch(function(err)  {
               console.log(err);
              });

}   

fetchProductList()


