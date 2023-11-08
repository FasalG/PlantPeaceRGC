

var loginbutton=document.getElementById("login")


loginbutton.addEventListener("click", function (event) {

    const loginform = document.getElementById("loginformdetails")

    if (loginform.checkValidity()) {
        event.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
    
        // Retrieve users from local storage
        const users = JSON.parse(localStorage.getItem("users")) || [];
        
    
        // Find the user with the matching ID
        const user = users.find(u => u.email === email);
    
        if (user && user.password === password) {


            // Redirect to the user's profile page or any other page
            window.location.href = 'home.html'
           
            swal("Login successful. Welcome, " + user.username);

            localStorage.setItem("single",JSON.stringify(user))

            localStorage.setItem('loggedInUser', user.email);       
    
    
        } else {
            swal("Login failed. Please check your email and password.");
        }     

    } else {
        swal("Please fill all the required field")
    }
   
});