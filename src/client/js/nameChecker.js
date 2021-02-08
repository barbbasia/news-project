function checkForName(inputText) {
    console.log("::: Running checkForName :::", inputText);
    let names = [
        "0000",
        "fefefe"
    ]

    if(names.includes(inputText)) {
        alert("You've guessed the password!")
    }
}

export { checkForName }
