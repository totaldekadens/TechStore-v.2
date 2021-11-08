
const logOut = document.querySelector(".logout")
const myPage = document.querySelector(".myPage")
const buttonCA = document.querySelector(".buttonCA")
const loginForm = document.querySelector("#login")
const createAccountForm = document.querySelector("#createAccount")


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

// Switching between Login-form and create account-form
document.addEventListener("DOMContentLoaded", () => {

    // Clicking on the link - Login-form will appear and create account-form will dissapear
    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault(); // e will prevent us going back to startpage when clicking on button
        loginForm.classList.add("hidden");
        createAccountForm.classList.remove("hidden");
    });
    // Clicking on the link - create account-form will appear and Login-form will dissapear
    document.querySelector("#linkLogIn").addEventListener("click", e => {
        e.preventDefault();  // e will prevent us going back to startpage when clicking on button
        loginForm.classList.remove("hidden");
        createAccountForm.classList.add("hidden");
    });
});


// Create account - process


// Creates a function when you click on "Skapa konto"-button   
buttonCA.addEventListener("click", e => {
    e.preventDefault(); // prevents reloading the page  

    const username = document.getElementById("user").value
    const password = document.getElementById("pw").value
    const isValid = validateInputs(username, password)
    let usernameisfree = true

    // Fetching the userlist from local storage
    let userList = localStorage.getItem("users")

        // if the "isValid"-function is false (See the function below)
        if(!isValid) {
            alert("Behöver ha fler än 4 tecken")
            return
        }

        // If something is in the userlist, do a parse. Else, leave it empty. 
        if(userList) {
            userList = JSON.parse(userList)
        } else {
            userList = []
        }

        // Comparing if the username you want to create already exists in the list
        for(let i = 0 ; i < userList.length; i++) {
            
            let user = userList[i]
            
            if(user.username == username) {

                usernameisfree = false

                if(!usernameisfree) {
                    alert("Användarnamnet är upptaget!")
                    return
                }
            }
        }   

    // If you get through the validation the credentials will be pushed to the userlist
    userList.push({username, password, orders: []})

    // If a push is being made, you will get an confirmation and will be redirected to login
    if(userList.push) {
        alert("Ditt konto är skapat! Nu kan du logga in")
        loginForm.classList.remove("hidden");
        createAccountForm.classList.add("hidden");
    }
    // Updates the list in local storage
    localStorage.setItem("users", JSON.stringify(userList))
})

// Checking if the inputs have more than 4 characters     
function validateInputs(username, password) {
    if(username.length >= 4 && password.length >= 4){
        return true
    }
        return false
}

// Login - process


// Function for clicking on the "logga in"-button
document.querySelector(".button").addEventListener("click", e => {
 
    const inputUserName = document.getElementById("inputUserName").value
    const inputPassword = document.getElementById("inputPassword").value

    //fetching theuserlist from local storage
    let userList = localStorage.getItem("users")

    if(userList) {
        userList = JSON.parse(userList)
    } else {
        userList = []
    }

    // compare the lists. The match will return
    let logInUser = userList.find((user) => {

        return (user.username == inputUserName && user.password == inputPassword)
    })

    // If we get a match, we push the match to the new list "loggedInUser". If not, we have the wrong credentials
    if(logInUser) {

        let loggedInUser = inputUserName

        
        localStorage.setItem("loggedInUser", loggedInUser);
        alert("Du är inloggad!"  + " Välkommen " + inputUserName + "!" ) 
        
        showCorrectAuthBoxes();

        return
    } 
    else {
        alert("Fel användarnamn eller lösenord")
    }
})

// What will be shown if you're logged in or not
function showCorrectAuthBoxes() {

    let loggedInUser = localStorage.getItem("loggedInUser")


    if(loggedInUser) {
        document.getElementsByClassName("myPage")[0].classList.add("hidden")
        document.getElementsByClassName("logOut")[0].classList.remove("hidden")
        document.querySelector(".container").classList.add("hidden")
        location.href = 'index.html';

        return
    } 

        document.getElementsByClassName("myPage")[0].classList.remove("hidden")
        document.getElementsByClassName("logOut")[0].classList.add("hidden")
        document.querySelector("#login").classList.remove("hidden")
        loggedInUser = []

}

// What will happen when you click on the logOut-link
document.querySelector(".logOut").addEventListener("click", () => {
    document.getElementsByClassName("myPage")[0].classList.remove("hidden")
    document.getElementsByClassName("logOut")[0].classList.add("hidden")
    document.querySelector("#login").classList.remove("hidden")

    let loggedInUser = localStorage.getItem("loggedInUser")
    let userList = localStorage.getItem("users")

    localStorage.removeItem("loggedInUser")
    alert("Du är utloggad!")
})

 window.addEventListener("load", showCorrectAuthBoxes);
 window.addEventListener("load", printNrOfElements)