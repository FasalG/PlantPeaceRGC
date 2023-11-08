//login person name
var newusername = JSON.parse(localStorage.getItem("single"))
// login text
var text = document.getElementById("logintext")
if (newusername!==null) {
      text.innerText = newusername.username
} else {
    text.innerText = "Login"
}

//Retrive loggedinuser details
const loggedInUser = localStorage.getItem('loggedInUser');
//retrive cartitems
var itemsaddedincart = JSON.parse(localStorage.getItem(loggedInUser+"cart")) || [];

//html printing loop function
function name(itemsaddedincart) { 

          //grt html data
          var eachitem = document.getElementById("eachcartitems")
          var subtotalAmount = document.getElementById("subtotal")

          let allitemincart = ''
          let subtotal =0
          //add teh cart items in html page throug looping each cart item
          itemsaddedincart.forEach((cartitems) => {
                  allitemincart += `
                          <div class="card d-flex flex-row mb-3">
                              <img src="${cartitems.image}" class="card-img-top" alt="...">
                            <div class="card-body d-flex justify-content-between">
                                <div class="price">
                                  <h3 class="card-title">${cartitems.plantname}</h3>
                                  <p class="card-text">Price: $${cartitems.price*cartitems.quantity} </p>
                                </div> 
                                <div class="quant d-flex" data-id="${cartitems.id}">             
                                  <button class="_23FHuj" id="qdown">-</button>
                                  <div class="_26HdzL" id="nums">${cartitems.quantity}</div>
                                  <button class="_23FHuj" id="qup"> + </button>
                                </div>
                              </div>
                            </div> 
                      `
                  subtotal += parseInt(cartitems.price*cartitems.quantity)

                    });
eachitem.innerHTML = allitemincart  
subtotalAmount.innerText = subtotal
}
//Calling function
name(itemsaddedincart)

//Your cart number
var carthead = document.getElementById("carthead");
carthead.innerText=`Your Cart(${itemsaddedincart.length})`


//original in home below is duplicate
//Your cart count in home page
//retrive cartitems
var itemsaddedincart = JSON.parse(localStorage.getItem(loggedInUser+"cart")) || [];
var cartcount = document.getElementById("cartcount");
cartcount.innerText=`${itemsaddedincart.length}`


//increase count while clicking the arrow+
// Get the container element for the cart items
const wholecart = document.getElementById("eachcartitems");
// Handle click events using event delegation
wholecart.addEventListener("click", (event) => {
  const target = event.target;

  if (target.id === "qup" || target.id === "qdown") {
    // Find the closest parent with class "cartitem"
    const cartitem = target.closest(".quant");

    if (cartitem) {
      const quantityElement = cartitem.querySelector("#nums");
      if (quantityElement) {
        let quantity = parseInt(quantityElement.innerText, 10);

        if (target.id === "qup") {
          quantity++; // Increase quantity when the up button is clicked
        } else if (target.id === "qdown" && quantity > 0) {
          quantity--; // Decrease quantity when the down button is clicked, but only if the quantity is greater than 0
        }
       
        // Update the quantity in the HTML
        quantityElement.innerText = quantity;
    
        // Update the quantity in the cart items stored in localStorage
        const cartItemId = cartitem.getAttribute("data-id");
        //loggenInUser already declared above
        let itemsaddedincart = JSON.parse(localStorage.getItem(loggedInUser + "cart")) || [];

        // Find the item in the cart by its unique ID
        const itemToUpdate = itemsaddedincart.find(item => item.id === parseInt(cartItemId, 10));

        if (itemToUpdate) {
            if (quantity === 0) {
                // Remove the item from the cart when quantity becomes 0
                existingitemsincart = itemsaddedincart.filter(item => item.id !== itemToUpdate.id);
                localStorage.setItem(loggedInUser + "cart", JSON.stringify(existingitemsincart));
                //looping the new arrayobjects into html
                name(existingitemsincart);
                //Your cart count in cart page
                carthead.innerText=`Your Cart(${existingitemsincart.length})`
                //cart count in cart page
                cartcount.innerText=`${existingitemsincart.length}` 
                //to show empty cart
                if(existingitemsincart.length===0){
                  var emptycart = document.getElementById("emptycart")
                  var eachcartitems = document.getElementById("eachcartitems")
                  var buypart = document.getElementById("buypart")
                  var cartpage = document.querySelector(".cartpage")
                  emptycart.style.display ="block"
                  eachcartitems.style.display = "none"
                  buypart.style.display = "none"
                  cartpage.style.backgroundColor = 'white'
                }      
             }else{
                itemToUpdate.quantity = quantity;
                name(itemsaddedincart);
                localStorage.setItem(loggedInUser + "cart", JSON.stringify(itemsaddedincart));


                //to show emptycart
                if(itemsaddedincart.length===0){
                  var emptycart = document.getElementById("emptycart")
                  var eachcartitems = document.getElementById("eachcartitems")
                  var buypart = document.getElementById("buypart")
                  var cartpage = document.querySelector(".cartpage")
                  emptycart.style.display ="block"
                  eachcartitems.style.display = "none"
                  buypart.style.display = "none"
                  cartpage.style.backgroundColor = 'white'
                } 
             }       
      
         }
      }
    }
  }
});



 //Your cart count in cart page

// //retrive cartitems
var cartcount = document.getElementById("cartcount");

var emptycart = document.getElementById("emptycart")
var eachcartitems = document.getElementById("eachcartitems")
var buypart = document.getElementById("buypart")
var cartpage = document.querySelector(".cartpage")

if(itemsaddedincart.length===0){
  emptycart.style.display ="block"
  eachcartitems.style.display = "none"
  buypart.style.display = "none"
  cartpage.style.backgroundColor = 'white'
  
} 

//TO check delivery addres and checkmark in payment to active confirm button

var confirmbutton = document.getElementById("confirmbtn");
var textArea = document.getElementById("myTextarea");
var Cash = document.getElementById("Cash");
var Credit = document.getElementById("Credit");



function validation() {
  if (textArea.value.trim()!=="" && (Cash.checked || Credit.checked)) { 
      confirmbutton.removeAttribute("disabled");      
  } else {
      confirmbutton.setAttribute("disabled", "true");
  }
  
}


// Add event listeners to the form elements
textArea.addEventListener("input", validation);
Cash.addEventListener("change", validation);
Credit.addEventListener("change", validation);

validation(); // Call the validation function on page load


// To remove all cart ites when click confirm button
confirmbutton.addEventListener("click", function deletecartitem() {

      // Step 2: Remove all objects by assigning an empty array
      itemsaddedincart=[]

      // Step 3: Update the modified array (empty) in localStorage
      localStorage.setItem(loggedInUser + "cart", JSON.stringify(itemsaddedincart));
      name(itemsaddedincart);
      emptycart.style.display ="block"
      eachcartitems.style.display = "none"
      buypart.style.display = "none"
      cartpage.style.backgroundColor = 'white'
      carthead.innerText=`Your Cart(${itemsaddedincart.length})`
      cartcount.innerText=`${itemsaddedincart.length}`
   
  })






    

 




