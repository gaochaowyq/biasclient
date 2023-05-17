import CryptoJS from 'crypto-js';
const CHSToBase64=(str)=>{

    return CryptoJS.MD5(str).toString()
}

const CHSFromBase64=(str)=>{
        const base64 = atob(str); // Encode to Base64
        const decodedString = new TextDecoder('utf-8').decode(new Uint8Array([...base64].map(char => char.charCodeAt(0)))); // Decode binary string to UTF-8 string

    return decodedString
}
export {CHSFromBase64,CHSToBase64}