
// to add product items dynamically
//Create a array of objects of plants
var cartitems = [
  {   
      id: 1,
      image:"images/Sliders/Photo.png",
      plantname: "Echinocereus Cactus",
      price: 15.00,
      ogprice: 35.00,
      quantity:1,
  },
  {
      id: 2,
      image:"images/Sliders/Photo (1).png",
      plantname: "Echinocereus",
      price: 16.00,
      ogprice: 40.00,
      quantity:1,
  },
  {
    id: 3,
    image:"images/Sliders/Photo(0).png",
    plantname: "Echinocereus Lilli",
    price: 20.00,
    ogprice: 50.00, 
    quantity:1,  
  },
  {
    id: 4,
    image: "images/Sliders/Photo (2).jpg" ,
    plantname: "Rose",
    price: 25.00,
    ogprice: 50.00,
    quantity:1,
  },
  {
    id: 5,
    image: "images/Sliders/Penguin.webp" ,
    plantname: "Penguin",
    price: 10.00,
    ogprice: 30.00,
    quantity:1,
  },
  {
    id: 6,
    image: "images/Sliders/flower.jpg" ,
    plantname: "Grampu",
    price: 30.00,
    ogprice: 40.00,
    quantity:1,
  },
  {
    id: 7,
    image: "images/Sliders/rubber-plant.webp" ,
    plantname: "Rubber tree",
    price: 20.00,
    ogprice: 60.00,
    quantity:1,
  }
]

let allProducts = localStorage.getItem('allproducts');
allProducts=cartitems

localStorage.setItem('allproducts', JSON.stringify(allProducts))



const owl = document.getElementById("main");
const owls = document.getElementById("mains");
let owlContents = '';
let owlContent = '';
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
                        <p class="price">$${item.price.toFixed(2)}&nbsp&nbsp <span class="og-rate"><del>$${item.ogprice.toFixed(2)}</del></span></p>
                        <button type="button" class="addtocart-btn btn btn-sm" data-id="${item.id}">Add to cart</button>
                    </div>
                </div>
            </div> 
               `
               owlContents += `
               <div class="item me-4">
                   <div class="plantcard card">
                     <div class="imagediv">
                       <img src="${item.image}" class="card-img-top">
                     </div>
                       <div class="card-body">
                           <h3 class="plantname">${item.plantname}</h3>
                           <p class="price">$${item.price.toFixed(2)}&nbsp&nbsp <span class="og-rate"><del>$${item.ogprice.toFixed(2)}</del></span></p>
                           <button type="button" class="addtocart-btn btn btn-sm" data-id="${item.id}">Add to cart</button>
                       </div>
                   </div>
               </div> 
                  `; 
          });
//pringting the complete html inside owl
owl.innerHTML = owlContent;
owls.innerHTML = owlContents;

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






// fadeout teh value jquerry for carousal
$(document).ready(function() {
    $(".plantcard").mouseenter(function() {
      $(this).find(".og-rate").fadeOut("slow");
      
    });
  
    $(".plantcard").mouseleave(function() {
      $(this).find(".og-rate").fadeIn("slow");
          
    });
  });


//Login access signout name
// login text
var text = document.getElementById("logintext")
//retrieving teh local storage data after login
var newtext = JSON.parse(localStorage.getItem("single"))

var dropdown = document.getElementById("dropdown")
var user = document.getElementById("user")
var logout = document.getElementById("logout")


//if data exist
if (newtext!==null) {
        text.innerText=newtext.username;        
        text.href = "#";
        user.style.display="none"
        dropdown.style.display="block"
        logout.addEventListener("click",function() {
          localStorage.removeItem("single")
          logout.href = "home.html"
          text.href = "login.html";
          user.style.display="block"
          dropdown.style.display="none"
          
        })
       
} else {
        // window.location.href = "home.html";
      
}


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
    
//Your cart count in home page
//retrive cartitems
var cartcount = document.getElementById("cartcount");
var cartimg = document.getElementById("cartimg");

if (newtext!==null) {
  cartcount.innerText=`${existingCart.length}`  
} else {
  cartcount.innerText=''  
}


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
