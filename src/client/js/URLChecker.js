function checkURL(inputURL) {
    console.log("::: Running checkURL :::", inputURL);
    let names = [
        "0000",
        "fefefe"
    ]

    if(names.includes(inputURL)) {
        alert("You've guessed the password!")
    }
}

export { checkURL }
