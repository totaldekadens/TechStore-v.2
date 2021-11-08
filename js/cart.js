
// Fetching the cart list from localStorage
let cart = JSON.parse(localStorage.getItem("cart"));

// Cart quantity function. Will apply the quantity of the products beside the cart in the header
function printNrOfElements() {

    let numberHeader = document.getElementById("qty")
    let cart = localStorage.getItem("cart")

    if(cart) {
        cart = JSON.parse(cart)
    } else {
        cart = []
    }
    // summing the total quantity in the list 
    let totalSum = cart.reduce((sum,item) => sum + item.quantity, 0);

    numberHeader.innerText = totalSum
}

// Adding the products to webpage
function renderCart() {

    // Taking out main from html
    let main = document.getElementsByTagName("main")[0]
    
    // Will not make a duplicate when clearing the cart from local Storage / Victor, var det så här du menade? 
     main.innerHTML = "";

    // container to cart title and button 
    let titleContainer = document.createElement("div")
    titleContainer.classList.add("titleContainer")
    main.appendChild(titleContainer)

    // Create cart Icon
    let cartIcon = document.createElement("div")
    cartIcon.classList.add("cartIcon")
    titleContainer.appendChild(cartIcon)
    cartIcon.innerHTML = '<i class="fas fa-shopping-cart"></i>'

    // Create Title "Kundvagn"
    let title = document.createElement("h1")
    title.classList.add("cartTitle")
    title.innerText = "Kundvagn"
    titleContainer.appendChild(title)

    // Container that wraps all the shopping items together
    let wrapper = document.createElement("div")
    wrapper.classList.add("wrapper")
    main.appendChild(wrapper)

    if(cart == null) {
        loggedIn();
    }

    // Loop for the list with added items into the shopping cart  
    for(let i = 0 ; i < cart.length ; i++ ) {

        let cartItem = cart[i]  

        // Container to added item
        let div = document.createElement("div")
        div.classList.add("containerAddedItem")
        wrapper.appendChild(div)

        // Container to image 
        let imageContainer = document.createElement("div")
        imageContainer.classList.add("imageContainer")
        div.appendChild(imageContainer)

        // Image // Add the list to source!    
        let productImg = document.createElement("img")
        productImg.classList.add("productImg")
        productImg.src="./assets/" + cartItem.product.image 
        imageContainer.appendChild(productImg)

        // PhoneModel    
        let phoneModelText = document.createElement("h2")
        phoneModelText.innerText = cartItem.product.title
        div.appendChild(phoneModelText)


        // Price on phone     
        let priceItem = document.createElement("h3")
        priceItem.innerText = cartItem.product.price + " kr" 
        div.appendChild(priceItem)
        
        // container to the qty
        let ajustQty = document.createElement("div")
        ajustQty.classList.add("ajustQty")
        div.appendChild(ajustQty)

        // Delete qty on product
        let deleteQty = document.createElement("div")
        deleteQty.classList.add("ajustBoxes")
        deleteQty.innerText = "-"
        deleteQty.title = cartItem.product.title;
        deleteQty.onclick = function() {
        deleteItem(this.title); 
        }; 
        ajustQty.appendChild(deleteQty)
    
        // Qty of the product
        let Item = document.createElement("h3")
        Item.innerText = cartItem.quantity + " st"
        ajustQty.appendChild(Item)

          // Add qty on product
        let addQty = document.createElement("div")
        addQty.classList.add("ajustBoxes")
        addQty.innerText = "+"
        addQty.title = cartItem.product.title;
        addQty.onclick = function() {
        addItem(this.title); 
        }; 
        ajustQty.appendChild(addQty)
    }

    // Summing the total price of the products in the cart    
    let totalSum = cart.reduce((sum,item) => sum + item.product.price * item.quantity, 0);

    // totalPrice . Fetching the sum from "totalSum"
    let totalPrice = document.createElement("h3")
    totalPrice.innerText = "Totalt pris: " + totalSum + " kr"  
    totalPrice.classList.add("totalPrice")  
    main.appendChild(totalPrice)

    // ButtonCompletePurchase
    let buttonCompletePurchase = document.createElement("div")
    buttonCompletePurchase.classList.add("buttonCompletePurchase")
    main.appendChild(buttonCompletePurchase)
    buttonCompletePurchase.addEventListener("click", completeTheOrder) 
    buttonCompletePurchase.style = "cursor:pointer" 

    // Container to check-icon    
    let divComplete = document.createElement("div")
    divComplete.classList.add("divComplete")
    divComplete.innerHTML = ('<i class="fas fa-check"></i>')
    buttonCompletePurchase.appendChild(divComplete)

    // ButtonCompletePurchaseText 
    let buttonCompletePurchaseText = document.createElement("p")
    buttonCompletePurchaseText.innerText = "Slutför ditt köp"
    buttonCompletePurchase.appendChild(buttonCompletePurchaseText)    

    loggedIn();
    showCorrectAuthBoxes();    
}


function loggedIn(){
    let main = document.getElementsByTagName("main")[0]
    let loggedInUser = localStorage.getItem("loggedInUser");
    let userList = JSON.parse(localStorage.getItem("users"));

    if(loggedInUser) {

        let sum = 0

        // Did a hide/show function with "click" to the title "Mina tidigare beställningar"
        let mypreOrders = document.createElement("h2");
        mypreOrders.innerText = "Mina tidigare beställningar"
        mypreOrders.classList.add("mypreOrders")
        main.appendChild(mypreOrders)
        document.querySelector(".mypreOrders").addEventListener("click", () => {
            if(bigBox.classList == "hidden"){
                bigBox.classList.remove("hidden")
            } else {
                bigBox.classList.add("hidden")
            }
        });

        let bigBox = document.createElement("div")
        bigBox.classList.add("hidden")
        main.appendChild(bigBox)

        for(let i = 0 ; i < userList.length ; i++){

            let user = userList[i]

            if(user.username == loggedInUser) {
            
                for(let j = 0 ; j < userList[i].orders.length ; j++){ 

                    let orders = userList[i].orders[j]

                    let containerprevious = document.createElement("div")
                    containerprevious.classList.add("containerprevious")
                    bigBox.appendChild(containerprevious)

                    let orderNumber = document.createElement("h3")
                    orderNumber.innerText = "Order: " + orders.order
                    orderNumber.classList.add("orderNumber")
                    containerprevious.appendChild(orderNumber)

                    let dateOfOrder = document.createElement("h3")
                    dateOfOrder.innerText = orders.date
                    dateOfOrder.classList.add("dateOfOrder")
                    containerprevious.appendChild(dateOfOrder)

                    for( let k = 0 ; k < userList[i].orders[j].products.cart.length ; k++ ){

                        let cart = userList[i].orders[j].products.cart[k]

                        let containerOfPreviousOrders = document.createElement("div")
                        containerOfPreviousOrders.classList.add("containerOfPreviousOrders")
                        bigBox.appendChild(containerOfPreviousOrders)

                        let productsOfOrder = document.createElement("div")
                        productsOfOrder.innerText = cart.product.title
                        productsOfOrder.classList.add("containingProducts")
                        containerOfPreviousOrders.appendChild(productsOfOrder)

                        let qtyOfProduct = document.createElement("div")
                        qtyOfProduct.innerText = cart.quantity + " st  x  " + cart.product.price + " kr"
                        qtyOfProduct.classList.add("containingProducts")
                        containerOfPreviousOrders.appendChild(qtyOfProduct)  
                    }

                    let containerTotalPrice = document.createElement("div")
                    containerTotalPrice.classList.add("containerTotalPrice")
                    bigBox.appendChild(containerTotalPrice)
                
                    let textTotalPrice = document.createElement("h4")
                    textTotalPrice.classList.add("textTotalPrice")
                    textTotalPrice.innerText = "Totalt pris: " + orders.products.total + " kr"
                    containerTotalPrice.appendChild(textTotalPrice) 

                }  
            }   
        }
    }
}
 
// This function will add an item on the selected product in cart 
function addItem(title) {

    for (let i = 0; i < cart.length; i++) {

        if(title == cart[i].product.title) {

            cart[i].quantity++
        }
        localStorage.setItem("cart", JSON.stringify(cart)); 
    }
    printNrOfElements();
    renderCart();
}

// This function will delete item from the cart list  
function deleteItem(title) {

    let productToDelete = title;

    for (let i = 0; i < cart.length; i++) {

        // comparing the object towards the list. If true:
        if (productToDelete == cart[i].product.title) {
        
            // Deletes the unique item from the list
            if(cart[i].quantity == 1) {
            cart.splice(i, 1);
            } else {
            cart[i].quantity--
            }
            // Updates the key "cart" in localStorage
            localStorage.setItem("cart", JSON.stringify(cart)); 

            // Calling the function deleteIt and printNrOfElements
            deleteIt();
            printNrOfElements();   
        }
    } 
}

function deleteIt() {

    // fetch the updated list from localStorage
    let cart = JSON.parse(localStorage.getItem("cart"));
    
    // If my cart is empty:
    if (cart == [] || cart == "") {
        localStorage.removeItem("cart");

        let cart = JSON.parse(localStorage.getItem("cart"));
        let wrapper = document.getElementsByClassName("wrapper")[0].style.display = "none"
        let totalPrice = document.getElementsByClassName("totalPrice")[0].style.display = "none"
        let buttonCompletePurchase = document.getElementsByClassName("buttonCompletePurchase")[0].style.display = "none"

        alert("Nu är din kundvagn tom!")

        printNrOfElements();

    } else { 
    renderCart(); 
    }
}

// Clear cart from local storage and clear the website from innecessary information
function completeTheOrder() {
 
    let loggedInUser = localStorage.getItem("loggedInUser");
    let userList = JSON.parse(localStorage.getItem("users"));
    let cart = JSON.parse(localStorage.getItem("cart"));
    let totalSum = cart.reduce((sum,item) => sum + item.product.price * item.quantity, 0);

    if(loggedInUser) {

        for( let i = 0 ; i < userList.length ; i++) {

            let user = userList[i]            
            
            if(user.username == loggedInUser) {
                
                let orderNr = Math.floor(Math.random() * 100) + 1;
                let now = new Date().toLocaleString()
         
                user.orders.push({
                    order: orderNr,
                    date: now,
                    products: {
                        cart,
                        total: totalSum},
                })

                localStorage.setItem("users", JSON.stringify(userList));

                localStorage.removeItem("cart")

                let wrapper = document.getElementsByClassName("wrapper")[0].style.display = "none"
                let totalPrice = document.getElementsByClassName("totalPrice")[0].style.display = "none"
                let buttonCompletePurchase = document.getElementsByClassName("buttonCompletePurchase")[0].style.display = "none"

                alert("Tack för din beställning!")

                printNrOfElements();
            } 

        }
        return
    } 

    localStorage.removeItem("cart");
    
    let wrapper = document.getElementsByClassName("wrapper")[0].style.display = "none"
    let totalPrice = document.getElementsByClassName("totalPrice")[0].style.display = "none"
    let buttonCompletePurchase = document.getElementsByClassName("buttonCompletePurchase")[0].style.display = "none"

    alert("Tack för din beställning!")

    printNrOfElements();
}


// What will be shown if you're logged in or not
function showCorrectAuthBoxes() {

    let loggedInUser = localStorage.getItem("loggedInUser")


    if(loggedInUser) {

        document.getElementsByClassName("myPage")[0].classList.add("hidden")
        document.getElementsByClassName("logOut")[0].classList.remove("hidden")

        let main = document.getElementsByTagName("main")[0]

        let containUser = document.createElement("div")
        containUser.classList.add("containUser")
        main.appendChild(containUser)

        let showUser = document.createElement("p")
        showUser.classList.add("showUser")
        showUser.innerText = "Inloggad användare: " + loggedInUser
        containUser.appendChild(showUser)
            
        return
    } 

    document.getElementsByClassName("myPage")[0].classList.remove("hidden")
    document.getElementsByClassName("logOut")[0].classList.add("hidden")
    loggedInUser = []
}

// When you click on logOut-link
document.querySelector(".logOut").addEventListener("click", () => {
    document.getElementsByClassName("myPage")[0].classList.remove("hidden")
    document.getElementsByClassName("logOut")[0].classList.add("hidden")
    localStorage.removeItem("loggedInUser")
    alert("Du är utloggad!")
})

// Calling this function when the window opens
window.addEventListener("load", renderCart)
window.addEventListener("load", printNrOfElements)
window.addEventListener("load", showCorrectAuthBoxes);

