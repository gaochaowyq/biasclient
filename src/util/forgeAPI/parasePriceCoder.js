const parasePriceCoder = (pricecoder) => {
    let result = []
    if (!pricecoder) return result
    let plus;
    console.log(pricecoder)
    plus = pricecoder.split("+")
    if (plus.length === 1) {
        result.push(plus[0]);
        return result
    } else {
        for (var i of plus) {
            console.log(typeof (i),i)
            if (!i.includes("*")) {result.push(i);break}
            let count = i.split("*")[0]
            let coder = i.split("*")[1]
            console.log(i,count,coder)
            if (count) {
                count = parseInt(count)
                for (var c = 0; c < count; c++) {
                    result.push(coder)
                }
            }
            else result.push(coder)

        }

    }
    console.log("paraseCoder Success")
    console.log(result)
    return result
}

export default parasePriceCoder