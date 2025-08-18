//selecting elements from the DOM
let basketIcon = document.querySelector("#basket-icon");
let checkout = document.querySelector(".basket");
let closeBasket = document.querySelector("#close-basket");

//event listener for opening the basket
basketIcon.onclick = () => {
    checkout.classList.add("active");
    addQuantityListeners();
    updatetotal();
}

//event listener for closing the basket
closeBasket.onclick = () =>{
    checkout.classList.remove("active");
    removeQuantityListeners();
}


//waits for DOM contents to load
if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded",ready)
    }else{
        ready();
    }

//function to initialize the event listeners
function ready(){
    //add event listeners to remove items from the basket
    let removeBasketButtons = document.getElementsByClassName("basket-remove");
    for(let i = 0; i < removeBasketButtons.length ; i++){
        let button = removeBasketButtons[i];
        button.addEventListener('click',removeBasketItem);
    }

//add event listeners quantity changes
let quantityInputs = document.getElementsByClassName("basket-quantity");
for(let i = 0; i<quantityInputs.length; i++){
    let input = quantityInputs[i];
    input.addEventListener("change",quantityChanged);
    }
}

//add product to the basket
let addBasketButtons = document.getElementsByClassName("addBasket");
for(let i = 0; i< addBasketButtons.length; i++){
    let button=addBasketButtons[i];
    button.addEventListener("click",addtocartClicked);
}

let checkoutButton = document.querySelector("#checkout-button");
    checkoutButton.addEventListener("click", () => {
        let basketItems = document.querySelectorAll(".basket-box");
        if (basketItems.length === 0) {
            alert("Please add at least one item to the basket to proceed to checkout.");
        }else{
            window.location.href = "checkout.html";
        }
    });


//function to remove item from the basket
function removeBasketItem(event){
    let buttonClicked = event.target;
    let basketItem=buttonClicked.closest(".basket-box");
    basketItem.remove();
    updatetotal();
}


//function to handle quantity Changes
function quantityChanged(event){
    let input = event.target;
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
    updatetotal();
}


//function for update total price of the items in basket
function updatetotal(){
    let basketContent = document.querySelector(".basket-content"); 
    let basketBoxes = basketContent.querySelectorAll(".basket-box");
    let total = 0;
    

    basketBoxes.forEach(basketBox => {
        let priceElement = basketBox.querySelector(".basket-price");
        let quantityElement = basketBox.querySelector(".basket-quantity");
        
        let price = parseFloat(priceElement.innerText.replace("LKR ", ""));
        let quantity = parseInt(quantityElement.value);
       
        total += price * quantity;      
   
});
        document.querySelector(".total-price").innerText = "LKR" + total.toFixed(2);

}


//function to add a product to the basket
function addtocartClicked(event){
    let button = event.target;
    let shopProducts = button.parentElement;
    let title = shopProducts.querySelector(".product-title").innerText;
    let price = shopProducts.querySelector(".price").innerText;
    let productImg = shopProducts.querySelector(".product-img").src;
    addProductToCheckout(title, price, productImg);
    updatetotal();
    addQuantityListeners();
}


//function to add a product to the basket content
function addProductToCheckout(title, price, productImg){
    let basketShopBox = document.createElement("div");
    basketShopBox.classList.add("basket-box");

    let checkoutItems = document.querySelector(".basket-content");
    let checkoutItemsNames = checkoutItems.querySelectorAll(".basket-product-title");
    for(let i = 0; i < checkoutItemsNames.length; i++){
        if (checkoutItemsNames[i].innerText === title) {
            alert("You have already added this item to bucket!");
            return;
        }
    }

    let basketBoxContent = `
        <img src="${productImg}" alt="" class="basket-img">
        <div class="detail-box">
            <div class="basket-product-title">${title}</div>
            <div class="basket-price">${price}</div>
            <input type="number" value="1" class="basket-quantity">
        </div>
        <i class="bx bxs-trash-alt basket-remove"></i>
        `;
    basketShopBox.innerHTML = basketBoxContent;
    checkoutItems.appendChild(basketShopBox);
    basketShopBox.querySelector(".basket-remove").addEventListener("click",removeBasketItem);
}


// function for add quantity change listeners
function addQuantityListeners() {
    let quantityInputs = document.getElementsByClassName("basket-quantity");
    for (let i = 0; i < quantityInputs.length; i++) {
        let input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }
}


//function for remove quantity change listeners
function removeQuantityListeners() {
    let quantityInputs = document.getElementsByClassName("basket-quantity");
    for (let i = 0; i < quantityInputs.length; i++) {
        let input = quantityInputs[i];
        input.removeEventListener("change", quantityChanged);
    }
}










