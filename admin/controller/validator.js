function checkEmptyValue(value, errorId) {
    if (value) {
        document.getElementById(errorId).innerHTML = '';
        return true;
    } else {
        document.getElementById(errorId).innerHTML = 'Vui lòng không bỏ trống';
        return false;
    }
}


function checkNameValue(value, errorId){
    var regex = /^[a-zA-Z][a-zA-Z\s]*$/

    var isValid = regex.test(value)
    if(isValid){
        document.getElementById(errorId).innerHTML = ''
        return true
    } else{
        document.getElementById(errorId).innerHTML = 'Vui lòng nhập đúng định dạng ten'
        return false
    }
}

function checkPriceValue(value, errorId){
    var regex = /^\d+(\.\d{1,2})?$/
    var isValid = regex.test(value)
    if(isValid){
        document.getElementById(errorId).innerHTML = ''
        return true
    } else{
        document.getElementById(errorId).innerHTML = 'Vui lòng nhập đúng định dạng giá'
        return false
    }
}

function checkImgValue(value, errorId){
    var regex = /\.(png|jpg|jpeg|gif)$/
    var isValid = regex.test(value)
    if(isValid){
        document.getElementById(errorId).innerHTML = ''
        return true
    } else{
        document.getElementById(errorId).innerHTML = 'Vui lòng nhập đúng định dạng img'
        return false
    }
}