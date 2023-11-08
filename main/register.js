

var submitbutton=document.getElementById("register")


submitbutton.addEventListener("click", function (event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    //For validation
    var form=document.getElementById("registrationform")

    //Checking the required field is filled or not if not filled it will show alert
    if(form.checkValidity()){
                    // Generate a unique ID (for simplicity, we're using a timestamp)
                // const id = new Date().getTime().toString();

                // Create a user object
                const user = {
                    // id: id,
                    username: username,
                    email:email,
                    password: password
                };

                // Retrieve existing users or initialize an empty array
                const users = JSON.parse(localStorage.getItem("users")) || [];

                // Add the new user to the array
                users.push(user);

                // Store the updated user array in local storage
                localStorage.setItem("users", JSON.stringify(users));

                swal("Registration successful.");
                // Redirect to the login page
                window.location.href = "login.html";
                
        
            }
    else{    
            swal("Please fill all the required field")
        }

    
});





