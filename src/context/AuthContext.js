import {createContext, useState,useEffect} from 'react';

const authContext = createContext({});

const AuthProvider = ({children}) => {
    const [token, setToken] = useState(sessionStorage.getItem('token') || null);
    const [admin, setAdmin] = useState(JSON.parse(sessionStorage.getItem('admin')) || null);
    useEffect(() => {
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('admin', JSON.stringify(admin));
    }, [token,admin]);

    // we will use loading later
    const setAuthData = (token, admin) => {
        setToken(token);
        setAdmin(admin);
    };

    // a function that will help us to add the user data in the auth;

    return (
        <authContext.Provider value={{token,admin, setAuthData}}>
            {children}
        </authContext.Provider>
    );
};
export {AuthProvider, authContext};