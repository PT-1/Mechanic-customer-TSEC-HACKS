
window.onload = function checkCategory() {
    var category = "@category";
    // const category = document.getElementById('category').getAttribute('category_type');
    // const category = $category.getAttribute('category_type');
    console.log("category" + category);
    if (category === "Mechanic") {
        const customerForm = document.getElementById("#customerForm");
        customerForm.style.display = 'none';
        // customerForm.className += " cust";

    }
}
