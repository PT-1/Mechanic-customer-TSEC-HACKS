
window.onload = function checkCategory() {
    // var category = "@category";
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
