import fetchForgeToken from "../bimmanagementAPI/fetchForgeToken";

const getAuth = async () => {
    let token;
    token = sessionStorage.getItem('forgetoken')
    if (token) {
        return token
    } else {
        const forgeToken= await fetchForgeToken();
        return forgeToken
    }


}
export default getAuth;