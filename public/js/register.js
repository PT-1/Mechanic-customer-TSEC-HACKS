const register = (e) => {
    e.preventDefault();
    const fullname = e.target.elements.name.value;
    const username = e.target.elements.username.value;
    const mobileNo = e.target.elements.mobile.value;
    const address = e.target.elements.addressroom.value +" "+ e.target.elements.addresslocality.value +" "+ e.target.elements.addresslandmark.value +" "+ e.target.elements.addressdistrict.value +" "+ e.target.elements.addresspincode.value;
    const password = e.target.elements.password.value;
    const cnfpassword = e.target.elements.confirmpassword.value

    if(cnfpassword === password) {
        fetch('/register',{
            method: "POST", 
            body: JSON.stringify({ 
                fullname :fullname ,
                username:username,
                mobileNo :mobileNo,
                address :address,
                password :password,
   
                
            }), 
            headers: { 
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => {
         response.json().then(data => {
             if(data.err) console.log('helllekeosdnfs');
         })   
         
    })
    }
    console.log('hello world');
}

