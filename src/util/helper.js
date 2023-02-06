
const combineElement= (elements,
                       keyname,
                       combinename)=>{
    let result=[elements.shift()]
    for (var i of elements){
        let check=result.find((element)=>i[keyname]===element[keyname])
        if (!check){result.push(i)}
        else {
            for (let ii of combinename){
                check[ii]+=i[ii]
            }
        }

    }
    return result
}

export {combineElement}