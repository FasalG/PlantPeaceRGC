var cartcount = document.getElementById("cartcount");
var cartimg = document.getElementById("cartimg");

//retrieving teh local storage data after login
var newtext = JSON.parse(localStorage.getItem("single"))

var logintext = document.getElementById("logintext")

if (newtext!==null) {    
    logintext.innerText=newtext.username
} else {
    logintext.innerText="Login"
}



const selectedproduct = JSON.parse(localStorage.getItem("product"))

// imagepart
const mainimage= document.getElementById("main-image");
mainimage.src=selectedproduct.image
const image1= document.getElementById("img-1");
image1.src=selectedproduct.image
const image2= document.getElementById("img-2");
image2.src=selectedproduct.image
const image3= document.getElementById("img-3");
image3.src=selectedproduct.image
// plantdetails
const plantname=document.getElementById("plantname");
plantname.innerText = selectedproduct.plantname
const price = document.getElementById("price");
price.innerText = `$${selectedproduct.price}`


// // add to cart

const addtocart= document.getElementById("addtocart");
// const gotocart= document.getElementById("gottocart");

const completeProduct = JSON.parse(localStorage.getItem("allproducts")) || [];

//Retrive loggedinuser details
const loggedInUser2 = localStorage.getItem('loggedInUser');
// Retrieve the existing cart items from localStorage
let existingCart2 = JSON.parse(localStorage.getItem(loggedInUser2+'cart')) || [];

addtocart.addEventListener('click', () => {
    
        if (newtext!==null){
                let producttocart = completeProduct.find(items => items.id === parseInt(selectedproduct.id))

                let existingproductincart = existingCart2.find(item => item.id === parseInt(producttocart.id))

                if (existingproductincart) {
                    existingproductincart.quantity = (existingproductincart.quantity || 1) + 1; 
                }     
                else{
                    producttocart.quantity = 1;
                    existingCart2.push(producttocart);
                    cartcount.innerText=`${existingCart2.length}`  
                  
                }
            // Update the local storage with the modified cart
            localStorage.setItem(loggedInUser2+"cart", JSON.stringify(existingCart2));
            addtocart.style.display = "none"
            gotocart.style.display = "block"
            
            
        }
        else{
              alert("Please login") 
        }
 })


 //go to cart

 function cartpage() {
    window.location.href= "cart.html"
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


// Image circulation in product page
const smallimages = document.getElementsByClassName("smallimg");
const smallimagesArray = [...smallimages];

// Store the initial main image source

smallimagesArray.forEach(element => {
    element.addEventListener("click", function img() {
          // Swap the src attribute of the small image and the main image
          const tempSrc = element.src;
          element.src = mainimage.src;
          mainimage.src = tempSrc;
        
    });
});


// All below js is in home.js copy pasted to apply same js in product carousal

//retretrieve all products
let cartitems = JSON.parse(localStorage.getItem("allproducts"))||[]

// Related products carouasal
const owl = document.getElementById("main");

let owlContent ='';
//looping through each object in the array
cartitems.forEach((item) => {
  //addong all the html in a variable
      owlContent += `
            <div class="item me-4">
                <div class="plantcard card">
                  <div class="imagediv">
                    <img src="${item.image}" class="card-img-top">
                  </div>
                    <div class="card-body">
                        <h3 class="plantname">${item.plantname}</h3>
                        <p class="price" id="price1">$${item.price.toFixed(2)}&nbsp&nbsp <span class="og-rate"><del>$${item.ogprice.toFixed(2)}</del></span></p>
                        <button type="button" class="addtocart-btn btn btn-sm" data-id="${item.id}">Add to cart</button>
                    </div>
                </div>
            </div> 
               `
          });
//pringting the complete html inside owl
owl.innerHTML = owlContent;

// Carousal jquerry
$('.owl-carousel').owlCarousel({
  loop:true,
  margin:10,
  nav:true,
  responsive:{
      0:{
          items:1
      },
      600:{
          items:2.5
      },
      1000:{
          items:4
      }
  }
})

//product ddetails fetching
//retrive image div
var productimage = document.querySelectorAll('.imagediv')


productimage.forEach(image => {
 
    image.addEventListener("click", function prodetails(event) {
      const target = event.target;

      //taking the parent div
      const productparent = target.closest(".plantcard");
      //taking the element which contain data-id
      const addtocartbtn = productparent.querySelector(".addtocart-btn")
      //taking the attribute data-id
      const productid = addtocartbtn.getAttribute('data-id')
      
      const productdetails = cartitems.find(item=> item.id ===  parseInt(productid, 10) )    
      
      localStorage.setItem("product",JSON.stringify(productdetails))   

      window.location.href="product.html"

    })

 
})

// fadeout teh value jquerry for carousal
$(document).ready(function() {
    $(".plantcard").mouseenter(function() {
      $(this).find(".og-rate").fadeOut("slow");
      
    });
  
    $(".plantcard").mouseleave(function() {
      $(this).find(".og-rate").fadeIn("slow");
          
    });
  });

  // Add to cart
//retrive button
var addtocartbtn = document.querySelectorAll('.addtocart-btn')

//Retrive loggedinuser details
const loggedInUser = localStorage.getItem('loggedInUser');
// Retrieve the existing cart items from localStorage
let existingCart = JSON.parse(localStorage.getItem(loggedInUser+'cart')) || [];
addtocartbtn.forEach(button => {
        button.addEventListener('click', () => {
          
         // Give acces to add to cart after only login
          if (newtext!==null){
            // Retrieve the product ID from the data-id attribute
            const productId = button.getAttribute('data-id');

            // Find the product in cartitems using the product ID
            const selectedItem = cartitems.find(item => item.id === parseInt(productId, 10));

            const existingItem = existingCart.find(items => items.id ===selectedItem.id);
            if (existingItem) {
              existingItem.quantity = (existingItem.quantity || 1) + 1;         
            }
            else{
            selectedItem.quantity = 1;
              existingCart.push(selectedItem);
              cartcount.innerText=`${existingCart.length}`  
            }

                // Update the local storage with the modified cart
            localStorage.setItem(loggedInUser+"cart", JSON.stringify(existingCart));
            
          }
          else{
            swal("Please login")
            cartimg.href = "#"
            cartcount.innerText=''  
          }
          
        });
    });
    
 

if (newtext!==null) {
  cartcount.innerText=`${existingCart.length}`  
} else {
  cartcount.innerText=''  
}











