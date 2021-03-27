const register = (e) => {
    e.preventDefault();
    const fullname = e.target.elements.name.value;
    console.log(fullname);
}