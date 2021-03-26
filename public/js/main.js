const toggle = (e) => {
    e.preventDefault();
    var button = document.querySelector('#customer');
    
    var button2 = document.querySelector('#mechanic');
    if(button.className === 'customer' ) {
        button.className = "customer-selected";
        button2.className ='mech';
    }
    
    

    
}
const toggle2 = (e) => {
    e.preventDefault();
    var button = document.querySelector('#mechanic');
    var button2 = document.querySelector('#customer');
    
    if(button.className === 'mech' ) {
        button.className = "mechanic-selected"; 
        button2.className ='customer';
}
    
}

const login = (e) => {
    e.preventDefault();
    console.log('login initialises here');
}