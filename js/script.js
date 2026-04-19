let names = new Map([[1, "RedmiBook Pro 16 2025"], [2, "Lenovo ThinkBook 16p G4 IRH"], [3, "Apple Macbook M4 Pro 16"]]);
let prices = new Map([[1, 104000], [2, 140000], [3, 184000]]);

const button = document.querySelector(".button");
const productprice = document.querySelector(".headline");

if (button != null){
    button.addEventListener("click", function(){
        const id = Number(productprice.dataset.id);
        console.log(id);
        addToCart(id);
    });
}

let cart = loadCart();

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart != null) {
        return JSON.parse(savedCart);
    } else {
        return [];
    }
}

function addToCart(id) {
    cart.push(id);
    saveCart(cart);
    remakeCart();
}

const calculateTotal = () => {
    let total = 0;
    cart.forEach(item => {
        const price = prices.get(item);
        total += price;
    });
    return total;
};

const buybutton = document.querySelector(".buybutton");

if (buybutton != null){
    buybutton.addEventListener("click", function (){
        console.log(cart.length);
        if (cart.length == 0) {
            alert("Корзина пуста"); 
        } else {
            alert("Спасибо за покупку!");
            clearCart();
        }
    });
}

const clearbutton = document.querySelector(".clearbutton");
if (clearbutton != null){
    clearbutton.addEventListener("click", function (){
        alert("Корзина очищена");
        clearCart();
    });
}

function clearCart(){
    cart = [];
    saveCart(cart);
    const allElements = document.querySelector(".allElements");
    if (allElements != null){
        allElements.textContent = "";
    }
    remakeCart();
}

document.addEventListener('DOMContentLoaded', () => {
    remakeCart();
});

function remakeCart(){
    const allElements = document.querySelector(".allElements");
    if (allElements != null){
        let elements = [0, 0, 0];
        cart.forEach(item => {
            elements[item - 1] += 1;
        });
        let iddd = 1;
        elements.forEach(item => {
            if (item != 0){
                allElements.textContent += names.get(iddd) + " x" + item + " - " + (prices.get(iddd) * item) + "₽\n";
            }
            iddd += 1;
        });
    }
    const total = document.querySelector(".total");
    if (total != null){
        const cartTotal = calculateTotal();
        total.textContent = "Итого: " + cartTotal + "₽";
    }
}

const products = document.querySelectorAll(".product");

const filter = document.querySelector(".filter");

if (filter != null){
    filter.addEventListener("change", function(event) {
        const selectedOption = event.target.options[event.target.selectedIndex];
        const optionid = Number(selectedOption.dataset.id);
        if (optionid == 1){
                products.forEach(function(item){
                    item.style.display = "block";
                });
        } else if (optionid == 2){
                products.forEach(function(item){
                    if (item.dataset.id != 1) {
                        item.style.display = "none";
                    } else {
                        item.style.display = "block";
                    }
                });
        } else if (optionid == 3){
                products.forEach(function(item){
                    if (item.dataset.id == 2) {
                        item.style.display = "none";
                    } else {
                        item.style.display = "block";
                    }
                });
        }
    });
}