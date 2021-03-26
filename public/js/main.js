const toggle = (e) => {
    e.preventDefault();
    var button = document.querySelector('#customer');
    
    var button2 = document.querySelector('#mechanic');
    if(button.className === 'customer btn' ) {
        button.className = "customer-selected btn";
        button2.className ='mech btn';
    }
    
   
    

    
}
const toggle2 = (e) => {
    e.preventDefault();
    var button = document.querySelector('#mechanic');
    var button2 = document.querySelector('#customer');
    
    if(button.className === 'mech btn' ) {
        button.className = "mechanic-selected btn"; 
        button2.className ='customer btn';
}


}

const login = (e) => {
    e.preventDefault();
    console.log('login initialises here');
}