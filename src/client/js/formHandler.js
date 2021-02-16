function handleSubmit(event) {
    event.preventDefault()

    let formText = document.getElementById('url').value

    // check if URL is valid
    if (Client.checkURL(formText)) {
        console.log("::: URL SUBMITTED :::")
        //call meaningCloud API
        postData('http://localhost:8081/meaningCloud', {url: formText})
            //update UI
            .then(function (data) {
                updateUI(data)
            })
    }
}

const postData = async (url = '', data = {}) => {

    console.log("::: FETCHING DATA :::")

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log('error', error);
    }
};

const updateUI = async (data = {}) => {
    try {
        document.getElementById("input_text").innerHTML = `<span>URL checked:</span> ${data.input_text}`;
        document.getElementById("score_tag").innerHTML = `<span>Score Tag:</span> ${data.score_tag}`;
        document.getElementById("agreement").innerHTML = `<span>Agreement:</span> ${data.agreement}`;
        document.getElementById("subjectivity").innerHTML = `<span>Subjectivity:</span> ${data.subjectivity}`;
        document.getElementById("confidence").innerHTML = `<span>Confidence:</span> ${data.confidence}`;
        document.getElementById("irony").innerHTML = `<span>Irony:</span> ${data.irony}`;
    } catch (error) {
        console.log('error', error)
    }
    console.log("::: UI UPDATED :::")
}


export {handleSubmit}
