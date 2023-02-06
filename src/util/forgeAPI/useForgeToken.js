import {useState} from 'react';
import fetchForgeToken from "../bimmanagementAPI/fetchForgeToken";
const useForgeToken = () => {
    const getForgeToken = () => {
        const forgeToken = sessionStorage.getItem('forgetoken');
        return forgeToken ? forgeToken : null
    };
    const [forgetoken, setForgeToken] = useState(getForgeToken());
    console.log("get forge auth")
    if (forgetoken!==undefined && forgetoken){
        return  forgetoken
    }
    else {
        fetchForgeToken().then(
            res=>{
                sessionStorage.setItem('forgetoken', res);
                setTimeout(function() { sessionStorage.removeItem('forgetoken'); }, (10*1000));
                setForgeToken(res);
                return res
            }
        )
    }

};
export default useForgeToken