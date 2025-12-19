async function checkGrammar(text) {

    const params = new URLSearchParams();
    params.append('text', text);
    params.append('language', 'en-US');

    // Simple grammar check: ensure sentences start with a capital letter and end with a period.
    if(!text || typeof text !== 'string') {
        throw new Error('Invalid text input');
    }

    //fetching a public grammar API(does not take json and no api key needed)
    const response = await fetch('https://api.languagetool.org/v2/check', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString()
    });

    if (!response.ok) {
        throw new Error('Error checking grammar');
    }

    return response.json();
}

module.exports = checkGrammar;