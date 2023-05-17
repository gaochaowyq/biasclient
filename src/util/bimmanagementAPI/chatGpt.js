import {url, openaiurl} from "./setting";
/**
 * Returns Price By API
 * @param {String} token mcoder of price.

 * @return {json}
 */
const fetchChatGpt = async (token,prompt) => {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Token " + token);

    var raw = JSON.stringify({
        "prompt": prompt
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw};
    const _url = `${url}/bimmanage/api/openai/`

    return await fetch(_url, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        })
        .catch(error => console.log('error', error));
}


export {fetchChatGpt}