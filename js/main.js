var listOfProducts;

/** Get products from the json file and store it in a gobal variable */
function loadProducts() {
    fetch("./products.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(products) {
        listOfProducts = products;
        addProductsToWebpage(); 
    });
}
    loadProducts();

/** Uses the loaded products data to create a visible product list on the website */

function addProductsToWebpage() { 
    let main = document.getElementsByTagName("main")[0] 

    for(i = 0; i < listOfProducts.length; i++) {        
    let CreatePackage = createProduct(listOfProducts[i])
    main.appendChild(CreatePackage) 
    }
}

// Creat function for products 
function createProduct(product) {

    // Creates container for all PhoneModels
    let div = document.createElement("div") 
    div.classList.add("phoneModelContainer")

    // Creates h1 for PhoneModels  
    let phoneModelText = document.createElement("h1") 
    phoneModelText.innerText = product.title
    div.appendChild(phoneModelText)

    // Creates PhoneDescription
    let phoneDescription = document.createElement("h2")
    phoneDescription.innerText = product.description
    div.appendChild(phoneDescription)

    // Creates container for Phoneimage
    let imageContainer = document.createElement("div")
    imageContainer.classList.add("imageContainer")
    div.appendChild(imageContainer)

    // Creates PhoneImage
    let productImg = document.createElement("img")
    productImg.src = "./assets/" + product.image
    productImg.classList.add("productImg")
    imageContainer.appendChild(productImg)

    // Creates Price 
    let priceContainer = document.createElement("h3")
    priceContainer.innerText = product.price + " kr"
    div.appendChild(priceContainer)

    // Create container for button
    let buttonContainer = document.createElement("productCard") 
    buttonContainer.classList.add("buttonContainer")
    
    // Add to cart button
    let addToCartButton = document.createElement("button")
    addToCartButton.title = product.title; 
    buttonContainer.onclick = function () 
    {addToCart(product);};
    div.appendChild(buttonContainer)  
    
    // Button Text
    let buttonText = document.createElement("p")
    buttonText.innerText = "Lägg till i kundvagnen"
    buttonText.classList.add("white")
    buttonContainer.appendChild(buttonText)
     
    // Button Icon
    let buttonIcon = document.createElement("div") 
    buttonIcon.classList.add("buttonIcon")
    buttonIcon.innerHTML = '<i class="fas fa-cart-arrow-down"></i>' 
    buttonContainer.appendChild(buttonIcon)

    return div

}
    
//  An empty array 
let cart = []
     
// This function collect and return cartlist from localStorage. If not existing, returns a empty array 
function addToCart(product) {     
    let cart = localStorage.getItem("cart")
    if(cart) {
        cart = JSON.parse(cart)
    } else {
        cart = []
    }

    let index = cart.findIndex((cartItem) => { 
    
        if(cartItem.product.title == product.title) {
            return true 
        }

    })

    if(index < 0) {
        cart.push({
            product: product, 
            quantity: 1
        })

    alert("Nu är " + product.title + " tillagd i kundvagnen")

    } else {
        cart[index].quantity++

        alert("Nu är " + product.title + " tillagd i kundvagnen")
    }

    localStorage.setItem("cart", JSON.stringify
    (cart));

    printNrOfElements();
}

// Creating the function for cartnumber
function printNrOfElements() {
    let numberCart = document.getElementById("qty") 

    let cart = localStorage.getItem("cart")

    if(cart) {
        cart = JSON.parse(cart)
    } else { 
        cart = []
    }

    let totalSum = cart.reduce((sum,item) => sum + item.quantity, 0);

    numberCart.innerText = totalSum

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

    showCorrectAuthBoxes();
})

window.addEventListener("load", showCorrectAuthBoxes);
window.addEventListener("load", printNrOfElements);