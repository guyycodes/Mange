let msgs = [];

const displayErrorMsgs = function (msgs, loginForm) {
    const ul = document.createElement("ul"); // creates a ul
    ul.classList.add("messages"); // adds a class to the ul
    ul.style.color = "red";
    // Clear the ul before appending new messages
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }
    for (let msg of msgs) {
        const li = document.createElement("li");
        const text = document.createTextNode(msg);
        li.appendChild(text);
        ul.appendChild(li);
    }
    const node = document.querySelector(".messages"); // selects the ul just made by its class

    if(node == null) {
        loginForm.parentNode.insertBefore(ul, loginForm)
    } else{
        // node.parentNode.replaceChild(ul, node);
        return
    }
}

const clear = function(){
    const elements = document.getElementsByClassName('messages')
    Array.from(elements).forEach(function(element){
        element.remove()
    });
    msgs = [];
}

let validateNewAccount = async function (em, p, cf, loginForm)  {
    let email = em;
    let password = p;
    let confirmedPassword = cf;
    const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\b/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // Check if passwords match
    if (password !== confirmedPassword) {
        msgs[msgs.length] = "Passwords do not match. 😅";
    }
    else if (!emailPattern.test(email)) {
        msgs[msgs.length] = "Please enter a valid email address. 😅";
    } 
    else if (!passwordPattern.test(password)) {
        msgs[msgs.length] = "😅 Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one digit, and one special character.";
    }
    if (msgs.length == 0) {
      // returns a Promise
        try{
          return 0; // 0 represents normal state
        }catch(err){
            console.error({message:"Username or Password is incorrect", Error: err})
        }
    }
    displayErrorMsgs(msgs, loginForm)
    setTimeout(() => clear(), 9000);
}

export { clear, validateNewAccount };