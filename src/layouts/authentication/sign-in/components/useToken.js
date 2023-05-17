import {useState} from 'react';

const useToken = () => {
    const getToken = () => {
        const userToken = sessionStorage.getItem('token');
        return userToken?userToken:null
    };
    const saveToken = userToken => {
        sessionStorage.setItem('token', userToken);
        setToken(userToken.token);
    };


    const [token, setToken] = useState(getToken());

    return {
        setToken: saveToken,
        token
    }
};
export default useToken