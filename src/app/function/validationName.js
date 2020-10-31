const validateName = (name) => {
    var regex = /^[a-zA-Z ]{2,30}$/;
    return regex.test(name);
}

export default validateName
