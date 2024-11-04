// biến const khai báo không đc phép gắn lại giá trị
let listFood = [];

document.querySelector("#btnThemMon").onclick = function () {
    console.log("Them mon");

    let foodID = document.querySelector("#foodID").value;
    let tenMon = document.querySelector("#tenMon").value;
    let loai = document.querySelector("#loai").value;
    let giaMon = document.querySelector("#giaMon").value;
    let khuyenMai = document.querySelector("#khuyenMai").value;
    let tinhTrang = document.querySelector("#tinhTrang").value;
    let hinhMon = document.querySelector("#hinhMon").value;
    let moTa = document.querySelector("#moTa").value;

    console.log(
        foodID,
        tenMon,
        loai,
        giaMon,
        khuyenMai,
        tinhTrang,
        hinhMon,
        moTa
    )

    let food = {
        id: foodID,
        ten: tenMon,
        loai: loai,
        gia: giaMon,
        khuyenMai: khuyenMai,
        tinhTrang: tinhTrang,
        hinhMon: hinhMon,
        moTa: moTa,
    }

    console.log(food);

    listFood.push(food);

    console.log(listFood);  
    renderListFood()

    resetFormAddFood();
    saveListFood();
}

function resetFormAddFood() {
    let foodID = document.querySelector("#foodID");
    let tenMon = document.querySelector("#tenMon");
    let loai = document.querySelector("#loai");
    let giaMon = document.querySelector("#giaMon");
    let khuyenMai = document.querySelector("#khuyenMai");
    let tinhTrang = document.querySelector("#tinhTrang");
    let hinhMon = document.querySelector("#hinhMon");
    let moTa = document.querySelector("#moTa");

    foodID.value = "";
    tenMon.value = "";
    loai.value = "";
    giaMon.value = "";
    khuyenMai.value = "";
    tinhTrang.value = "";
    hinhMon.value = "";
    moTa.value = "";
}

function renderListFood() {
    const tbodyFood = document.getElementById('tbodyFood');
   
    if(listFood.length == 0){
        tbodyFood.innerHTML = "";
        return;
    }

    let content = "";

    for(let i = 0; i < listFood.length; i++){
        const food = listFood[i];

        console.log(food);

        content += `
            <tr>
                <td>${food.id}</td>
                <td>${food.ten}</td>
                <td>${showLoai(food.loai)}</td>
                <td>${food.gia}</td>
                <td>${food.khuyenMai}</td>


                <!-- @TODO -->    
                <td>${tinhGiaKhuyenMai(
                    Number(food.gia),
                    Number(food.khuyenMai)
                )}</td>
                <td>${showTinhTrang(food.tinhTrang)}</td>
                <td>
                    <button>edit</button>
                    <button onclick="handleDeleteFood(${food.id})">delete</button>
                </td>

            </tr>
        `
    }

    

    tbodyFood.innerHTML = content;

}

function tinhGiaKhuyenMai(gia, khuyenMai) {
    return gia * (100 - khuyenMai) / 100
}

function showLoai(loai) {
    if(loai == 'loai1'){
        return "chay"
    }

    return "mặn"
}

function showTinhTrang(tinhTrang) {
    if(tinhTrang == 0){
        return "hết"
    }

    return "còn"
}

function handleDeleteFood(id) {
    console.log("id", id);

    const index = findIndex(listFood, id);

    // kiểm tra id có tồn tại trong mảng hay ko

    // -1: không tồn tại
    if(index == -1){

        // thoát khỏi function , không tính toán nữa
        return;
    } 

    listFood.splice(index, 1);

    renderListFood();
    saveListFood();
}

function findIndex(arr, key) {
    let index = -1;
    for(let i = 0; i < arr.length; i++){
        const item = arr[i];

        if(item.id == key){
            return i
        }
    }

    return -1;
}

const lap = {
    name: 'macboook',
    price: 20,
}

const lapJSON = JSON.stringify(lap);
localStorage.setItem("laptop", lapJSON);

//lấy ra

const lapItem = localStorage.getItem("laptop");

// khôi phục lại

const lapItemObj = JSON.parse(lapItem);

function saveListFood() {
    const listFoodJSON = JSON.stringify(listFood)
    localStorage.setItem('listFood', listFoodJSON);
}

function restoreListFood() {
    const foods = localStorage.getItem("listFood");

    if(foods) {
        listFood = JSON.parse(foods);
    }
}

function init() {
    restoreListFood();
    
    renderListFood();
}

init();