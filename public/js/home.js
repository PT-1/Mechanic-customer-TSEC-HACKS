
window.onload = function checkCategory() {
    const category = document.querySelector('#passVar').innerText;
    // const category = $category.getAttribute('category_type');
    console.log(category + " "+ "this is in the cliend js of home");
   
    // console.log("category" + category);
    if (category == " Mechanic ") {
        const customerForm = document.querySelector("#customerForm");
    
    console.log(customerForm);
    customerForm.className += " cust";

    }
}
var user_latitude = 1.1
var user_longitude = 12.12
if('geolocation' in navigator) {
    console.log('available');
    navigator.geolocation.getCurrentPosition((position) => {
        user_latitude = position.coords.latitude;
        user_longitude = position.coords.longitude;
        console.log(position.coords.latitude, position.coords.longitude);
      });
  } else {
   console.log('not available');
  }

const service = (e) => {
    e.preventDefault();
    const vehicletype = e.target.elements.vehicletype.value;

    if (user_latitude != null && user_longitude != null){
        fetch(`/getMechanics?user_latitude=${user_latitude}&user_longitude=${user_longitude}`).then(response => {
        response.json().then(data => {
           res.send({
               err: 'Mechanics are not available'
           })
        })   
        
   })
    }

}
// var address = "Janghai, Uttar Pradesh";
// var url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoicmFuaml0dHR0dCIsImEiOiJja2g3aWR4dGowOHVtMzBsbGl6d3pwYWJ5In0.slVpbEJIHo5WBwUEParWPQ&limit=1`;
//     if(address === ''){ 
//         // return callback('network unavailable',undefined);
//         console.log("No address");
//         }
//         request({ url : url , json : true } , (err ,res ) => {
//         if(err) {
//             callback('network unavailable',undefined);
//         } else if(res.body.features.length === 0) {
//             callback('unable to find a location with that address',undefined);
//         } else {
//             callback(undefined, {
//                 lat : res.body.features[0].center[0],
//                 lon : res.body.features[0].center[1],
//                 location : res.body.features[0].place_name
//             })
//         }

//     })