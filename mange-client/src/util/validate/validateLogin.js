let msgs = [];

const displayErrorMsgs = function (msgs, loginForm) {
    const ul = document.createElement("ul"); // creates a ul
    ul.classList.add("messages"); // adds a class to the ul
    ul.style.color = "red";
    if(msgs === 'Login Success!'){
        ul.style.color = 'green'
    }
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

const clearErrors = function(){
    const elements = document.getElementsByClassName('messages')
    Array.from(elements).forEach(function(element){
        element.remove()
    });
    msgs = [];
}

let validate = async function (em, p, loginForm, customError = '')  {
    let email = em;
    let password = p;
    const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\b/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    let pathname;
    
    if(customError !== ''){
        msgs[msgs.length] = customError;
    }
    else if (!emailPattern.test(email)) {
        msgs[msgs.length] = "Please enter a valid email address.";
    } 
    else if (!passwordPattern.test(password)) {
        msgs[msgs.length] = "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one digit, and one special character.";
    }
    if (msgs.length == 0) {
        // returns a Promise
          try{
            return 0;
          }catch(err){
              console.error({message:"Username or Password is incorrect", Error: err})
          }
      }
    displayErrorMsgs(msgs, loginForm)
    setTimeout(() => clearErrors(), 5500);
    return pathname
}

export { clearErrors, validate };