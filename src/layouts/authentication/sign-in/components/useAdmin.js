import {useState} from 'react';
const useAdmin = () => {
    const getAdmin = () => {
        const isAdmin = sessionStorage.getItem('admin');
        return isAdmin?Admin:null
    };
    const saveAdmin = Admin => {
        sessionStorage.setItem('admin', userToken);
        setToken(userToken.token);
    };
    const [admin, setAdmin] = useState(getAdmin());

    return {
        setAdmin: saveAdmin,
        admin
    }
};
export default useAdmin