import {url,token} from "./setting";
/**
 * Returns Price By API
 * @param {string} mcoder mcoder of price.
 * @param {string} coder coder of price.
 * @param {dict} out coder of price.
 * @return {json}
 */
const fetchPrice=async(mcoder,coder,out)=>{
    if (!mcoder||!coder) throw new Error(`no mcoder or coder`);

    if (out[`${mcoder}${coder}`]){
        return out[`${mcoder}${coder}`]
    }
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    var formdata = new FormData();
    formdata.append("mcoder", mcoder);
    formdata.append("coder", coder);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata
    };
    const _url=`${url}/cailiaoprice/api/bprice/bymcoderandcoder/`
    return await fetch(_url, requestOptions)
      .then(response =>{
          if(!response.ok ){
              out[`${mcoder}${coder}`]={}
              throw new Error(`${mcoder}：${coder} have some problem or have no data in database`);
          }
          else {
              return response.json()
          }
          }
          )
      .then(result =>{out[`${mcoder}${coder}`]=result;return result})
      //.catch(error => console.log('error', error));
}
export default fetchPrice