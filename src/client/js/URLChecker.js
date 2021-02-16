function checkURL(inputURL) {
    console.log("::: CHECKING URL :::");

    const regex = new RegExp(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi);

    if (inputURL.match(regex)) {
        console.log(inputURL, "is a valid URL");
        return true;
    } else {
        console.log(inputURL, "is NOT a valid URL");
        alert("Please enter a valid URL");
        return false;
    }

}

export {checkURL}
