const toggle = (e) => {
    e.preventDefault();
    var button = document.querySelector('#customer');
    
    var button2 = document.querySelector('#mechanic');
    if(button.className === 'customer btn' ) {
        button.className = "customer-selected btn";
        button2.className ='mech btn';
    }
    
   
    

    
}
// if('geolocation' in navigator) {
//     console.log('available');
//     navigator.geolocation.getCurrentPosition((position) => {
//         console.log(position.coords.latitude, position.coords.longitude);
//       });
//   } else {
//    console.log('not available');
//   }
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
    var formData = new FormData(document.querySelector('form'))
    console.log(formData.get("username"), formData.get("password"))
    username = formData.get("username")
    password = formData.get("password")
    fetch('/login',{redirect: 'follow',
        method: "POST", 
        body: JSON.stringify({ 
            username:username,
            password :password,
         }), 
        headers: { 
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(response => {
        if (response.redirected) {
            window.location.href = response.url;
        }
     response.json().then(data => {
         if(data.err) console.log('pair does not exist');
     })   
     
})
}