import {useState} from 'react';

const useToken = () => {
    const getToken = () => {
        const userToken = sessionStorage.getItem('token');
        return userToken?userToken:null
    };


    const [token, setToken] = useState(getToken());

    const saveToken = userToken => {
        sessionStorage.setItem('token', userToken);
        setToken(userToken.token);
    };
    return {
        setToken: saveToken,
        token
    }
};
export default useToken